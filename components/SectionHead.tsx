import type { ReactNode } from "react";

/** Every section opens on a hairline with its path, like a file header. */
export function SectionHead({
  path,
  meta,
  title,
  id,
  children,
}: {
  path: string;
  meta: string;
  title: ReactNode;
  id: string;
  children?: ReactNode;
}) {
  return (
    <header className="grid gap-y-6 border-t border-line pt-5 md:grid-cols-12 md:gap-x-6">
      <p className="label md:col-span-3" data-reveal>
        <span className="text-signal">{path}</span>
        <br />
        <span className="text-dim">{meta}</span>
      </p>
      <div className="md:col-span-9">
        <h2 id={id} className="display text-[clamp(2.9rem,7.4vw,7rem)] text-bone" data-reveal>
          {title}
        </h2>
        {children && (
          <div className="mt-6 max-w-[56ch] text-lg leading-relaxed text-bone-2" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
