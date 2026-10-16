import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, ShieldCheck, Trash2, Truck } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import { money, monthlyFor, planMonths, MAX_INSTALLMENT_ITEMS } from '@/data/catalogue';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { buildOrderDraft, placeOrder } from '@/lib/orders';

const FIELDS = [
  { name: 'full_name', label: 'Full name', placeholder: 'Chinedu Okafor' },
  { name: 'phone', label: 'Phone number', placeholder: '0801 234 5678' },
  { name: 'address', label: 'Delivery address', placeholder: '14 Admiralty Way, Lekki Phase 1' },
  { name: 'city', label: 'City', placeholder: 'Lagos' },
  { name: 'state', label: 'State', placeholder: 'Lagos State' },
];

export default function Cart() {
  const { cart, cartTotal, setPlan, setQuantity, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
  });
  const [placing, setPlacing] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    base44.auth
      .me()
      .then((me) =>
        setForm((prev) => ({ ...prev, full_name: prev.full_name || me.full_name || '' }))
      )
      .catch(() => {});
  }, []);

  const draft = buildOrderDraft(cart);
  const planOptions = (item) => [0, ...planMonths(item)];
  const installmentItems = cart.filter((item) => item.months > 0);
  const overLimit = installmentItems.length > MAX_INSTALLMENT_ITEMS;

  const changePlan = (item, value) => {
    const alreadyOnPlan = cart.filter(
      (entry) => entry.months > 0 && entry.key !== item.key
    ).length;
    if (value > 0 && alreadyOnPlan >= MAX_INSTALLMENT_ITEMS) {
      toast({
        title: 'Installment limit reached',
        description: `An installment order covers up to ${MAX_INSTALLMENT_ITEMS} items. Switch another item to full payment first.`,
        variant: 'destructive',
      });
      return;
    }
    setPlan(item.key, value);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!cart.length) return;
    setError('');

    const missing = FIELDS.filter((field) => !form[field.name]?.trim());
    if (missing.length) {
      setError(`Please fill in your ${missing[0].label.toLowerCase()}.`);
      return;
    }

    if (!agreed) {
      setError('Please accept the Terms & Conditions to continue.');
      return;
    }

    if (overLimit) {
      setError(
        `An installment order covers up to ${MAX_INSTALLMENT_ITEMS} items. Switch ${
          installmentItems.length - MAX_INSTALLMENT_ITEMS
        } of them to full payment to continue.`
      );
      return;
    }

    setPlacing(true);
    try {
      let me = null;
      try {
        me = await base44.auth.me();
      } catch {
        me = null;
      }
      if (!me) {
        base44.auth.redirectToLogin('/cart');
        return;
      }
      const order = await placeOrder({ items: cart, form, me });
      clearCart();
      navigate(`/order/${order.id}`);
    } catch (err) {
      setError(err?.message || 'We could not place that order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (!cart.length) {
    return (
      <div className="vvm-shell py-20 text-center">
        <h1 className="font-heading text-[28px] font-bold text-primary">Your cart is empty</h1>
        <p className="mx-auto mt-3 max-w-md text-[14.5px] text-muted-foreground">
          Add something you love, pick how you want to pay, and it will show up here.
        </p>
        <Link
          to="/shop"
          className="mt-7 inline-block rounded-full bg-accent px-7 py-4 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-accent-foreground"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="vvm-shell py-10">
      <h1 className="font-heading text-[28px] font-bold text-primary sm:text-[36px]">
        Cart &amp; checkout
      </h1>
      <p className="mt-2 text-[14px] text-muted-foreground">
        Choose full payment or an installment plan for each item, then confirm your order. Plans run
        3, 6, 12, 18 or 24 months and cover up to two items.
      </p>

      <div className="mt-9 grid gap-9 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-5">
          {overLimit && (
            <p className="rounded-2xl bg-accent/10 px-5 py-4 text-[13px] leading-relaxed text-primary">
              An installment order covers up to {MAX_INSTALLMENT_ITEMS} items and you have{' '}
              {installmentItems.length} on a plan. Switch one to full payment to continue.
            </p>
          )}
          {cart.map((item) => {
            const perMonth = monthlyFor(item.price, item.months);
            return (
              <article
                key={item.key}
                className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 sm:flex-row"
              >
                <Link to={`/product/${item.product_id}`} className="shrink-0">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    className="h-[110px] w-[110px] rounded-xl"
                  />
                </Link>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="vvm-label text-muted-foreground">{item.category}</span>
                      <h3 className="mt-1 font-heading text-[16px] font-semibold leading-snug">
                        {item.name}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.key)}
                      aria-label="Remove item"
                      className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <select
                      value={item.months}
                      onChange={(event) => changePlan(item, Number(event.target.value))}
                      className="h-11 rounded-full border border-border bg-background px-4 text-[13px] outline-none"
                    >
                      {planOptions(item).map((value) => (
                        <option key={value} value={value}>
                          {value === 0 ? 'Pay in full' : `Pay in ${value} month${value > 1 ? 's' : ''}`}
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center rounded-full border border-border">
                      <button
                        type="button"
                        onClick={() => setQuantity(item.key, item.quantity - 1)}
                        className="h-11 w-10 rounded-l-full hover:bg-secondary"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-heading text-[14px] font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.key, item.quantity + 1)}
                        className="h-11 w-10 rounded-r-full hover:bg-secondary"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="ml-auto text-right">
                      <p className="font-heading text-[18px] font-bold text-primary">
                        {money(item.price * item.quantity)}
                      </p>
                      {item.months > 0 && (
                        <p className="text-[12px] text-muted-foreground">
                          {money(perMonth)}/month
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-[18px] font-bold text-primary">Delivery details</h2>
            <p className="mt-1.5 text-[13px] text-muted-foreground">
              We need this to schedule your delivery and your pickup test slot.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {FIELDS.map((field) => (
                <div
                  key={field.name}
                  className={field.name === 'address' ? 'sm:col-span-2' : ''}
                >
                  <label
                    htmlFor={field.name}
                    className="vvm-label text-muted-foreground"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    value={form[field.name]}
                    placeholder={field.placeholder}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, [field.name]: event.target.value }))
                    }
                    className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-[14px] outline-none focus:ring-2 focus:ring-accent/40"
                  />
                </div>
              ))}
            </div>

            <label className="mt-6 flex items-start gap-3 rounded-xl bg-secondary p-4 text-[12.5px] leading-relaxed">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#F37021]"
              />
              <span>
                I am 18 or older and I agree to the{' '}
                <Link to="/terms" className="font-medium text-accent underline">
                  Terms &amp; Conditions
                </Link>
                , including the no refund of money policy and, for installment orders, the digital
                installment agreement.
              </span>
            </label>

            {error && (
              <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-[13px] text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={placing}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-accent-foreground transition hover:brightness-105 disabled:opacity-60"
            >
              {placing && <Loader2 className="h-4 w-4 animate-spin" />}
              {placing ? 'Placing your order…' : 'Place order'}
            </button>
            <p className="mt-3 text-center text-[12px] text-muted-foreground">
              Creating an order is free. Your first payment instruction appears on your dashboard
              straight after.
            </p>
          </form>
        </div>

        <aside className="lg:sticky lg:top-[168px] lg:h-fit">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-[17px] font-bold text-primary">Order summary</h2>

            <dl className="mt-5 space-y-3 text-[13.5px]">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium">{money(draft.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="font-medium">
                  {draft.delivery_fee === 0 ? 'Free' : money(draft.delivery_fee)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <dt className="font-heading text-[14px] font-semibold">Total</dt>
                <dd className="font-heading text-[18px] font-bold text-primary">
                  {money(draft.total)}
                </dd>
              </div>
            </dl>

            <div className="mt-6 rounded-2xl bg-secondary p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="vvm-label text-primary">
                  {draft.payment_type === 'installment' ? 'Installment plan' : 'Full payment'}
                </span>
              </div>
              <p className="mt-3 font-heading text-[24px] font-bold text-primary">
                {money(draft.first_payment)}
              </p>
              <p className="text-[12.5px] text-muted-foreground">
                {draft.payment_type !== 'installment'
                  ? 'Due on your first payment'
                  : draft.payments_count > 1
                    ? `First of ${draft.payments_count} payments, then ${money(draft.monthly_amount)} monthly`
                    : 'Single payment due'}
              </p>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-border p-4">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                Free delivery on orders above ₦200,000. Every order is tested on video before it
                is dispatched.
              </p>
            </div>

            <p className="mt-4 text-[12px] text-muted-foreground">
              Cart total: <span className="font-semibold">{money(cartTotal)}</span>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
