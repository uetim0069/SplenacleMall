import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Package, Settings2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import OrderCard from '@/components/account/OrderCard';
import PaymentSchedule from '@/components/account/PaymentSchedule';
import SummaryCards from '@/components/account/SummaryCards';
import TrackingMap from '@/components/account/TrackingMap';

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState(null);
  const [orders, setOrders] = useState([]);
  const [totals, setTotals] = useState({ paid: 0, balance: 0 });
  const [tab, setTab] = useState('orders');

  useEffect(() => {
    let active = true;
    const load = async () => {
      const user = await base44.auth.me();
      if (!active) return;
      setMe(user);

      const [page, grouped] = await Promise.all([
        base44.entities.Order.filter(
          { created_by_id: user.id },
          { sort: '-created_date', limit: 50 }
        ),
        base44.entities.Order.aggregate({
          query: { created_by_id: user.id },
          sum: ['amount_paid', 'balance'],
        }),
      ]);
      if (!active) return;

      const row = grouped.rows?.[0] || {};
      setTotals({ paid: row.sum_amount_paid || 0, balance: row.sum_balance || 0 });
      setOrders(page.items || []);
      setLoading(false);
    };
    load().catch(() => setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="vvm-shell flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading your dashboard…
      </div>
    );
  }

  const dispatchOrder = orders.find((order) => order.status === 'dispatched');
  const allPayments = orders
    .flatMap((order) =>
      (order.schedule || []).map((row) => ({ ...row, order_number: order.order_number, order_id: order.id }))
    )
    .sort((a, b) => (a.due_date < b.due_date ? -1 : 1));

  return (
    <div className="vvm-shell py-10">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <span className="vvm-label text-accent">My dashboard</span>
          <h1 className="mt-2 font-heading text-[28px] font-bold text-primary sm:text-[36px]">
            Hello{me?.full_name ? `, ${me.full_name.split(' ')[0]}` : ''}
          </h1>
          <p className="mt-2 text-[14px] text-muted-foreground">
            Every payment, every test and every delivery in one place.
          </p>
        </div>
        {me?.role === 'admin' && (
          <Link
            to="/operations"
            className="flex items-center gap-2 rounded-full border border-primary px-5 py-3 font-heading text-[12px] font-semibold uppercase tracking-[0.1em] text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            <Settings2 className="h-4 w-4" /> Store operations
          </Link>
        )}
      </div>

      <div className="mt-8">
        <SummaryCards totals={totals} ordersCount={orders.length} />
      </div>

      {orders.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-border bg-card p-12 text-center">
          <Package className="mx-auto h-8 w-8 text-accent" />
          <h2 className="mt-4 font-heading text-[20px] font-bold text-primary">
            No orders yet
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-[14px] text-muted-foreground">
            Once you place your first order, your payment plan, test footage and live delivery
            tracking will all appear here.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-block rounded-full bg-accent px-6 py-3.5 font-heading text-[12.5px] font-semibold uppercase tracking-[0.12em] text-accent-foreground"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-10 flex gap-2 border-b border-border">
            {[
              { key: 'orders', label: 'My orders' },
              { key: 'payments', label: 'Payment history' },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setTab(item.key)}
                className={`-mb-px border-b-2 px-4 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.1em] transition ${
                  tab === item.key
                    ? 'border-accent text-primary'
                    : 'border-transparent text-muted-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {tab === 'orders' && (
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}

          {tab === 'payments' && (
            <div className="mt-7 space-y-7">
              {orders.map((order) => (
                <div key={order.id}>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-heading text-[15px] font-semibold">
                      {order.order_number}
                    </h3>
                    <Link
                      to={`/order/${order.id}`}
                      className="text-[12.5px] font-medium text-accent hover:underline"
                    >
                      Order details
                    </Link>
                  </div>
                  <PaymentSchedule schedule={order.schedule} />
                </div>
              ))}
              <p className="text-[12.5px] text-muted-foreground">
                {allPayments.filter((row) => row.status === 'paid').length} payments completed
                across {orders.length} order{orders.length === 1 ? '' : 's'}.
              </p>
            </div>
          )}

          {dispatchOrder && (
            <div className="mt-11 rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="vvm-label text-accent">Live delivery tracking</span>
                  <h2 className="mt-2 font-heading text-[20px] font-bold text-primary">
                    {dispatchOrder.order_number} is on the way
                  </h2>
                </div>
                {dispatchOrder.eta_minutes && (
                  <span className="rounded-full bg-accent px-4 py-2 font-heading text-[12.5px] font-bold text-accent-foreground">
                    ETA {dispatchOrder.eta_minutes} min
                  </span>
                )}
              </div>
              <div className="mt-5">
                <TrackingMap order={dispatchOrder} />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 text-[13px]">
                <span className="text-muted-foreground">
                  Driver: <span className="font-medium text-foreground">{dispatchOrder.driver_name || 'Assigned on dispatch'}</span>
                </span>
                <span className="text-muted-foreground">
                  Phone: <span className="font-medium text-foreground">{dispatchOrder.driver_phone || '—'}</span>
                </span>
                <span className="text-muted-foreground">
                  Vehicle: <span className="font-medium text-foreground">{dispatchOrder.vehicle_plate || '—'}</span>
                </span>
              </div>
              {dispatchOrder.tracking_note && (
                <p className="mt-3 text-[13px] text-muted-foreground">{dispatchOrder.tracking_note}</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
