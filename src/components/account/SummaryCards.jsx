import { money } from '@/data/catalogue';

export default function SummaryCards({ totals, ordersCount }) {
  const items = [
    { label: 'Total paid', value: money(totals.paid), tone: 'text-primary' },
    { label: 'Outstanding balance', value: money(totals.balance), tone: 'text-accent' },
    { label: 'Orders placed', value: ordersCount, tone: 'text-primary' },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-border bg-card p-5">
          <span className="vvm-label text-muted-foreground">{item.label}</span>
          <p className={`mt-2 font-heading text-[26px] font-bold ${item.tone}`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
