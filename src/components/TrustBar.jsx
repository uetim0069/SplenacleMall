import { Link } from 'react-router-dom';
import { ArrowRight, CalendarClock, Headphones, ShieldCheck, Truck } from 'lucide-react';

const ITEMS = [
  {
    Icon: Truck,
    title: 'Free delivery',
    text: 'On orders above ₦200,000 within Nigeria.',
  },
  {
    Icon: CalendarClock,
    title: 'Pay in installments',
    text: 'Flexible plans from 3 to 24 months, on your terms.',
  },
  {
    Icon: ShieldCheck,
    title: 'Safe & secure',
    text: 'Your security and your data are our top priority.',
  },
  {
    Icon: Headphones,
    title: '24/7 support',
    text: 'A real person is always here to help you.',
  },
];

export default function TrustBar() {
  return (
    <section className="border-y border-border bg-card">
      <div className="vvm-shell grid gap-8 py-11 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3.5">
            <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="vvm-label text-primary">{title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function InstallmentBanner() {
  return (
    <section className="bg-accent text-accent-foreground">
      <div className="vvm-shell flex flex-col items-start justify-between gap-5 py-9 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-heading text-[22px] font-bold sm:text-[26px]">
            Can&apos;t decide on a plan yet?
          </h3>
          <p className="mt-1.5 text-[14px] opacity-90">
            See the full installment table — full payment and every monthly option, side by side.
          </p>
        </div>
        <Link
          to="/shop?plan=installment"
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-heading text-[12.5px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition hover:brightness-110"
        >
          View installment plans <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
