import type { LucideIcon } from "lucide-react";

export type BrandList = {
  name: string;
  /** Logo for light backgrounds */
  image?: string;
  /** Logo variant for dark mode */
  lightimg?: string;
  /** Used when no logo image is supplied */
  icon?: LucideIcon;
};

export type BrandSliderProps = {
  brandList: BrandList[];
  heading?: string;
};

/**
 * Infinite marquee. CROSSWAVE uses it for the sectors it supports.
 * Only add real client logos here once you have permission to show them.
 */
export default function BrandSlider({ brandList, heading = "Supporting businesses across different sectors" }: BrandSliderProps) {
  const items = [...brandList, ...brandList];

  return (
    <section aria-label={heading} className="border-y bg-brand-mist py-8 dark:bg-muted">
      <div className="container">
        <p className="mb-6 text-center font-heading text-xs font-extrabold uppercase tracking-[0.2em] text-muted-foreground">
          {heading}
        </p>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {items.map((brand, i) => {
            const Icon = brand.icon;
            const duplicate = i >= brandList.length;
            return (
              <li
                key={`${brand.name}-${i}`}
                aria-hidden={duplicate || undefined}
                className="flex shrink-0 items-center gap-3 rounded-full border bg-background px-5 py-3"
              >
                {brand.image ? (
                  <>
                    <img src={brand.image} alt={duplicate ? "" : brand.name} className="h-7 w-auto dark:hidden" />
                    {brand.lightimg && <img src={brand.lightimg} alt="" className="hidden h-7 w-auto dark:block" />}
                  </>
                ) : (
                  <>
                    {Icon && <Icon className="h-5 w-5 text-primary" aria-hidden="true" />}
                    <span className="whitespace-nowrap font-heading text-sm font-bold text-foreground">{brand.name}</span>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
