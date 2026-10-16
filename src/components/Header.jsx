import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Phone,
  Mail,
  Menu,
  X,
  ChevronDown,
  Truck,
} from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { CATEGORIES } from '@/data/catalogue';
import BrandMark from '@/components/BrandMark';

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Installment Plan', to: '/shop?plan=installment' },
  { label: 'Deals', to: '/shop?deals=1' },
  { label: 'Live Testing', to: '/testing' },
  { label: 'Track Order', to: '/account' },
];

export default function Header() {
  const { cartCount, saved } = useCart();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [category, setCategory] = useState('All Categories');
  const navigate = useNavigate();

  const submitSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (category !== 'All Categories') params.set('category', category);
    navigate(`/shop?${params.toString()}`);
  };

  const navLinkClass = ({ isActive }) =>
    `font-heading text-[12px] font-semibold uppercase tracking-[0.14em] transition-opacity ${
      isActive ? 'opacity-100' : 'opacity-85 hover:opacity-100'
    }`;

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="vvm-shell flex h-9 items-center justify-between text-[12px]">
          <div className="flex items-center gap-6">
            <a href="tel:+2347014077204" className="flex items-center gap-1.5 hover:opacity-80">
              <Phone className="h-3.5 w-3.5" /> +234 701 407 7204
            </a>
            <a href="mailto:Valuevillemall@gmail.com" className="flex items-center gap-1.5 hover:opacity-80">
              <Mail className="h-3.5 w-3.5" /> Valuevillemall@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-accent">
              <Truck className="h-3.5 w-3.5" /> Free delivery on orders above ₦200,000
            </span>
            <Link to="/account" className="hover:opacity-80">Track Order</Link>
            <Link to="/testing" className="hover:opacity-80">Help Center</Link>
          </div>
        </div>
      </div>

      <div className="bg-card">
        <div className="vvm-shell flex h-[72px] items-center gap-4">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <BrandMark className="h-10 w-10 rounded-xl" />
            <span className="leading-none">
              <span className="block font-heading text-[20px] font-bold text-primary">
                Valueville<span className="text-accent">mall</span>
              </span>
              <span className="mt-1 block text-[10.5px] text-muted-foreground">
                Cart it, love it.
              </span>
            </span>
          </Link>

          <form onSubmit={submitSearch} className="hidden flex-1 items-center lg:flex">
            <div className="relative">
              <button
                type="button"
                onClick={() => setCatOpen((v) => !v)}
                className="flex h-11 items-center gap-2 rounded-l-full border border-r-0 border-border bg-secondary px-4 text-[12.5px] font-medium"
              >
                {category}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {catOpen && (
                <div className="absolute left-0 top-12 z-50 max-h-80 w-60 overflow-auto rounded-xl border border-border bg-popover p-1.5 shadow-xl">
                  {['All Categories', ...CATEGORIES].map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        setCategory(name);
                        setCatOpen(false);
                      }}
                      className="block w-full rounded-lg px-3 py-2 text-left text-[13px] hover:bg-secondary"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products, brands and categories…"
              className="h-11 w-[320px] border border-r-0 border-border bg-card px-4 text-[13.5px] outline-none focus:ring-2 focus:ring-accent/40 xl:w-[420px]"
            />
            <button
              type="submit"
              className="flex h-11 items-center gap-2 rounded-r-full bg-accent px-6 text-[13px] font-semibold text-accent-foreground transition hover:brightness-95"
            >
              <Search className="h-4 w-4" /> Search
            </button>
          </form>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <Link
              to="/saved"
              className="relative hidden h-11 w-11 items-center justify-center rounded-full hover:bg-secondary sm:flex"
              aria-label="Saved items"
            >
              <Heart className="h-5 w-5 text-primary" />
              {saved.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                  {saved.length}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-secondary"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5 text-primary" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/account"
              className="hidden items-center gap-2 rounded-full border border-border px-4 py-2.5 text-[12.5px] font-medium transition hover:border-primary hover:bg-secondary sm:flex"
            >
              <User className="h-4 w-4" /> My Account
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-secondary lg:hidden"
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-border bg-card lg:hidden">
            <div className="vvm-shell py-4">
              <form onSubmit={submitSearch} className="mb-4 flex">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products…"
                  className="h-11 flex-1 rounded-l-full border border-border bg-background px-4 text-[13.5px] outline-none"
                />
                <button
                  type="submit"
                  className="flex h-11 items-center rounded-r-full bg-accent px-5 text-accent-foreground"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>
              <div className="grid grid-cols-2 gap-2">
                {NAV.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg bg-secondary px-4 py-3 text-[13px] font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <nav className="hidden bg-accent text-accent-foreground lg:block">
        <div className="vvm-shell flex h-11 items-center gap-8">
          {NAV.map((item) => (
            <NavLink key={item.label} to={item.to} className={navLinkClass} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
          <span className="ml-auto font-heading text-[11.5px] font-semibold uppercase tracking-[0.3em]">
            Cart It, Love It
          </span>
        </div>
      </nav>
    </header>
  );
}
