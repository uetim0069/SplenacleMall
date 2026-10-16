import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Save, Search, ShieldAlert } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { money } from '@/data/catalogue';
import {
  STATUS_ORDER,
  STATUS_META,
  advanceStatus,
  recordPayment,
  saveTesting,
  saveTracking,
  statusLabel,
  statusTone,
} from '@/lib/orders';

const inputClass =
  'mt-2 h-11 w-full rounded-xl border border-border bg-background px-4 text-[13.5px] outline-none focus:ring-2 focus:ring-accent/40';

export default function Operations() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState('');
  const [tracking, setTracking] = useState({});
  const [testing, setTesting] = useState({ video: '', notes: '' });
  const [instructions, setInstructions] = useState('');
  const [reference, setReference] = useState('');

  const load = async (term = '') => {
    const query = term ? { order_number: { $regex: term, $options: 'i' } } : {};
    const page = await base44.entities.Order.filter(query, {
      sort: '-created_date',
      limit: 50,
    });
    setOrders(page.items || []);
    return page.items || [];
  };

  useEffect(() => {
    let active = true;
    const boot = async () => {
      const user = await base44.auth.me();
      if (!active) return;
      setMe(user);
      if (user.role === 'admin') {
        const items = await load();
        if (active && items[0]) setSelectedId(items[0].id);
      }
      setLoading(false);
    };
    boot().catch(() => setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const selected = orders.find((order) => order.id === selectedId);

  useEffect(() => {
    if (!selected) return;
    setTracking({
      driver_name: selected.driver_name || '',
      driver_phone: selected.driver_phone || '',
      vehicle_plate: selected.vehicle_plate || '',
      driver_lat: selected.driver_lat || '',
      driver_lng: selected.driver_lng || '',
      eta_minutes: selected.eta_minutes || '',
      tracking_note: selected.tracking_note || '',
    });
    setTesting({
      video: selected.testing_video_url || '',
      notes: (selected.testing_notes || []).join('\n'),
    });
    setInstructions(selected.payment_instructions || '');
  }, [selectedId, selected?.updated_date]);

  const applyUpdate = (updated) => {
    setOrders((prev) => prev.map((order) => (order.id === updated.id ? updated : order)));
  };

  const run = async (key, action) => {
    setBusy(key);
    setMessage('');
    try {
      const updated = await action();
      applyUpdate(updated);
      setMessage('Saved.');
    } catch (err) {
      setMessage(err?.message || 'That change could not be saved.');
    } finally {
      setBusy('');
    }
  };

  if (loading) {
    return (
      <div className="vvm-shell flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading store operations…
      </div>
    );
  }

  if (me?.role !== 'admin') {
    return (
      <div className="vvm-shell py-20 text-center">
        <ShieldAlert className="mx-auto h-8 w-8 text-accent" />
        <h1 className="mt-4 font-heading text-[24px] font-bold text-primary">
          Store operations are for admins
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[14px] text-muted-foreground">
          Your account does not have permission to manage orders, payments or deliveries.
        </p>
        <Link to="/account" className="mt-6 inline-block text-accent hover:underline">
          Back to my dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="vvm-shell py-10">
      <span className="vvm-label text-accent">Store operations</span>
      <h1 className="mt-2 font-heading text-[28px] font-bold text-primary sm:text-[34px]">
        Orders, payments &amp; deliveries
      </h1>
      <p className="mt-2 max-w-2xl text-[14px] text-muted-foreground">
        Record payments as they land, attach the test footage from the lab, and update the driver
        location. Everything you save here appears on the customer&apos;s dashboard immediately.
      </p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          load(search).then((items) => {
            if (items[0]) setSelectedId(items[0].id);
          });
        }}
        className="mt-7 flex max-w-md"
      >
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by order number"
          className="h-11 flex-1 rounded-l-full border border-border bg-card px-4 text-[13.5px] outline-none"
        />
        <button
          type="submit"
          className="flex h-11 items-center rounded-r-full bg-primary px-5 text-primary-foreground"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      {orders.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-border bg-card p-10 text-center text-[14px] text-muted-foreground">
          No orders yet. Orders appear here as soon as customers check out.
        </p>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            {orders.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => setSelectedId(order.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  order.id === selectedId
                    ? 'border-accent bg-accent/5'
                    : 'border-border bg-card hover:border-primary'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-heading text-[14px] font-semibold">
                    {order.order_number}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusTone(order.status)}`}
                  >
                    {statusLabel(order.status)}
                  </span>
                </div>
                <p className="mt-1.5 text-[12.5px] text-muted-foreground">
                  {order.customer_name} · {money(order.total)} ·{' '}
                  {order.payment_type === 'installment'
                    ? `${order.payments_count} payments`
                    : 'full payment'}
                </p>
                <p className="mt-1 text-[12px] text-muted-foreground">
                  Paid {money(order.amount_paid)} · balance {money(order.balance)}
                </p>
              </button>
            ))}
          </div>

          {selected && (
            <div className="space-y-6">
              {message && (
                <p className="rounded-xl bg-secondary px-4 py-3 text-[13px]">{message}</p>
              )}

              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-heading text-[17px] font-bold text-primary">
                  Record a payment
                </h2>
                <p className="mt-1.5 text-[13px] text-muted-foreground">
                  Mark each installment as it lands. The customer&apos;s dashboard updates
                  straight away.
                </p>
                <input
                  value={reference}
                  onChange={(event) => setReference(event.target.value)}
                  placeholder="Transfer reference (optional)"
                  className={inputClass}
                />
                <div className="mt-4 space-y-2">
                  {(selected.schedule || []).map((row) => (
                    <div
                      key={row.index}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-secondary px-4 py-3 text-[13px]"
                    >
                      <span className="font-medium">{row.label}</span>
                      <span>{money(row.amount)}</span>
                      <span className="text-muted-foreground">{row.due_date}</span>
                      {row.status === 'paid' ? (
                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11.5px] font-semibold text-emerald-800">
                          Paid {row.paid_date}
                        </span>
                      ) : (
                        <button
                          type="button"
                          disabled={busy === `pay-${row.index}`}
                          onClick={() =>
                            run(`pay-${row.index}`, () =>
                              recordPayment(selected, row.index, {
                                method: 'Bank transfer',
                                reference,
                              })
                            )
                          }
                          className="rounded-full bg-primary px-4 py-2 font-heading text-[11.5px] font-semibold uppercase tracking-[0.08em] text-primary-foreground disabled:opacity-60"
                        >
                          {busy === `pay-${row.index}` ? 'Saving…' : 'Mark as paid'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-heading text-[17px] font-bold text-primary">Order stage</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {STATUS_ORDER.map((status) => (
                    <button
                      key={status}
                      type="button"
                      disabled={busy === status}
                      onClick={() => run(status, () => advanceStatus(selected, status, ''))}
                      className={`rounded-full px-4 py-2.5 font-heading text-[11.5px] font-semibold uppercase tracking-[0.08em] transition disabled:opacity-60 ${
                        selected.status === status
                          ? 'bg-accent text-accent-foreground'
                          : 'border border-border hover:border-primary'
                      }`}
                    >
                      {STATUS_META[status].label}
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-heading text-[17px] font-bold text-primary">
                  Test footage from the lab
                </h2>
                <label className="mt-4 block text-[12.5px] text-muted-foreground">
                  Video link
                  <input
                    value={testing.video}
                    onChange={(event) =>
                      setTesting((prev) => ({ ...prev, video: event.target.value }))
                    }
                    placeholder="https://… (mp4 link or hosted video)"
                    className={inputClass}
                  />
                </label>
                <label className="mt-4 block text-[12.5px] text-muted-foreground">
                  Test notes (one per line)
                  <textarea
                    value={testing.notes}
                    onChange={(event) =>
                      setTesting((prev) => ({ ...prev, notes: event.target.value }))
                    }
                    rows={3}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-[13.5px] outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </label>
                <button
                  type="button"
                  disabled={busy === 'testing'}
                  onClick={() =>
                    run('testing', () =>
                      saveTesting(selected, {
                        testing_video_url: testing.video,
                        testing_notes: testing.notes
                          .split('\n')
                          .map((line) => line.trim())
                          .filter(Boolean),
                      })
                    )
                  }
                  className="mt-4 flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-heading text-[11.5px] font-semibold uppercase tracking-[0.08em] text-primary-foreground disabled:opacity-60"
                >
                  <Save className="h-3.5 w-3.5" /> Save test footage
                </button>
              </section>

              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-heading text-[17px] font-bold text-primary">
                  Driver &amp; live tracking
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {[
                    { key: 'driver_name', label: 'Driver name' },
                    { key: 'driver_phone', label: 'Driver phone' },
                    { key: 'vehicle_plate', label: 'Vehicle plate' },
                    { key: 'eta_minutes', label: 'ETA (minutes)' },
                    { key: 'driver_lat', label: 'Driver latitude' },
                    { key: 'driver_lng', label: 'Driver longitude' },
                  ].map((field) => (
                    <label key={field.key} className="block text-[12.5px] text-muted-foreground">
                      {field.label}
                      <input
                        value={tracking[field.key] ?? ''}
                        onChange={(event) =>
                          setTracking((prev) => ({ ...prev, [field.key]: event.target.value }))
                        }
                        className={inputClass}
                      />
                    </label>
                  ))}
                </div>
                <label className="mt-4 block text-[12.5px] text-muted-foreground">
                  Delivery note
                  <input
                    value={tracking.tracking_note || ''}
                    onChange={(event) =>
                      setTracking((prev) => ({ ...prev, tracking_note: event.target.value }))
                    }
                    placeholder="Driver is 15 minutes away"
                    className={inputClass}
                  />
                </label>
                <button
                  type="button"
                  disabled={busy === 'tracking'}
                  onClick={() =>
                    run('tracking', () =>
                      saveTracking(selected, {
                        driver_name: tracking.driver_name,
                        driver_phone: tracking.driver_phone,
                        vehicle_plate: tracking.vehicle_plate,
                        driver_lat: Number(tracking.driver_lat) || 0,
                        driver_lng: Number(tracking.driver_lng) || 0,
                        eta_minutes: Number(tracking.eta_minutes) || 0,
                        tracking_note: tracking.tracking_note,
                      })
                    )
                  }
                  className="mt-4 flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-heading text-[11.5px] font-semibold uppercase tracking-[0.08em] text-primary-foreground disabled:opacity-60"
                >
                  <Save className="h-3.5 w-3.5" /> Save tracking
                </button>
              </section>

              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-heading text-[17px] font-bold text-primary">
                  Payment instructions shown to the customer
                </h2>
                <textarea
                  value={instructions}
                  onChange={(event) => setInstructions(event.target.value)}
                  rows={3}
                  placeholder="Transfer to Valuevillemall Ltd · GTBank 0123456789 · use your order number as reference"
                  className="mt-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-[13.5px] outline-none focus:ring-2 focus:ring-accent/40"
                />
                <button
                  type="button"
                  disabled={busy === 'instructions'}
                  onClick={() =>
                    run('instructions', () =>
                      base44.entities.Order.update(selected.id, {
                        payment_instructions: instructions,
                      })
                    )
                  }
                  className="mt-4 flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-heading text-[11.5px] font-semibold uppercase tracking-[0.08em] text-primary-foreground disabled:opacity-60"
                >
                  <Save className="h-3.5 w-3.5" /> Save instructions
                </button>
              </section>

              <Link
                to={`/order/${selected.id}`}
                className="inline-block text-[13px] font-medium text-accent hover:underline"
              >
                Open the customer&apos;s view of this order →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
