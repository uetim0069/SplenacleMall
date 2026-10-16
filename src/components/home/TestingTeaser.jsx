import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Camera, Check } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import { LAB_IMAGE } from '@/data/catalogue';

const CHECKS = [
  'Dead pixels, colour and backlight tests on screens',
  'Battery health, ports and full function tests on devices',
  'Engine diagnostics and road tests on vehicles',
  'Water, seal and cycle tests on appliances',
];

export default function TestingTeaser() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="vvm-shell grid items-center gap-12 py-16 lg:grid-cols-2">
        <div>
          <span className="vvm-label inline-flex items-center gap-2 rounded-full bg-primary-foreground/12 px-3.5 py-2 text-accent">
            <Camera className="h-3.5 w-3.5" /> Live testing
          </span>
          <h2 className="mt-5 font-heading text-[26px] font-bold leading-tight sm:text-[36px]">
            Nobody receives a faulty product. Ever.
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-primary-foreground/80">
            Every single order is opened and tested on camera before it is packed for dispatch.
            The footage of your exact item is attached to your order, so you see it working
            before it ever gets on a vehicle.
          </p>

          <ul className="mt-8 space-y-3">
            {CHECKS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[14px]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Check className="h-3 w-3 text-accent-foreground" />
                </span>
                <span className="text-primary-foreground/85">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/testing"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-accent-foreground transition hover:brightness-105"
          >
            See the testing lab <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div>
          <VideoPlayer
            poster={LAB_IMAGE}
            caption="Test footage for every order is recorded here and attached to your dashboard."
          />
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/8 p-4">
            <BadgeCheck className="h-5 w-5 shrink-0 text-accent" />
            <p className="text-[13px] text-primary-foreground/80">
              Each test ends with an inspector sign-off on your order — name, timestamp and result.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
