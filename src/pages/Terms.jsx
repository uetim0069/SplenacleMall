import { Link } from 'react-router-dom';
import { ArrowRight, ShieldAlert } from 'lucide-react';
import { TERMS, TERMS_INTRO, TERMS_UPDATED } from '@/data/terms';

export default function Terms() {
  return (
    <div className="vvm-shell py-12">
      <div className="max-w-3xl">
        <span className="vvm-label text-accent">Legal</span>
        <h1 className="mt-3 font-heading text-[30px] font-bold leading-tight text-primary sm:text-[42px]">
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 text-[12.5px] uppercase tracking-[0.14em] text-muted-foreground">
          Last updated: {TERMS_UPDATED}
        </p>
        <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">{TERMS_INTRO}</p>
      </div>

      <div className="mt-10 gap-10 lg:flex">
        <aside className="hidden w-[252px] shrink-0 lg:block">
          <nav className="sticky top-[168px] rounded-2xl border border-border bg-card p-5">
            <p className="vvm-label text-muted-foreground">On this page</p>
            <ol className="mt-4 space-y-2.5">
              {TERMS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block text-[12.5px] leading-snug text-muted-foreground transition hover:text-accent"
                  >
                    {section.number}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="min-w-0 flex-1 space-y-6">
          {TERMS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-[180px] rounded-2xl border border-border bg-card p-6 sm:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary font-heading text-[12.5px] font-bold text-primary">
                  {section.number}
                </span>
                <h2 className="font-heading text-[17px] font-bold text-primary sm:text-[19px]">
                  {section.title}
                </h2>
              </div>

              {section.highlight && (
                <div className="mt-4 flex items-start gap-3 rounded-xl bg-destructive/10 p-4 text-[13px] leading-relaxed text-destructive">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{section.highlight}</span>
                </div>
              )}

              <div className="mt-4 space-y-3 text-[13.5px] leading-relaxed text-muted-foreground">
                {(section.paragraphs || []).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {(section.clauses || []).map((clause) => (
                  <p key={clause.n}>
                    <span className="font-semibold text-foreground">{clause.n}</span>{' '}
                    {clause.text}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-primary p-7 text-primary-foreground sm:flex-row sm:items-center">
            <div>
              <h2 className="font-heading text-[21px] font-bold">
                By shopping with us you agree to cart it and you will love it
              </h2>
              <p className="mt-1.5 text-[13.5px] opacity-80">
                These terms apply to every order placed on Valuevillemall.
              </p>
            </div>
            <Link
              to="/shop"
              className="flex shrink-0 items-center gap-2 rounded-full bg-accent px-7 py-4 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-accent-foreground"
            >
              Shop now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
