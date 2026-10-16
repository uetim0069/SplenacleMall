import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarClock, Check, ShieldCheck, Truck } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { money, monthlyFor, planMonths, PRODUCTS } from '@/data/catalogue';

const TENURES = [3, 6, 12, 18, 24];

const TIERS = [
  { tenures: [3, 6], productIndex: 6 },
  { tenures: [12, 18, 24], productIndex: 5 },
];

const FEATURES = [
  { Icon: Check, label: '100% genuine products' },
  { Icon: ShieldCheck, label: 'Secure payments' },
  { Icon: Truck, label: 'Fast & reliable delivery' },
  { Icon: CalendarClock, label: 'Pay over 3–24 months' },
];

export default function Hero() {
  const [tenureIndex, setTenureIndex] = useState(1);
  const months = TENURES[tenureIndex];
  const tier = TIERS.find((t) => t.tenures.includes(months)) || TIERS[TIERS.length - 1];
  const product = PRODUCTS[tier.productIndex];
  const productPlans = planMonths(product);

  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" />
      <div className="grain absolute inset-0 opacity-40" />

      <div className="vvm-shell relative grid gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div className="max-w-xl">
          <span className="vvm-label inline-flex items-center gap-2 rounded-full bg-primary-foreground/12 px-3.5 py-2 text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Cart it, love it
          </span>

          <h1 className="mt-6 font-heading text-[38px] font-bold leading-[1.06] text-primary-foreground sm:text-[56px]">
            Shop premium.
            <br />
            Pay your way.
          </h1>

          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-primary-foreground/80">
            Get the products you want today and pay in full or spread it across 3 to 24 months.
            No stress, no pressure — and every item is tested on video before it reaches you.
          </p>

          <div className="mt-9 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/8 p-5 backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="vvm-label text-primary-foreground/70">Choose your plan</span>
              <span className="font-heading text-[15px] font-bold text-accent">
                {months} month{months > 1 ? 's' : ''}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={TENURES.length - 1}
              step="1"
              value={tenureIndex}
              onChange={(event) => setTenureIndex(Number(event.target.value))}
              aria-label="Installment duration in months"
              className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-primary-foreground/25 accent-[#F37021]"
            />
            <div className="mt-2 flex justify-between text-[11px] text-primary-foreground/60">
              <span>{TENURES[0]} months</span>
              <span>12 months</span>
              <span>{TENURES[TENURES.length - 1]} months</span>
            </div>

            <div className="mt-5 border-t border-primary-foreground/15 pt-4">
              <p className="text-[12.5px] text-primary-foreground/70">
                Own the {product.name} from
              </p>
              <p className="mt-1 font-heading text-[30px] font-bold text-primary-foreground">
                {money(monthlyFor(product.price, months))}
                <span className="text-[16px] font-medium text-primary-foreground/70">/month</span>
              </p>
              <p className="mt-1 text-[12px] text-primary-foreground/60">
                Full payment {money(product.price)} · plan is {productPlans[0]}–
                {productPlans[productPlans.length - 1]} months
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-accent-foreground transition hover:brightness-105"
            >
              Shop now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/how-it-works"
              className="flex items-center gap-2 rounded-full border border-primary-foreground/40 px-7 py-4 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition hover:bg-primary-foreground/10"
            >
              How it works
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[28px] border border-primary-foreground/15 shadow-2xl">
            <Image
              key={product.name}
              src={product.image_url}
              alt={product.name}
              className="aspect-[4/3] w-full"
            />
          </div>

          <div
            className="absolute -bottom-6 left-4 w-[248px] rounded-2xl border border-border bg-card p-5 shadow-2xl sm:left-8"
            style={{ animation: 'vvm-float 6s ease-in-out infinite' }}
          >
            <p className="vvm-label text-accent">Pay your way</p>
            <div className="mt-3 space-y-2.5">
              <div className="flex items-center gap-2.5 rounded-xl bg-secondary p-3">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-[13px] font-medium">Pay in 3–24 months</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-secondary p-3">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-[13px] font-medium">Or pay in full today</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-primary-foreground/15 bg-primary/60">
        <div className="vvm-shell grid gap-5 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/12 text-accent">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-[13px] font-medium text-primary-foreground/90">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
