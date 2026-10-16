import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, ClipboardCheck, CreditCard, Truck } from 'lucide-react';

const STEPS = [
  {
    Icon: ClipboardCheck,
    step: '01',
    title: 'Create your account',
    text: 'Sign up in under a minute with your email and delivery details. Your dashboard keeps everything in one place.',
  },
  {
    Icon: CreditCard,
    step: '02',
    title: 'Choose your plan',
    text: 'Pay in full, or pick an installment plan between 4 and 24 months depending on what you are buying.',
  },
  {
    Icon: BadgeCheck,
    step: '03',
    title: 'We test it on video',
    text: 'Before anything leaves us, our team tests your exact item on camera. You watch the footage right from your dashboard.',
  },
  {
    Icon: Truck,
    step: '04',
    title: 'Track it to your door',
    text: 'Once your payment is confirmed we dispatch and you follow the driver live until it arrives.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border bg-card">
      <div className="vvm-shell py-16">
        <div className="max-w-2xl">
          <span className="vvm-label text-accent">Simple as that</span>
          <h2 className="mt-2 font-heading text-[26px] font-bold text-primary sm:text-[34px]">
            How Valuevillemall works
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Four steps between you and the things you want — with every payment and every test
            recorded on your own dashboard.
          </p>
        </div>

        <div className="mt-11 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ Icon, step, title, text }) => (
            <div key={step} className="relative">
              <span className="font-heading text-[42px] font-bold leading-none text-secondary">
                {step}
              </span>
              <span className="mt-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-heading text-[16.5px] font-semibold">{title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <Link
          to="/shop"
          className="mt-11 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition hover:bg-accent hover:text-accent-foreground"
        >
          Start shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
