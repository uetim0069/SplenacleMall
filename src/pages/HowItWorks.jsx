import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, CalendarClock, Camera, CreditCard, MapPin, UserPlus } from 'lucide-react';
import { money, monthlyFor, planMonths, PRODUCTS } from '@/data/catalogue';

const STEPS = [
  {
    Icon: UserPlus,
    title: 'Create your account',
    text: 'Sign up with your email, add your delivery details once, and everything after that is one click.',
  },
  {
    Icon: CreditCard,
    title: 'Pick your payment plan',
    text: 'Add items to your cart and choose full payment, or an installment plan between 3 and 24 months depending on the item.',
  },
  {
    Icon: CalendarClock,
    title: 'Pay on your schedule',
    text: 'Your dashboard shows every payment with its due date and status. As each one lands it is marked completed.',
  },
  {
    Icon: Camera,
    title: 'We test it on video',
    text: 'Your exact item is opened and tested on camera. The footage is attached to your order for you to watch.',
  },
  {
    Icon: MapPin,
    title: 'Track it to your door',
    text: 'Once dispatched, a live map shows where your driver is and when to expect them.',
  },
];

const FAQ = [
  {
    q: 'How long can I spread my payments?',
    a: 'Plans start at 3 months and run up to 24 months, in tenures of 3, 6, 12, 18 or 24 months. Vehicles and other high-value items can take the full 24 months, while smaller items may be cleared in 3 or 6.',
  },
  {
    q: 'Is there interest on installment plans?',
    a: 'The plan price is the price you see on the product page, split across your chosen number of months. No hidden charges are added at checkout.',
  },
  {
    q: 'What happens after my first payment?',
    a: 'Your order is confirmed, booked into our testing lab, tested on camera, and then dispatched. You follow every stage from your dashboard.',
  },
  {
    q: 'How do I pay?',
    a: 'Place your order on the site and our team confirms your payment details against the order. As soon as a payment lands it is marked completed on your dashboard.',
  },
  {
    q: 'What if my item arrives faulty?',
    a: 'That is exactly what the live testing section prevents. You watch your item working on video before it ships, and you can raise any concern at that point.',
  },
];

export default function HowItWorks() {
  const sample = PRODUCTS[0];
  const rows = planMonths(sample);

  return (
    <div className="vvm-shell py-12">
      <div className="max-w-3xl">
        <span className="vvm-label text-accent">How it works</span>
        <h1 className="mt-3 font-heading text-[30px] font-bold leading-tight text-primary sm:text-[42px]">
          Pay in full, or pay your way
        </h1>
        <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
          Valuevillemall was built around one idea: the price should never be the reason you wait.
          Choose the plan that fits your month, watch your item pass testing, and follow your
          driver to the door.
        </p>
      </div>

      <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map(({ Icon, title, text }, index) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-heading text-[26px] font-bold text-secondary">
                0{index + 1}
              </span>
            </div>
            <h2 className="mt-4 font-heading text-[15px] font-semibold">{title}</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>

      <section className="mt-16 rounded-[28px] border border-border bg-card p-7 sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="vvm-label text-accent">Example plan</span>
            <h2 className="mt-2 font-heading text-[24px] font-bold text-primary">
              {sample.name}
            </h2>
          </div>
          <p className="font-heading text-[22px] font-bold text-primary">{money(sample.price)}</p>
        </div>

        <div className="mt-7 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-[13.5px]">
            <thead className="bg-secondary">
              <tr>
                <th className="px-5 py-3 font-heading text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Plan
                </th>
                <th className="px-5 py-3 font-heading text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Per month
                </th>
                <th className="px-5 py-3 text-right font-heading text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Total paid
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-5 py-3.5 font-medium">Pay in full</td>
                <td className="px-5 py-3.5">—</td>
                <td className="px-5 py-3.5 text-right font-semibold text-primary">
                  {money(sample.price)}
                </td>
              </tr>
              {rows.map((months) => (
                <tr key={months} className="border-t border-border">
                  <td className="px-5 py-3.5 font-medium">
                    {months} month{months > 1 ? 's' : ''}
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {money(monthlyFor(sample.price, months))}
                  </td>
                  <td className="px-5 py-3.5 text-right font-semibold text-primary">
                    {money(sample.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[12.5px] text-muted-foreground">
          Plans shown are the options available for this item. Every product page shows its own
          range.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="font-heading text-[26px] font-bold text-primary">Questions we get a lot</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-border bg-card p-5 open:bg-secondary/40"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-[15px] font-semibold">
                {item.q}
                <BadgeCheck className="h-4 w-4 shrink-0 text-accent" />
              </summary>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-[28px] bg-accent p-8 text-accent-foreground sm:flex-row sm:items-center">
        <div>
          <h2 className="font-heading text-[24px] font-bold">Ready to cart it?</h2>
          <p className="mt-1.5 text-[14px] opacity-90">
            Pick your items, pick your plan, and we will take it from there.
          </p>
        </div>
        <Link
          to="/shop"
          className="flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-primary-foreground"
        >
          Shop now <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
