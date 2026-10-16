import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Navigation } from 'lucide-react';

const STAGES = [
  { label: 'Order confirmed', detail: 'Payment received' },
  { label: 'Quality test', detail: 'Tested on video' },
  { label: 'Dispatched', detail: 'Driver on the way' },
  { label: 'Delivered', detail: 'Signed for' },
];

export default function TrackingTeaser() {
  return (
    <section className="vvm-shell py-16">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[28px] border border-border bg-primary p-8">
            <div className="grain absolute inset-0 opacity-30" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="vvm-label text-accent">Order VVM-24817</span>
                <span className="rounded-full bg-accent px-3 py-1.5 font-heading text-[11px] font-bold uppercase tracking-[0.1em] text-accent-foreground">
                  On the way
                </span>
              </div>

              <div className="relative mt-9 h-[168px]">
                <svg viewBox="0 0 420 168" className="h-full w-full">
                  <path
                    d="M14 132 C 96 132, 96 44, 196 44 S 320 96, 406 40"
                    fill="none"
                    stroke="rgba(244,247,245,0.28)"
                    strokeWidth="2.5"
                    strokeDasharray="8 8"
                  />
                  <path
                    d="M14 132 C 96 132, 96 44, 196 44"
                    fill="none"
                    stroke="#F37021"
                    strokeWidth="3"
                  />
                </svg>
                <span className="absolute left-[42%] top-[18%] -translate-x-1/2">
                  <span
                    className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
                    style={{ animation: 'vvm-pulse-ring 2.4s ease-out infinite' }}
                  />
                  <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-accent" />
                </span>
                <span className="absolute bottom-2 left-3 flex items-center gap-1.5 text-[11.5px] text-primary-foreground/70">
                  <MapPin className="h-3.5 w-3.5" /> Uyo, Akwa Ibom
                </span>
                <span className="absolute right-2 top-1 flex items-center gap-1.5 text-[11.5px] text-primary-foreground/70">
                  <Navigation className="h-3.5 w-3.5" /> Your address
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {STAGES.map((stage, index) => (
                  <div key={stage.label} className="flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                        index < 3
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-primary-foreground/15 text-primary-foreground/70'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="text-[13.5px] font-medium text-primary-foreground">
                      {stage.label}
                    </span>
                    <span className="ml-auto text-[12px] text-primary-foreground/60">
                      {stage.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="vvm-label text-accent">Logistics</span>
          <h2 className="mt-3 font-heading text-[26px] font-bold text-primary sm:text-[34px]">
            Watch your delivery move in real time
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            The moment your order is dispatched, a live map appears on your dashboard showing
            exactly where the driver is, the route being taken and an estimated arrival window.
            No more guessing, no more calling to ask.
          </p>
          <Link
            to="/account"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary px-7 py-4 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            Track my order <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
