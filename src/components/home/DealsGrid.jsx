import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/data/catalogue';

export default function DealsGrid() {
  const deals = PRODUCTS.filter((p) => p.featured).slice(0, 5);

  return (
    <section className="vvm-shell py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="vvm-label text-accent">Limited time</span>
          <h2 className="mt-2 font-heading text-[26px] font-bold text-primary sm:text-[34px]">
            Deals of the day
          </h2>
        </div>
        <Link
          to="/shop?deals=1"
          className="flex items-center gap-2 text-[13.5px] font-medium text-accent hover:underline"
        >
          View all deals <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {deals.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}
