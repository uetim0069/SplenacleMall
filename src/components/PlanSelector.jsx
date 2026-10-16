import { money, monthlyFor, planMonths, INSTALLMENT_MIN_ORDER } from '@/data/catalogue';

const tenureList = (values) =>
  values.length > 1
    ? `${values.slice(0, -1).join(', ')} or ${values[values.length - 1]}`
    : `${values[0]}`;

export default function PlanSelector({ product, months, onChange }) {
  const options = planMonths(product);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onChange(0)}
          className={`rounded-2xl border p-4 text-left transition ${
            months === 0
              ? 'border-accent bg-accent/10'
              : 'border-border bg-card hover:border-primary'
          }`}
        >
          <span className="vvm-label text-muted-foreground">Pay in full</span>
          <p className="mt-2 font-heading text-[20px] font-bold text-primary">
            {money(product.price)}
          </p>
          <p className="mt-1 text-[12.5px] text-muted-foreground">Own it outright today</p>
        </button>

        {options.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className={`rounded-2xl border p-4 text-left transition ${
              months === value
                ? 'border-accent bg-accent/10'
                : 'border-border bg-card hover:border-primary'
            }`}
          >
            <span className="vvm-label text-muted-foreground">
              Pay in {value} month{value > 1 ? 's' : ''}
            </span>
            <p className="mt-2 font-heading text-[20px] font-bold text-primary">
              {money(monthlyFor(product.price, value))}
              <span className="text-[13px] font-medium text-muted-foreground">/month</span>
            </p>
            <p className="mt-1 text-[12.5px] text-muted-foreground">
              First payment {value} of {value}
            </p>
          </button>
        ))}
      </div>

      <p className="text-[12.5px] text-muted-foreground">
        {options.length
          ? `This item can be paid over ${tenureList(options)} months, or in full today. Installment plans need a ${money(
              INSTALLMENT_MIN_ORDER
            )} minimum order.`
          : `Installment plans start from ${money(
              INSTALLMENT_MIN_ORDER
            )} — this item is available on full payment only.`}
      </p>
    </div>
  );
}
