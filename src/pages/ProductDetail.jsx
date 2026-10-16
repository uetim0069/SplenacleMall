import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  BadgeCheck,
  Camera,
  Check,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import { money, monthlyFor, discountPercent, planMonths } from '@/data/catalogue';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/components/ui/use-toast';
import PlanSelector from '@/components/PlanSelector';
import ProductCard from '@/components/ProductCard';
import VideoPlayer from '@/components/VideoPlayer';

const TABS = ['Description', 'Specifications', 'Quality testing'];

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, toggleSaved, isSaved } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [months, setMonths] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState('Description');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    base44.entities.Product.get(id)
      .then((record) => {
        if (!active) return;
        setProduct(record);
        setMonths(planMonths(record)[0] || 0);
        setLoading(false);
        if (record?.category) {
          base44.entities.Product.filter(
            { category: record.category, id: { $ne: record.id } },
            { limit: 4 }
          ).then((page) => {
            if (active) setRelated(page.items || []);
          });
        }
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="vvm-shell py-16">
        <div className="h-[520px] animate-pulse rounded-3xl border border-border bg-card" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="vvm-shell py-20 text-center">
        <h1 className="font-heading text-[26px] font-bold text-primary">Product not found</h1>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-heading text-[12.5px] font-semibold uppercase tracking-[0.12em] text-primary-foreground"
        >
          Back to the shop
        </Link>
      </div>
    );
  }

  const off = discountPercent(product.price, product.old_price);
  const saved = isSaved(product.id);
  const payable = months === 0 ? product.price : monthlyFor(product.price, months);

  const handleAdd = () => {
    for (let index = 0; index < quantity; index += 1) addToCart(product, months);
    toast({
      title: 'Added to cart',
      description: `${product.name} · ${months === 0 ? 'Full payment' : `${months} month plan`}`,
    });
  };

  return (
    <div className="vvm-shell py-10">
      <nav className="text-[12.5px] text-muted-foreground">
        <Link to="/" className="hover:text-accent">Home</Link>
        <span className="px-2">/</span>
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-accent">
          {product.category}
        </Link>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
            <Image
              src={product.image_url}
              alt={product.name}
              className="aspect-square w-full"
            />
            {off > 0 && (
              <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1.5 font-heading text-[12px] font-bold text-accent-foreground">
                -{off}%
              </span>
            )}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-3.5">
              <BadgeCheck className="h-4 w-4 shrink-0 text-accent" />
              <span className="text-[12px] leading-tight">Genuine &amp; tested</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-3.5">
              <Truck className="h-4 w-4 shrink-0 text-accent" />
              <span className="text-[12px] leading-tight">Nationwide delivery</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-3.5">
              <Camera className="h-4 w-4 shrink-0 text-accent" />
              <span className="text-[12px] leading-tight">Video test proof</span>
            </div>
          </div>
        </div>

        <div>
          <span className="vvm-label text-accent">{product.brand}</span>
          <h1 className="mt-3 font-heading text-[27px] font-bold leading-tight text-primary sm:text-[34px]">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-4 text-[13px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-accent text-accent" />
              {product.rating} · {product.reviews_count} reviews
            </span>
            <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="font-heading text-[32px] font-bold text-primary">
              {money(product.price)}
            </span>
            {product.old_price > product.price && (
              <span className="text-[15px] text-muted-foreground line-through">
                {money(product.old_price)}
              </span>
            )}
          </div>

          <div className="mt-7">
            <h2 className="font-heading text-[16px] font-semibold">Choose how you pay</h2>
            <div className="mt-4">
              <PlanSelector product={product} months={months} onChange={setMonths} />
            </div>
          </div>

          <div className="mt-7 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-[13.5px] text-muted-foreground">
                {months === 0 ? 'Pay in full today' : `Per month for ${months} month${months > 1 ? 's' : ''}`}
              </span>
              <span className="font-heading text-[22px] font-bold text-primary">{money(payable)}</span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center rounded-full border border-border">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="flex h-11 w-11 items-center justify-center rounded-l-full hover:bg-secondary"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-heading text-[15px] font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-r-full hover:bg-secondary"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={product.stock <= 0}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary font-heading text-[12.5px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
              >
                <ShoppingCart className="h-4 w-4" /> Add to cart
              </button>

              <button
                type="button"
                onClick={() => toggleSaved(product)}
                aria-label="Save item"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border hover:bg-secondary"
              >
                <Heart className={`h-4 w-4 ${saved ? 'fill-accent text-accent' : 'text-primary'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex flex-wrap gap-2 border-b border-border">
          {TABS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setTab(name)}
              className={`-mb-px border-b-2 px-4 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.1em] transition ${
                tab === name ? 'border-accent text-primary' : 'border-transparent text-muted-foreground'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="mt-7">
          {tab === 'Description' && (
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}

          {tab === 'Specifications' && (
            <div className="max-w-3xl overflow-hidden rounded-2xl border border-border bg-card">
              {(product.specs || []).map((spec, index) => (
                <div
                  key={spec.label}
                  className={`flex justify-between gap-6 px-5 py-4 text-[13.5px] ${
                    index % 2 === 1 ? 'bg-secondary/60' : ''
                  }`}
                >
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="text-right font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {tab === 'Quality testing' && (
            <div className="grid max-w-5xl gap-8 lg:grid-cols-2">
              <div>
                <h3 className="font-heading text-[18px] font-semibold">
                  How we test this before delivery
                </h3>
                <ul className="mt-4 space-y-3">
                  {(product.testing_notes || []).map((note) => (
                    <li key={note} className="flex items-start gap-3 text-[14px]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
                        <Check className="h-3 w-3 text-accent-foreground" />
                      </span>
                      <span className="text-muted-foreground">{note}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[13px] text-muted-foreground">
                  The footage of your exact item is attached to your order, and you can watch it
                  from your dashboard before it leaves us.
                </p>
              </div>
              <VideoPlayer
                poster={product.image_url}
                caption="Test footage for your exact item appears here once our lab has tested it."
              />
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-heading text-[22px] font-bold text-primary">
            More in {product.category}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
