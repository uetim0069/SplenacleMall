import { money } from '@/data/catalogue';
import { PAYMENT_META } from '@/lib/orders';
import { format, parseISO } from 'date-fns';

const pretty = (value) => {
  if (!value) return '—';
  try {
    return format(parseISO(value), 'd MMM yyyy');
  } catch {
    return value;
  }
};

export default function PaymentSchedule({ schedule = [], compact = false }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <table className="w-full text-left text-[13px]">
        <thead className="bg-secondary">
          <tr>
            <th className="px-4 py-3 font-heading text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Payment
            </th>
            <th className="px-4 py-3 font-heading text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Amount
            </th>
            <th className="hidden px-4 py-3 font-heading text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:table-cell">
              Due
            </th>
            <th className="px-4 py-3 text-right font-heading text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((row) => {
            const meta = PAYMENT_META[row.status] || PAYMENT_META.upcoming;
            return (
              <tr key={row.index} className="border-t border-border bg-card">
                <td className="px-4 py-3">
                  <span className="font-medium">{row.label}</span>
                  {!compact && row.paid_date && (
                    <span className="block text-[11.5px] text-muted-foreground">
                      Paid {pretty(row.paid_date)}
                      {row.method ? ` · ${row.method}` : ''}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 font-semibold text-primary">{money(row.amount)}</td>
                <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                  {pretty(row.due_date)}
                </td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${meta.tone}`}
                  >
                    {meta.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
