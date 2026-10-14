"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections } from "@/data/site";
import { Clock } from "./Clock";
import { CommandPalette } from "./CommandPalette";
import { useReducedMotion } from "@/lib/hooks";

const GLYPHS = "abcdefghijklmnopqrstuvwxyz/~_-.";

/** Re-types a path like a terminal when it changes. */
function useScramble(target: string, enabled: boolean) {
  const [text, setText] = useState(target);
  const frame = useRef(0);

  useEffect(() => {
    if (!enabled) {
      const id = requestAnimationFrame(() => setText(target));
      return () => cancelAnimationFrame(id);
    }
    let i = 0;
    const steps = 14;
    const run = () => {
      i++;
      const settled = Math.floor((i / steps) * target.length);
      setText(
        target
          .split("")
          .map((ch, k) => (k < settled || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join(""),
      );
      if (i < steps) frame.current = requestAnimationFrame(run);
      else setText(target);
    };
    frame.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frame.current);
  }, [target, enabled]);

  return text;
}

export function TopBar() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [active, setActive] = useState("~/bench");
  const [scrolled, setScrolled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Track which section crosses the reading line.
  useEffect(() => {
    if (pathname !== "/") return;
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const s = sections.find((x) => x.id === e.target.id);
            if (s) setActive(s.path);
          }
        }
      },
      { rootMargin: "-38% 0px -58% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ⌘K / Ctrl+K / "/" opens the index.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const path = pathname === "/" ? active : pathname.startsWith("/builds/") ? `~${pathname}` : `~${pathname}`;
  const readout = useScramble(path, !reduced);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[var(--bar-h)] border-b transition-colors duration-500 ${
          scrolled ? "border-line bg-ink/95" : "border-transparent bg-ink/0"
        }`}
      >
        <div className="px-gutter mx-auto grid h-full max-w-[1600px] grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <Link href="/" className="group label flex items-center gap-2.5 text-bone" aria-label="TehSaad, back to the start">
            <span aria-hidden className="relative grid size-4 place-items-center">
              <span className="absolute inset-0 border border-line-strong transition-colors group-hover:border-signal" />
              <span className="size-1.5 bg-signal" />
            </span>
            <span className="text-[0.75rem] tracking-[0.12em]">tehsaad</span>
            <span className="hidden text-dim sm:inline">/ bench</span>
          </Link>

          <p className="label hidden items-center gap-2 text-bone-2 md:flex" aria-live="off">
            <span className="text-signal">cd</span>
            <span className="min-w-[14ch] text-bone">{readout}</span>
          </p>

          <div className="flex items-center justify-end gap-5">
            <Clock className="label hidden text-bone-2 lg:inline" />
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="label group flex h-8 items-center gap-2.5 border border-line-strong px-3 text-bone transition-colors hover:border-signal hover:text-signal"
              aria-haspopup="dialog"
            >
              Index
              <kbd className="hidden border-l border-line-strong pl-2.5 font-mono text-dim group-hover:text-signal sm:inline">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
      </header>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
