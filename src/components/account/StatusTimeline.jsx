import { Check } from 'lucide-react';
import { STATUS_ORDER, STATUS_META } from '@/lib/orders';

export default function StatusTimeline({ status }) {
  const currentIndex = Math.max(0, STATUS_ORDER.indexOf(status));

  return (
    <ol className="space-y-4">
      {STATUS_ORDER.map((step, index) => {
        const done = index <= currentIndex;
        return (
          <li key={step} className="flex items-start gap-4">
            <span
              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                done ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'
              }`}
            >
              {done ? <Check className="h-3.5 w-3.5" /> : index + 1}
            </span>
            <div>
              <p
                className={`font-heading text-[14px] font-semibold ${
                  done ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {STATUS_META[step].label}
              </p>
              {index === currentIndex && (
                <p className="mt-0.5 text-[12.5px] text-accent">Current stage</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
