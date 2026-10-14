import type { PlateKind } from "@/data/builds";
import { cn } from "@/lib/cn";
import { AirDrawPlate } from "./AirDrawPlate";
import { FinancePlate } from "./FinancePlate";
import { LibraryPlate } from "./LibraryPlate";
import { ShopflowPlate } from "./ShopflowPlate";

const ART: Record<PlateKind, () => React.JSX.Element> = {
  "air-draw": AirDrawPlate,
  library: LibraryPlate,
  shopflow: ShopflowPlate,
  finance: FinancePlate,
};

/** A specimen plate: framed art with registration marks and a figure caption. */
export function Plate({
  kind,
  caption,
  className,
  frameProps,
}: {
  kind: PlateKind;
  caption?: string;
  className?: string;
  frameProps?: React.HTMLAttributes<HTMLDivElement> & Record<`data-${string}`, string>;
}) {
  const Art = ART[kind];
  return (
    <figure className={cn("m-0", className)}>
      <div {...frameProps} className={cn("reg border border-line bg-ink-1", frameProps?.className)}>
        <span aria-hidden className="reg-b" />
        <div className="bg-grid aspect-[16/11] overflow-hidden">
          <Art />
        </div>
      </div>
      {caption && <figcaption className="label mt-3 text-dim">{caption}</figcaption>}
    </figure>
  );
}
