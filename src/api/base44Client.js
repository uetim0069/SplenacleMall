// Self-contained replacement for the Base44 SDK so the app runs on any static host (Vercel).
// Data lives in the visitor's browser (localStorage). Swap this file for a real backend later;
// the rest of the app only uses the methods implemented here.
import { PRODUCTS } from '../data/catalogue';

const K = { users: 'vvm_users', orders: 'vvm_orders', token: 'base44_access_token', reset: 'vvm_reset' };
const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const uid = (p) => `${p}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
const fail = (message, status = 400) => Object.assign(new Error(message), { status });

const hash = async (email, password) => {
  const data = new TextEncoder().encode(`${email.toLowerCase()}:${password}`);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
};

// ---- Mongo-style querying ----
const matches = (record, query = {}) =>
  Object.entries(query).every(([field, cond]) => {
    const value = record[field];
    if (cond && typeof cond === 'object' && !Array.isArray(cond)) {
      return Object.entries(cond).every(([op, arg]) => {
        if (op === '$regex') return new RegExp(arg, cond.$options || '').test(String(value ?? ''));
        if (op === '$options') return true;
        if (op === '$gt') return value > arg;
        if (op === '$gte') return value >= arg;
        if (op === '$lt') return value < arg;
        if (op === '$lte') return value <= arg;
        if (op === '$ne') return value !== arg;
        if (op === '$in') return arg.includes(value);
        return true;
      });
    }
    return value === cond;
  });

const run = (records, query, { sort, limit = 50, skip = 0 } = {}) => {
  let items = records.filter((r) => matches(r, query));
  if (sort) {
    const desc = sort.startsWith('-');
    const field = sort.replace(/^-/, '');
    items = [...items].sort((a, b) => {
      const x = a[field], y = b[field];
      if (x === y) return 0;
      return (x > y ? 1 : -1) * (desc ? -1 : 1);
    });
  }
  return { items: items.slice(skip, skip + limit), total: items.length };
};

// ---- Products (seeded from the catalogue) ----
const base = Date.now() - PRODUCTS.length * 60000;
const products = PRODUCTS.map((p, i) => ({
  ...p,
  id: `prod_${i + 1}`,
  created_date: new Date(base + i * 60000).toISOString(),
}));

const Product = {
  async filter(query, opts) { return run(products, query, opts); },
  async list(sort, limit) { return run(products, {}, { sort, limit }); },
  async get(id) {
    const found = products.find((p) => p.id === id);
    if (!found) throw fail('Product not found', 404);
    return found;
  },
};

// ---- Orders ----
const currentUser = () => {
  const id = localStorage.getItem(K.token);
  return id ? read(K.users, []).find((u) => u.id === id) || null : null;
};
const publicUser = (u) => u && { id: u.id, email: u.email, full_name: u.full_name, role: u.role };
const orders = () => read(K.orders, []);

const Order = {
  async create(data) {
    const user = currentUser();
    if (!user) throw fail('Authentication required', 401);
    const now = new Date().toISOString();
    const order = { ...data, id: uid('ord'), created_date: now, updated_date: now, created_by_id: user.id, created_by: user.email };
    write(K.orders, [order, ...orders()]);
    return order;
  },
  async update(id, patch) {
    const all = orders();
    const i = all.findIndex((o) => o.id === id);
    if (i < 0) throw fail('Order not found', 404);
    all[i] = { ...all[i], ...patch, updated_date: new Date().toISOString() };
    write(K.orders, all);
    return all[i];
  },
  async get(id) {
    const user = currentUser();
    const found = orders().find((o) => o.id === id);
    if (!found || !user || (user.role !== 'admin' && found.created_by_id !== user.id)) throw fail('Order not found', 404);
    return found;
  },
  async filter(query, opts) {
    const user = currentUser();
    if (!user) return { items: [], total: 0 };
    const scoped = user.role === 'admin' ? orders() : orders().filter((o) => o.created_by_id === user.id);
    return run(scoped, query, opts);
  },
  async aggregate({ query, sum = [] }) {
    const rows = run(orders(), query, { limit: Infinity }).items;
    const row = {};
    sum.forEach((f) => { row[`sum_${f}`] = rows.reduce((t, o) => t + (Number(o[f]) || 0), 0); });
    return { rows: [row] };
  },
};

// ---- Auth (first account created becomes admin so you can open /operations) ----
const setToken = (t) => localStorage.setItem(K.token, t);
const pending = new Map();

const auth = {
  async me() {
    const user = currentUser();
    if (!user) throw fail('Authentication required', 401);
    return publicUser(user);
  },
  async register({ email, password }) {
    const users = read(K.users, []);
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) throw fail('An account with this email already exists');
    if (!password || password.length < 6) throw fail('Password must be at least 6 characters');
    const user = {
      id: uid('usr'), email, full_name: email.split('@')[0],
      role: users.length === 0 ? 'admin' : 'user', password_hash: await hash(email, password),
    };
    pending.set(email.toLowerCase(), user);
    return { ok: true };
  },
  async verifyOtp({ email }) { // demo: any code is accepted (no email service attached)
    const user = pending.get(email.toLowerCase());
    if (!user) throw fail('Registration expired, please sign up again');
    write(K.users, [...read(K.users, []), user]);
    pending.delete(email.toLowerCase());
    return { access_token: user.id };
  },
  async resendOtp() { return { ok: true }; },
  async loginViaEmailPassword(email, password) {
    const user = read(K.users, []).find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password_hash !== (await hash(email, password))) throw fail('Invalid email or password', 401);
    setToken(user.id);
    return { access_token: user.id, user: publicUser(user) };
  },
  async resetPasswordRequest(email) {
    const token = uid('rst');
    write(K.reset, { ...read(K.reset, {}), [token]: email });
    console.info(`[demo] No email service attached. Reset link: ${location.origin}/reset-password?token=${token}`);
    return { ok: true };
  },
  async resetPassword({ resetToken, newPassword }) {
    const map = read(K.reset, {});
    const email = map[resetToken];
    if (!email) throw fail('Reset link is invalid or expired');
    const users = read(K.users, []);
    const i = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
    if (i < 0) throw fail('Account not found');
    users[i].password_hash = await hash(users[i].email, newPassword);
    write(K.users, users);
    delete map[resetToken];
    write(K.reset, map);
    return { ok: true };
  },
  setToken,
  loginWithProvider() { window.alert('Google sign-in needs a real backend. Please use email and password.'); },
  redirectToLogin(returnTo = '/') { window.location.href = `/login?returnTo=${encodeURIComponent(returnTo)}`; },
  logout(redirectTo) {
    localStorage.removeItem(K.token);
    if (redirectTo) window.location.href = redirectTo;
  },
};

export const base44 = {
  entities: { Product, Order },
  auth,
  app: { async getPublicSettings() { return { id: 'local', public_settings: {} }; } },
};
