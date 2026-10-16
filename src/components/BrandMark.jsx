const LOGO_SRC =
  'https://media.base44.com/images/public/6ad1ccbe6503cfbecb151bf3/90c6d612b_valueville-mall-icon_3.svg';

export default function BrandMark({ className = 'h-10 w-10' }) {
  return (
    <span
      className={`vvm-logo-float relative inline-flex shrink-0 items-center justify-center ${className}`}
    >
      <span className="vvm-logo-glow" aria-hidden="true" />
      <span className="vvm-logo relative block h-full w-full overflow-hidden">
        <img
          src={LOGO_SRC}
          alt="Valuevillemall"
          className="relative z-10 h-full w-full object-contain"
        />
        <span className="vvm-logo-shine" aria-hidden="true" />
      </span>
    </span>
  );
}
