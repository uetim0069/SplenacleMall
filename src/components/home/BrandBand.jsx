import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { SHOWROOM_IMAGE } from '@/data/catalogue';

const STATS = [
  { value: '24', label: 'Months to pay' },
  { value: '12k+', label: 'Orders delivered' },
  { value: '100%', label: 'Tested before dispatch' },
];

export default function BrandBand() {
  return (
    <section className="vvm-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_0.8fr] lg:items-center">
        <div className="overflow-hidden rounded-[28px] border border-border">
          <Image
            src={SHOWROOM_IMAGE}
            alt="Valuevillemall showroom display of premium products"
            className="aspect-[16/11] w-full"
          />
        </div>
        <div>
          <span className="vvm-label text-accent">About Valuevillemall</span>
          <h2 className="mt-3 font-heading text-[26px] font-bold leading-tight text-primary sm:text-[34px]">
            Bringing premium within reach
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Valuevillemall exists so that the things you want don&apos;t have to wait for a
            savings goal. We stock genuine products — electronics, appliances, furniture,
            fashion and vehicles — and let you decide how to pay for them. Settle it in full
            today, or take a plan that fits your month.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Vehicles get up to 24 months. A television might only need one or two. You choose
            the length, your dashboard shows every payment, and we only dispatch once your
            item has passed testing.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-secondary p-4">
                <p className="font-heading text-[24px] font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-[12px] leading-snug text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-accent hover:underline"
          >
            Explore the catalogue →
          </Link>
        </div>
      </div>
    </section>
  );
}
