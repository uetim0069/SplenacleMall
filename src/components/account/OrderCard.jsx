import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { money } from '@/data/catalogue';
import { statusLabel, statusTone } from '@/lib/orders';

export default function OrderCard({ order }) {
  const paidCount = (order.schedule || []).filter((row) => row.status === 'paid').length;
  const progress = order.total ? Math.round((order.amount_paid / order.total) * 100) : 0;
  const nextDue = (order.schedule || []).find((row) => row.status !== 'paid');

  return (
    <article className="rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="vvm-label text-muted-foreground">{order.order_number}</span>
          <p className="mt-1 text-[12.5px] text-muted-foreground">
            {order.items?.length || 0} item{order.items?.length === 1 ? '' : 's'} ·{' '}
            {order.payment_type === 'installment'
              ? `${order.payments_count} monthly payments`
              : 'Full payment'}
          </p>
        </div>
        <span className={`rounded-full px-3 py-1.5 text-[11.5px] font-semibold ${statusTone(order.status)}`}>
          {statusLabel(order.status)}
        </span>
      </div>

      <div className="mt-4 flex gap-3">
        {(order.items || []).slice(0, 4).map((item) => (
          <Image
            key={item.product_id + item.name}
            src={item.image_url}
            alt={item.name}
            className="h-16 w-16 rounded-xl"
          />
        ))}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-[12.5px]">
          <span className="text-muted-foreground">
            {money(order.amount_paid)} paid of {money(order.total)}
          </span>
          <span className="font-semibold text-primary">{progress}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <div className="text-[12.5px]">
          <span className="text-muted-foreground">
            {paidCount}/{order.payments_count} payments completed
          </span>
          {nextDue && (
            <span className="block text-muted-foreground">
              Next: {money(nextDue.amount)} due {nextDue.due_date}
            </span>
          )}
        </div>
        <Link
          to={`/order/${order.id}`}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-heading text-[12px] font-semibold uppercase tracking-[0.1em] text-primary-foreground transition hover:bg-accent hover:text-accent-foreground"
        >
          {order.status === 'dispatched' ? <MapPin className="h-3.5 w-3.5" /> : null}
          {order.status === 'dispatched' ? 'Track delivery' : 'View order'}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
