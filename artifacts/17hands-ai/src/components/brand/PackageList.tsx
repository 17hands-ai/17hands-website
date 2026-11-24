import { Check } from "lucide-react";
import { packageDef, priceLabel, type PackageId } from "@/lib/packages";
import { useContent } from "@/i18n";

/** Package rows with name, fit, inclusions and starting price, read from the same source as /packages. */
export function PackageList({ ids }: { ids: PackageId[] }) {
  const content = useContent();
  return (
    <ul className="divide-y divide-white/10 border-y border-white/10">
      {ids.map((id) => {
        const item = content.packages.items[id];
        return (
          <li key={id} className="grid gap-4 py-7 md:grid-cols-[1fr_auto] md:gap-10">
            <div>
              <h3 className="font-sans text-xl font-semibold text-[var(--brand-text)]">{item.name}</h3>
              <p className="mt-1 text-[var(--brand-text-2)]">{item.fit}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {item.includes.map((line) => (
                  <li key={line} className="flex gap-2 text-sm text-[var(--brand-text-2)]">
                    <Check size={16} className="mt-0.5 shrink-0 text-[var(--brand-rose)]" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <p className="display text-2xl rose-text whitespace-nowrap md:text-right">{priceLabel(packageDef(id), content.price)}</p>
          </li>
        );
      })}
    </ul>
  );
}
