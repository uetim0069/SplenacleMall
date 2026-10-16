import { Link } from 'react-router-dom';
import { useCart } from '@/lib/CartContext';
import ProductCard from '@/components/ProductCard';

export default function Saved() {
  const { saved } = useCart();

  return (
    <div className="vvm-shell py-10">
      <span className="vvm-label text-accent">Wishlist</span>
      <h1 className="mt-2 font-heading text-[28px] font-bold text-primary sm:text-[36px]">
        Saved items
      </h1>

      {saved.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-border bg-card p-12 text-center">
          <p className="text-[14.5px] text-muted-foreground">
            Tap the heart on any product to keep it here for later.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-block rounded-full bg-accent px-6 py-3.5 font-heading text-[12.5px] font-semibold uppercase tracking-[0.12em] text-accent-foreground"
          >
            Browse the catalogue
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {saved.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
