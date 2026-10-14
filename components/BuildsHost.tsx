"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useReducedMotion } from "@/lib/hooks";

const VT = "build-plate";

type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

/**
 * Turns every [data-open-build] link inside it into a build-sheet dialog.
 * Links keep their real href (/builds/slug), so without JS, or with a
 * middle-click, they still go to the standalone page.
 * The plate morphs into the sheet via the View Transitions API where supported.
 */
export function BuildsHost({
  order,
  titles,
  sheets,
  children,
}: {
  order: string[];
  titles: Record<string, string>;
  sheets: Record<string, React.ReactNode>;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const plateEl = (slug: string) => document.querySelector<HTMLElement>(`[data-plate="${slug}"]`);

  const open = useCallback(
    (slug: string, from?: HTMLElement | null) => {
      if (!sheets[slug]) return;
      returnFocus.current = from ?? (document.activeElement as HTMLElement | null);
      const doc = document as DocWithVT;
      const commit = () => {
        flushSync(() => setActive(slug));
        if (!dialogRef.current?.open) dialogRef.current?.showModal();
        scrollRef.current?.scrollTo({ top: 0 });
      };
      history.replaceState(null, "", `#build=${slug}`);
      const src = plateEl(slug);
      if (!doc.startViewTransition || reduced || !src) return commit();
      src.style.viewTransitionName = VT;
      doc.startViewTransition(() => {
        src.style.viewTransitionName = "";
        commit();
      });
    },
    [sheets, reduced],
  );

  const close = useCallback(() => {
    if (!active) return;
    const doc = document as DocWithVT;
    const src = plateEl(active);
    const commit = () => {
      flushSync(() => setActive(null));
      dialogRef.current?.close();
    };
    history.replaceState(null, "", "#builds");
    const restore = () => returnFocus.current?.focus({ preventScroll: true });
    // Only morph back if the source plate is on screen; otherwise just close.
    const r = src?.getBoundingClientRect();
    const onScreen = r && r.bottom > 0 && r.top < window.innerHeight;
    if (!doc.startViewTransition || reduced || !src || !onScreen) {
      commit();
      restore();
      return;
    }
    const t = doc.startViewTransition(() => {
      commit();
      src.style.viewTransitionName = VT;
    });
    t.finished.finally(() => {
      src.style.viewTransitionName = "";
      restore();
    });
  }, [active, reduced]);

  // Deep links (#build=slug), including ones set by the command palette.
  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/^#build=([\w-]+)/);
      if (m && sheets[m[1]]) {
        document.getElementById("builds")?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
        open(m[1]);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = (e: React.MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as HTMLElement).closest<HTMLElement>("[data-open-build]");
    if (!link) return;
    e.preventDefault();
    open(link.dataset.openBuild!, link);
  };

  const idx = active ? order.indexOf(active) : -1;
  const prev = idx >= 0 ? order[(idx - 1 + order.length) % order.length] : null;
  const next = idx >= 0 ? order[(idx + 1) % order.length] : null;

  const swap = (slug: string) => {
    setActive(slug);
    history.replaceState(null, "", `#build=${slug}`);
    scrollRef.current?.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div onClick={onClick}>
      {children}
      <dialog
        ref={dialogRef}
        className="sheet"
        aria-label={active ? `${titles[active]}: build sheet` : "Build sheet"}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
      >
        {active && (
          <div className="flex h-full flex-col bg-ink">
            <div className="px-gutter flex h-[var(--bar-h)] shrink-0 items-center justify-between gap-4 border-b border-line">
              <p className="label truncate text-dim">
                <span className="text-signal">open</span> ~/builds/{active}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => prev && swap(prev)}
                  className="label hidden h-8 border border-line-strong px-3 text-bone-2 transition-colors hover:border-signal hover:text-signal sm:block"
                >
                  ← prev
                </button>
                <button
                  type="button"
                  onClick={() => next && swap(next)}
                  className="label hidden h-8 border border-line-strong px-3 text-bone-2 transition-colors hover:border-signal hover:text-signal sm:block"
                >
                  next →
                </button>
                <a
                  href={`/builds/${active}`}
                  className="label hidden h-8 items-center border border-line-strong px-3 text-bone-2 transition-colors hover:border-signal hover:text-signal md:flex"
                >
                  permalink
                </a>
                <button
                  type="button"
                  onClick={close}
                  autoFocus
                  className="label flex h-8 items-center gap-2 border border-bone bg-bone px-3 text-ink transition-colors hover:border-signal hover:bg-signal"
                >
                  close <span aria-hidden>esc</span>
                </button>
              </div>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
              {sheets[active]}
              {next && (
                <div className="px-gutter mx-auto max-w-[1400px] pb-20">
                  <button
                    type="button"
                    onClick={() => swap(next)}
                    className="group block w-full border-t border-line pt-8 text-left"
                  >
                    <span className="label text-dim">next build →</span>
                    <span className="display mt-3 block text-[clamp(2.4rem,6vw,5rem)] text-bone-2 transition-colors group-hover:text-signal">
                      {titles[next]}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
