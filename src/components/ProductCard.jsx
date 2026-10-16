import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { money, monthlyFor, discountPercent, planMonths } from '@/data/catalogue';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/components/ui/use-toast';

export default function ProductCard({ product }) {
  const { addToCart, toggleSaved, isSaved } = useCart();
  const { toast } = useToast();
  const months = planMonths(product)[0] || 0;
  const off = discountPercent(product.price, product.old_price);
  const saved = isSaved(product.id);

  const handleAdd = () => {
    addToCart(product, months);
    toast({
      title: 'Added to cart',
      description: `${product.name} · ${months > 0 ? `${months} month plan` : 'Full payment'}`,
    });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(10,61,46,0.45)]">
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-secondary">
            <Image
              src={product.image_url}
              alt={product.name}
              className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        </Link>
        {off > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 font-heading text-[11px] font-bold text-accent-foreground">
            -{off}%
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleSaved(product)}
          aria-label={saved ? 'Remove from saved' : 'Save item'}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 backdrop-blur transition hover:bg-card"
        >
          <Heart
            className={`h-4 w-4 ${saved ? 'fill-accent text-accent' : 'text-primary'}`}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="vvm-label text-muted-foreground">{product.brand}</span>
        <Link
          to={`/product/${product.id}`}
          className="mt-1.5 line-clamp-2 font-heading text-[15px] font-semibold leading-snug hover:text-accent"
        >
          {product.name}
        </Link>

        <div className="mt-1.5 flex items-center gap-1 text-[12px] text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          {product.rating} ({product.reviews_count})
        </div>

        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="font-heading text-[19px] font-bold text-primary">
            {money(product.price)}
          </span>
          {product.old_price > product.price && (
            <span className="text-[12.5px] text-muted-foreground line-through">
              {money(product.old_price)}
            </span>
          )}
        </div>

        <div className="mt-3 space-y-1 rounded-xl bg-secondary p-3 text-[12.5px]">
          {months > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Pay in {months} months</span>
              <span className="font-semibold text-primary">
                {money(monthlyFor(product.price, months))}/mo
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Pay in full</span>
            <span className="font-semibold text-primary">{money(product.price)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="mt-4 flex h-11 items-center justify-center gap-2 rounded-full bg-primary font-heading text-[12.5px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition hover:bg-accent hover:text-accent-foreground"
        >
          <ShoppingCart className="h-4 w-4" /> Add to cart
        </button>
      </div>
    </article>
  );
}
