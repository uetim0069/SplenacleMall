import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Camera, ClipboardCheck, PackageCheck, Wrench } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import { LAB_IMAGE } from '@/data/catalogue';

const PROTOCOL = [
  {
    Icon: ClipboardCheck,
    title: 'Unboxing on camera',
    text: 'Every item is unboxed in front of the lens with its serial number and order number visible, so you can see it is untouched and brand new.',
  },
  {
    Icon: Wrench,
    title: 'Function test',
    text: 'Screens, batteries, motors, engines, seals and every port get tested individually. Nothing is packed until it passes.',
  },
  {
    Icon: PackageCheck,
    title: 'Inspector sign-off',
    text: 'The tester records their name, the result and the timestamp against your order. That record stays on your dashboard.',
  },
  {
    Icon: Camera,
    title: 'Your footage, your order',
    text: 'The video is attached to your order only, and you can watch it from your dashboard before the item is dispatched.',
  },
];

export default function Testing() {
  return (
    <div className="vvm-shell py-12">
      <div className="max-w-3xl">
        <span className="vvm-label text-accent">Live product testing</span>
        <h1 className="mt-3 font-heading text-[30px] font-bold leading-tight text-primary sm:text-[42px]">
          Every product is tested on video before it reaches you
        </h1>
        <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
          This is the part most stores skip. We don&apos;t. Before anything leaves our facility,
          your exact item is opened, powered on and tested on camera — because a faulty product
          reaching your door is a problem we never want to have to fix.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <VideoPlayer
          poster={LAB_IMAGE}
          caption="Testing room footage. Your item's test video is attached to your order dashboard automatically."
          className="aspect-video"
        />

        <div className="space-y-6">
          {PROTOCOL.map(({ Icon, title, text }) => (
            <div key={title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-[15.5px] font-semibold">{title}</h2>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 rounded-[28px] bg-primary p-8 text-primary-foreground sm:p-11">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="vvm-label text-accent">What this means for you</span>
            <h2 className="mt-3 font-heading text-[24px] font-bold sm:text-[30px]">
              Watch it working before you accept it
            </h2>
            <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-primary-foreground/80">
              Once your payment is confirmed we book your item into the test queue. When testing
              is done, the footage lands on your dashboard and your order moves to dispatch. If
              you spot anything in the footage you are not happy with, raise it before delivery —
              that is exactly what the video is for.
            </p>
            <Link
              to="/account"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-accent-foreground"
            >
              Watch my item&apos;s test <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="space-y-4">
            {[
              'No dead pixels, no dents, no leaks, no surprises',
              'Test footage stored against your order',
              'Inspector name and timestamp on every test',
              'Raise a concern before it ships, not after',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-[14px]">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-primary-foreground/85">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
