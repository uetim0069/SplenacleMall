import { Link } from 'react-router-dom';
import {
  Car,
  Footprints,
  Laptop,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
  Smartphone,
  Sofa,
  Sparkles,
  Tv,
  WashingMachine,
} from 'lucide-react';

const ICONS = {
  Electronics: Tv,
  'Phones & Accessories': Smartphone,
  Computers: Laptop,
  Fashion: Shirt,
  Shoes: Footprints,
  Bags: ShoppingBag,
  'Home Appliances': WashingMachine,
  Furniture: Sofa,
  'Beauty & Health': Sparkles,
  Groceries: ShoppingBasket,
  Vehicles: Car,
};

const CATEGORIES = Object.keys(ICONS);

export default function CategoryRail() {
  return (
    <section className="border-b border-border bg-card">
      <div className="vvm-shell py-8">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-heading text-[20px] font-bold text-primary sm:text-[24px]">
            Shop by category
          </h2>
          <Link to="/shop" className="text-[13px] font-medium text-accent hover:underline">
            Browse everything
          </Link>
        </div>

        <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
          {CATEGORIES.map((name) => {
            const Icon = ICONS[name];
            return (
              <Link
                key={name}
                to={`/shop?category=${encodeURIComponent(name)}`}
                className="group flex w-[124px] shrink-0 flex-col items-center gap-3 rounded-2xl border border-border bg-background px-3 py-5 text-center transition hover:border-accent hover:bg-secondary"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary transition group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-[12px] font-medium leading-tight">{name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
