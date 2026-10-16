import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { CATEGORIES } from '@/data/catalogue';
import ProductCard from '@/components/ProductCard';

const SORTS = [
  { value: 'newest', label: 'Newest arrivals' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
];

const SORT_MAP = {
  newest: '-created_date',
  'price-asc': 'price',
  'price-desc': '-price',
  rating: '-rating',
};

const PLAN_OPTIONS = [
  { value: '', label: 'All items' },
  { value: 'installment', label: 'Installment plans (6+ months)' },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const category = params.get('category') || '';
  const q = params.get('q') || '';
  const plan = params.get('plan') || '';
  const deals = params.get('deals') === '1';
  const sort = params.get('sort') || 'newest';

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      const query = {};
      if (category) query.category = category;
      if (q) query.name = { $regex: q, $options: 'i' };
      if (deals) query.old_price = { $gt: 0 };
      if (plan === 'installment') query.max_months = { $gte: 6 };
      else if (plan === 'short') query.max_months = { $lt: 6 };

      const page = await base44.entities.Product.filter(query, {
        sort: SORT_MAP[sort] || '-created_date',
        limit: 48,
      });
      if (!active) return;
      setProducts(page.items || []);
      setLoading(false);
    };
    load();
    return () => {
      active = false;
    };
  }, [category, q, plan, deals, sort]);

  const chips = [
    category && { key: 'category', label: category },
    q && { key: 'q', label: `“${q}”` },
    plan === 'installment' && { key: 'plan', label: 'Installment plans' },
    deals && { key: 'deals', label: 'On deal' },
  ].filter(Boolean);

  const FilterPanel = (
    <div className="space-y-7">
      <div>
        <h3 className="vvm-label text-primary">Category</h3>
        <div className="mt-3 space-y-1">
          <button
            type="button"
            onClick={() => setParam('category', '')}
            className={`block w-full rounded-lg px-3 py-2 text-left text-[13.5px] transition ${
              category ? 'hover:bg-secondary' : 'bg-secondary font-semibold'
            }`}
          >
            All categories
          </button>
          {CATEGORIES.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setParam('category', name)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-[13.5px] transition ${
                category === name ? 'bg-secondary font-semibold' : 'hover:bg-secondary'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="vvm-label text-primary">Payment option</h3>
        <div className="mt-3 space-y-1">
          {PLAN_OPTIONS.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => setParam('plan', option.value)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-[13.5px] transition ${
                plan === option.value ? 'bg-secondary font-semibold' : 'hover:bg-secondary'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="vvm-label text-primary">Offers</h3>
        <button
          type="button"
          onClick={() => setParam('deals', deals ? '' : '1')}
          className={`mt-3 block w-full rounded-lg px-3 py-2 text-left text-[13.5px] transition ${
            deals ? 'bg-secondary font-semibold' : 'hover:bg-secondary'
          }`}
        >
          Deals of the day
        </button>
      </div>
    </div>
  );

  return (
    <div className="vvm-shell py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="vvm-label text-accent">Catalogue</span>
          <h1 className="mt-2 font-heading text-[28px] font-bold text-primary sm:text-[36px]">
            {deals ? 'Deals of the day' : category || 'Everything in store'}
          </h1>
          <p className="mt-2 text-[13.5px] text-muted-foreground">
            {loading ? 'Loading products…' : `${products.length} product${products.length === 1 ? '' : 's'} available`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-[13px] font-medium lg:hidden"
          >
            {filtersOpen ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />} Filters
          </button>
          <select
            value={sort}
            onChange={(event) => setParam('sort', event.target.value)}
            className="rounded-full border border-border bg-card px-4 py-2.5 text-[13px] outline-none"
          >
            {SORTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {chips.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => setParam(chip.key, '')}
              className="flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-[12.5px] font-medium"
            >
              {chip.label} <X className="h-3 w-3" />
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 gap-9 lg:flex">
        <aside className="hidden w-[236px] shrink-0 lg:block">
          <div className="sticky top-[168px] rounded-2xl border border-border bg-card p-5">
            {FilterPanel}
          </div>
        </aside>

        {filtersOpen && (
          <div className="mb-6 rounded-2xl border border-border bg-card p-5 lg:hidden">{FilterPanel}</div>
        )}

        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[430px] animate-pulse rounded-2xl border border-border bg-card"
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center">
              <h3 className="font-heading text-[20px] font-bold text-primary">
                Nothing matched that search
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-[14px] text-muted-foreground">
                Try a different category, or clear your filters to see the full catalogue.
              </p>
              <button
                type="button"
                onClick={() => setParams(new URLSearchParams())}
                className="mt-6 rounded-full bg-primary px-6 py-3 font-heading text-[12.5px] font-semibold uppercase tracking-[0.12em] text-primary-foreground"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
