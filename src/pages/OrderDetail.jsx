import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Camera, Loader2, Phone } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import { money } from '@/data/catalogue';
import { statusLabel, statusTone } from '@/lib/orders';
import PaymentSchedule from '@/components/account/PaymentSchedule';
import StatusTimeline from '@/components/account/StatusTimeline';
import TrackingMap from '@/components/account/TrackingMap';
import VideoPlayer from '@/components/VideoPlayer';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentHelp, setShowPaymentHelp] = useState(false);

  useEffect(() => {
    let active = true;
    base44.entities.Order.get(id)
      .then((record) => {
        if (!active) return;
        setOrder(record);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="vvm-shell flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading your order…
      </div>
    );
  }

  if (!order) {
    return (
      <div className="vvm-shell py-20 text-center">
        <h1 className="font-heading text-[24px] font-bold text-primary">Order not found</h1>
        <Link to="/account" className="mt-5 inline-block text-accent hover:underline">
          Back to my dashboard
        </Link>
      </div>
    );
  }

  const nextDue = (order.schedule || []).find((row) => row.status !== 'paid');
  const paidCount = (order.schedule || []).filter((row) => row.status === 'paid').length;
  const progress = order.total ? Math.round((order.amount_paid / order.total) * 100) : 0;

  return (
    <div className="vvm-shell py-10">
      <Link
        to="/account"
        className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="vvm-label text-accent">{order.order_number}</span>
          <h1 className="mt-2 font-heading text-[26px] font-bold text-primary sm:text-[32px]">
            {order.payment_type === 'installment'
              ? `${order.payments_count}-payment installment plan`
              : 'Full payment order'}
          </h1>
          <p className="mt-2 text-[13.5px] text-muted-foreground">
            Delivering to {order.delivery_address}, {order.city}, {order.state}
          </p>
        </div>
        <span className={`rounded-full px-4 py-2 text-[12.5px] font-semibold ${statusTone(order.status)}`}>
          {statusLabel(order.status)}
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-8">
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-muted-foreground">
                {money(order.amount_paid)} paid of {money(order.total)}
              </span>
              <span className="font-semibold text-primary">{progress}%</span>
            </div>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <span className="vvm-label text-muted-foreground">Completed</span>
                <p className="mt-1 font-heading text-[19px] font-bold text-primary">
                  {paidCount}/{order.payments_count}
                </p>
              </div>
              <div>
                <span className="vvm-label text-muted-foreground">Balance</span>
                <p className="mt-1 font-heading text-[19px] font-bold text-accent">
                  {money(order.balance)}
                </p>
              </div>
              <div>
                <span className="vvm-label text-muted-foreground">Next payment</span>
                <p className="mt-1 font-heading text-[19px] font-bold text-primary">
                  {nextDue ? money(nextDue.amount) : 'Complete'}
                </p>
              </div>
            </div>

            {nextDue && (
              <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl bg-secondary p-4">
                <div className="flex-1">
                  <p className="text-[13px] font-medium">
                    {nextDue.label} · due {nextDue.due_date}
                  </p>
                  <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                    {order.payment_instructions ||
                      'Transfer to the Valuevillemall account and our team will confirm your payment on this dashboard.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPaymentHelp((value) => !value)}
                  className="rounded-full bg-primary px-5 py-3 font-heading text-[12px] font-semibold uppercase tracking-[0.1em] text-primary-foreground"
                >
                  {showPaymentHelp ? 'Hide details' : 'How to pay'}
                </button>
              </div>
            )}

            {showPaymentHelp && (
              <div className="mt-4 rounded-2xl border border-border p-5 text-[13px] leading-relaxed text-muted-foreground">
                <p className="font-heading text-[14px] font-semibold text-primary">
                  Making your payment
                </p>
                <p className="mt-2">
                  {order.payment_instructions ||
                    'Bank transfer is our confirmed payment method. Our team will share the account details for this order and confirm your payment here as soon as it lands.'}
                </p>
                <p className="mt-3 flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-accent" /> +234 701 407 7204 ·
                  support@valuevillemall.com
                </p>
              </div>
            )}
          </section>

          <section>
            <h2 className="font-heading text-[18px] font-bold text-primary">Payment schedule</h2>
            <div className="mt-4">
              <PaymentSchedule schedule={order.schedule} />
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-2 font-heading text-[18px] font-bold text-primary">
              <Camera className="h-4 w-4 text-accent" /> Quality test footage
            </h2>
            <div className="mt-4">
              <VideoPlayer
                url={order.testing_video_url}
                poster={order.items?.[0]?.image_url}
                caption="Our lab records the test on your exact item. The footage appears here before dispatch."
              />
            </div>
            {(order.testing_notes || []).length > 0 && (
              <ul className="mt-4 space-y-2 text-[13.5px] text-muted-foreground">
                {order.testing_notes.map((note) => (
                  <li key={note}>• {note}</li>
                ))}
              </ul>
            )}
          </section>

          {order.status === 'dispatched' && (
            <section>
              <h2 className="font-heading text-[18px] font-bold text-primary">Live delivery</h2>
              <div className="mt-4">
                <TrackingMap order={order} />
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-[16px] font-bold text-primary">Order stage</h2>
            <div className="mt-5">
              <StatusTimeline status={order.status} />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-[16px] font-bold text-primary">Items</h2>
            <div className="mt-4 space-y-4">
              {(order.items || []).map((item) => (
                <div key={item.product_id + item.name} className="flex gap-3">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    className="h-14 w-14 shrink-0 rounded-xl"
                  />
                  <div className="text-[13px]">
                    <p className="font-medium leading-snug">{item.name}</p>
                    <p className="mt-0.5 text-muted-foreground">
                      {money(item.price)} × {item.quantity}
                      {item.months > 0 ? ` · ${item.months} month plan` : ' · full payment'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <dl className="mt-5 space-y-2 border-t border-border pt-4 text-[13px]">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{money(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd>{order.delivery_fee === 0 ? 'Free' : money(order.delivery_fee)}</dd>
              </div>
              <div className="flex justify-between font-heading text-[15px] font-bold text-primary">
                <dt>Total</dt>
                <dd>{money(order.total)}</dd>
              </div>
            </dl>
          </div>

          {order.status_history?.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-heading text-[16px] font-bold text-primary">Order activity</h2>
              <ul className="mt-4 space-y-3">
                {[...order.status_history].reverse().map((entry, index) => (
                  <li key={`${entry.title}-${index}`} className="text-[13px]">
                    <p className="font-medium">{entry.title}</p>
                    {entry.note && (
                      <p className="text-muted-foreground">{entry.note}</p>
                    )}
                    <p className="text-[11.5px] text-muted-foreground">
                      {new Date(entry.at).toLocaleString('en-NG')}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
