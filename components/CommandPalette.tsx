"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { sections, site } from "@/data/site";
import { builds } from "@/data/builds";

type Item = { id: string; group: string; label: string; meta: string; href: string; external?: boolean };

function buildItems(onHome: boolean): Item[] {
  const items: Item[] = [
    ...sections.map((s) => ({
      id: `s-${s.id}`,
      group: "Go to",
      label: s.path,
      meta: s.hint,
      href: onHome ? `#${s.id}` : `/#${s.id}`,
    })),
    ...builds.map((b) => ({
      id: `b-${b.slug}`,
      group: "Open build sheet",
      label: b.name,
      meta: b.file,
      href: onHome ? `#build=${b.slug}` : `/builds/${b.slug}`,
    })),
    { id: "l-gh", group: "Elsewhere", label: "GitHub", meta: "github.com/tehsaad", href: site.links.github, external: true },
  ];
  if (site.links.linkedin)
    items.push({ id: "l-li", group: "Elsewhere", label: "LinkedIn", meta: "profile", href: site.links.linkedin, external: true });
  if (site.links.email)
    items.push({ id: "l-em", group: "Elsewhere", label: "Email", meta: site.links.email, href: `mailto:${site.links.email}` });
  return items;
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  const all = useMemo(() => buildItems(pathname === "/"), [pathname]);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((i) => `${i.label} ${i.meta} ${i.group}`.toLowerCase().includes(q));
  }, [all, query]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  const close = () => {
    setQuery("");
    setCursor(0);
    onClose();
  };

  const go = (item: Item | undefined) => {
    if (!item) return;
    close();
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else if (item.href.startsWith("#")) {
      // Let the dialog close before moving, so focus lands on the target.
      requestAnimationFrame(() => {
        if (item.href.startsWith("#build=")) {
          window.location.hash = item.href.slice(1);
        } else {
          document.getElementById(item.href.slice(1))?.scrollIntoView();
          history.replaceState(null, "", item.href);
        }
      });
    } else {
      router.push(item.href);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[cursor]);
    }
  };

  return (
    <dialog
      ref={ref}
      onClose={close}
      onClick={(e) => e.target === ref.current && close()}
      aria-label="Site index"
      className="m-0 mx-auto mt-[12vh] w-[min(640px,calc(100vw-2rem))] border border-line-strong bg-ink-1 p-0 text-bone backdrop:bg-ink/80"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <span className="label text-signal">cd</span>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCursor(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="type a path, a build, a place…"
          className="h-14 w-full bg-transparent font-mono text-sm text-bone placeholder:text-dim focus:outline-none focus-visible:outline-none"
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={results[cursor] ? `${listId}-${results[cursor].id}` : undefined}
          aria-label="Search the site"
        />
        <kbd className="label border border-line px-1.5 py-0.5 text-dim">esc</kbd>
      </div>
      <ul id={listId} role="listbox" className="max-h-[52vh] overflow-y-auto py-2" aria-label="Results">
        {results.length === 0 && <li className="label px-4 py-6 text-dim">no such path</li>}
        {results.map((item, i) => {
          const header = i === 0 || results[i - 1].group !== item.group ? item.group : null;
          return (
            <li key={item.id} role="presentation">
              {header && <p className="label px-4 pt-3 pb-1.5 text-dim">{header}</p>}
              <div
                id={`${listId}-${item.id}`}
                role="option"
                aria-selected={i === cursor}
                onMouseMove={() => setCursor(i)}
                onClick={() => go(item)}
                className={`flex cursor-pointer items-baseline justify-between gap-4 px-4 py-2.5 transition-colors ${
                  i === cursor ? "bg-ink-2 text-bone" : "text-bone-2"
                }`}
              >
                <span className="flex items-baseline gap-3">
                  <span className={`font-mono text-xs ${i === cursor ? "text-signal" : "text-line-strong"}`}>→</span>
                  <span className={item.group === "Go to" ? "font-mono text-sm" : "text-[0.95rem]"}>{item.label}</span>
                </span>
                <span className="label truncate text-dim">
                  {item.meta}
                  {item.external ? " ↗" : ""}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="label flex justify-between border-t border-line px-4 py-2.5 text-dim">
        <span>↑↓ move · ↵ open</span>
        <span>⌘K or / anywhere</span>
      </div>
    </dialog>
  );
}
