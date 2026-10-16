import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { CATEGORIES } from '@/data/catalogue';
import BrandMark from '@/components/BrandMark';

const SOCIALS = [
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Twitter, label: 'X' },
  { Icon: Youtube, label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="vvm-shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <BrandMark className="h-11 w-11 rounded-xl" />
            <span className="font-heading text-[22px] font-bold">
              Valueville<span className="text-accent">mall</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed opacity-75">
            Bringing premium within reach. Shop the brands you love and pay in full or spread it
            across 3 to 24 months — cart it, love it.
          </p>
          <div className="mt-5 flex gap-2">
            {SOCIALS.map(({ Icon, label }) => (
              <span
                key={label}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="vvm-label text-accent">Shop</h4>
          <ul className="mt-4 space-y-2.5 text-[13.5px] opacity-80">
            {CATEGORIES.slice(0, 6).map((name) => (
              <li key={name}>
                <Link to={`/shop?category=${encodeURIComponent(name)}`} className="hover:text-accent">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="vvm-label text-accent">Support</h4>
          <ul className="mt-4 space-y-2.5 text-[13.5px] opacity-80">
            <li><Link to="/account" className="hover:text-accent">My Account</Link></li>
            <li><Link to="/account" className="hover:text-accent">Track My Order</Link></li>
            <li><Link to="/testing" className="hover:text-accent">Live Product Testing</Link></li>
            <li><Link to="/shop?plan=installment" className="hover:text-accent">Installment Plans</Link></li>
            <li><Link to="/terms" className="hover:text-accent">Terms &amp; Conditions</Link></li>
            <li><Link to="/cart" className="hover:text-accent">Cart &amp; Checkout</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="vvm-label text-accent">Get in touch</h4>
          <ul className="mt-4 space-y-2.5 text-[13.5px] opacity-80">
            <li>+234 701 407 7204</li>
            <li>Valuevillemall@gmail.com</li>
            <li>Uyo, Akwa Ibom State, Nigeria</li>
            <li>Mon – Sat, 8:00am – 7:00pm</li>
          </ul>
        </div>
      </div>

      <div className="overflow-hidden border-t border-primary-foreground/15">
        <div className="vvm-shell py-8">
          <p className="text-outline whitespace-nowrap font-heading text-[13vw] font-bold leading-none opacity-60">
            CART IT, LOVE IT
          </p>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="vvm-shell flex flex-col gap-2 py-5 text-[12px] opacity-65 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Valuevillemall. All rights reserved.</span>
          <span className="flex flex-wrap gap-x-5 gap-y-1">
            <Link to="/terms" className="hover:text-accent">Terms &amp; Conditions</Link>
            <span>Bank transfer · Cash · Online payment</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
