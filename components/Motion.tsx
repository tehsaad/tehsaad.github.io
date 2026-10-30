"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const WIDE = "(min-width: 900px) and (prefers-reduced-motion: no-preference)";
const NARROW = "(max-width: 899px) and (prefers-reduced-motion: no-preference)";

// Fan-out positions of the hero screenshots, as fractions of the viewport.
const SCATTER = [
  { x: -0.08, y: -0.33, r: -6, s: 0.9 },
  { x: 0.36, y: -0.27, r: 7, s: 1 },
  { x: -0.37, y: 0.31, r: 6, s: 0.96 },
  { x: 0.03, y: 0.37, r: -5, s: 0.82 },
  { x: 0.41, y: 0.37, r: -8, s: 0.78 },
  { x: 0.13, y: -0.1, r: 5, s: 0.68 },
];

function intro() {
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
  tl.from("[data-letter]", { yPercent: 118, rotate: 8, duration: 1.15, stagger: 0.035 })
    .from("[data-hero-shot]", { autoAlpha: 0, scale: 0.55, duration: 1.3, stagger: 0.07 }, 0.15)
    .fromTo("[data-intro]", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.55);
  return tl;
}

function hero() {
  const shots = gsap.utils.toArray<HTMLElement>("[data-hero-shot]");
  shots.forEach((el, i) => {
    const p = SCATTER[i % SCATTER.length];
    gsap.set(el, {
      x: () => p.x * window.innerWidth,
      y: () => p.y * window.innerHeight,
      rotation: p.r,
      scale: p.s,
    });
  });
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "+=190%", pin: true, scrub: 0.7, anticipatePin: 1, invalidateOnRefresh: true },
  });
  tl.to('[data-hero-line="left"]', { xPercent: -42, autoAlpha: 0, duration: 0.45 }, 0)
    .to('[data-hero-line="right"]', { xPercent: 42, autoAlpha: 0, duration: 0.45 }, 0)
    .to("[data-intro]", { autoAlpha: 0, duration: 0.2 }, 0)
    .to(shots, { x: 0, y: 0, rotation: (i) => (i - 2.5) * 4, scale: 1.05, duration: 0.5, stagger: 0.015 }, 0.05)
    .to(shots, { rotation: 0, duration: 0.2 }, 0.55)
    .to(shots.slice(1), { autoAlpha: 0, duration: 0.05 }, 0.72)
    .to(shots[0], { scale: () => Math.max(window.innerWidth, window.innerHeight * 1.6) / shots[0].offsetWidth, duration: 0.28, ease: "power2.in" }, 0.72)
    .to(shots[0], { autoAlpha: 0, duration: 0.1 }, 0.92);

  // Pointer drift: the deck leans toward the cursor while it is scattered.
  const wrap = document.querySelector<HTMLElement>(".hero-shots")!;
  const glow = document.querySelector<HTMLElement>("[data-glow]")!;
  const wx = gsap.quickTo(wrap, "x", { duration: 1.1, ease: "power3" });
  const wy = gsap.quickTo(wrap, "y", { duration: 1.1, ease: "power3" });
  const gx = gsap.quickTo(glow, "x", { duration: 1.6, ease: "power3" });
  const gy = gsap.quickTo(glow, "y", { duration: 1.6, ease: "power3" });
  const onMove = (e: PointerEvent) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    wx(nx * -36);
    wy(ny * -28);
    gx(nx * window.innerWidth * 0.7);
    gy(ny * window.innerHeight * 0.7);
  };
  window.addEventListener("pointermove", onMove);
  return () => window.removeEventListener("pointermove", onMove);
}

function manifesto(pin: boolean) {
  gsap.fromTo(
    "[data-word]",
    { opacity: 0.14 },
    {
      opacity: 1,
      stagger: 0.1,
      ease: "none",
      scrollTrigger: pin
        ? { trigger: "[data-manifesto]", start: "top top", end: "+=130%", pin: true, scrub: 0.5 }
        : { trigger: "[data-manifesto]", start: "top 75%", end: "bottom 60%", scrub: 0.5 },
    },
  );
  gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count);
    const v = { n: 0 };
    gsap.to(v, {
      n: end,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = String(Math.round(v.n));
      },
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
}

function stack() {
  const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    gsap.fromTo(
      card.querySelector("[data-stack-visual]"),
      { yPercent: 16, rotate: 3, scale: 0.92 },
      { yPercent: -3, rotate: -1, scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top top", scrub: 0.6 } },
    );
    if (!next) return;
    // Each card recedes as the next one slides over it.
    gsap.fromTo(
      card,
      { scale: 1, rotation: 0, filter: "brightness(1)" },
      {
        scale: 0.88,
        rotation: i % 2 ? 1.6 : -1.6,
        filter: "brightness(0.66)",
        ease: "none",
        immediateRender: false,
        scrollTrigger: { trigger: next, start: "top 90%", end: "top 12%", scrub: 0.5 },
      },
    );
  });
}

function slides() {
  const track = document.querySelector<HTMLElement>("[data-slides-track]")!;
  const distance = () => track.scrollWidth - window.innerWidth;
  const move = gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: { trigger: "[data-slides]", start: "top top", end: () => "+=" + distance(), pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true },
  });
  gsap.utils.toArray<HTMLElement>("[data-slide]").forEach((slide, i) => {
    gsap.fromTo(
      slide,
      { rotate: i % 2 ? 7 : -7, y: i % 2 ? 90 : -50, scale: 0.86 },
      { rotate: 0, y: 0, scale: 1, ease: "none", scrollTrigger: { trigger: slide, containerAnimation: move, start: "left 100%", end: "left 45%", scrub: true } },
    );
  });
}

function deck() {
  const cards = gsap.utils.toArray<HTMLElement>("[data-deck-card]");
  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: { trigger: "[data-deck]", start: "top top", end: () => "+=" + cards.length * 70 + "%", pin: true, scrub: 0.6, anticipatePin: 1 },
  });
  cards.forEach((card, i) => {
    // Cards rise from below and land on top of the pile, each a little askew.
    const landed = { y: i * -10, x: i * 14, rotation: (i % 2 ? 1 : -1) * (2 + i), scale: 1 };
    if (i === 0) {
      gsap.set(card, landed);
      return;
    }
    tl.fromTo(card, { y: "110vh", x: i % 2 ? 180 : -180, rotation: (i % 2 ? 1 : -1) * 26, scale: 1.14 }, { ...landed, duration: 1 }, i - 1);
    tl.fromTo(cards[i - 1], { filter: "brightness(1)" }, { filter: "brightness(0.72)", duration: 0.5, immediateRender: false }, i - 0.6);
  });
}

function shared() {
  gsap.to("[data-progress]", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.2 } });

  // The ticker runs on its own and leans with scroll speed.
  const ticker = document.querySelector<HTMLElement>("[data-ticker]")!;
  const loop = gsap.to(ticker, { xPercent: -50, duration: 42, ease: "none", repeat: -1 });
  const skew = gsap.quickTo(ticker, "skewX", { duration: 0.5, ease: "power3" });
  ScrollTrigger.create({
    onUpdate: (self) => {
      const v = self.getVelocity();
      skew(gsap.utils.clamp(-10, 10, v / -220));
      loop.timeScale(1 + Math.min(Math.abs(v) / 450, 5));
    },
  });

  gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
    gsap.from(el, { yPercent: 40, autoAlpha: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
  });
  gsap.fromTo("[data-timeline-fill]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".timeline", start: "top 65%", end: "bottom 65%", scrub: 0.4 } });
  gsap.utils.toArray<HTMLElement>("[data-timeline-item]").forEach((el) => {
    gsap.from(el, { x: 70, autoAlpha: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 82%" } });
  });
  gsap.fromTo("[data-contact-title]", { scale: 0.62, backgroundPositionX: "100%" }, { scale: 1, backgroundPositionX: "0%", ease: "none", scrollTrigger: { trigger: ".contact", start: "top 85%", end: "top 15%", scrub: 0.5 } });
}

// Rows pan far enough that every item crosses the screen, alternating direction.
function skillRows() {
  gsap.utils.toArray<HTMLElement>("[data-skill-row]").forEach((row) => {
    const text = row.querySelector("p")!;
    const overflow = () => Math.max(40, text.scrollWidth - row.clientWidth + 90);
    const right = row.dataset.skillRow === "right";
    gsap.fromTo(
      text,
      { x: () => (right ? -overflow() : 0) },
      { x: () => (right ? 0 : -overflow()), ease: "none", scrollTrigger: { trigger: row, start: "top 92%", end: "bottom 22%", scrub: 0.6, invalidateOnRefresh: true } },
    );
  });
}

function pointerToys() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};
  const cursor = document.querySelector<HTMLElement>("[data-cursor]")!;
  cursor.style.display = "block";
  const cx = gsap.quickTo(cursor, "x", { duration: 0.28, ease: "power3" });
  const cy = gsap.quickTo(cursor, "y", { duration: 0.28, ease: "power3" });
  const onMove = (e: PointerEvent) => {
    cx(e.clientX);
    cy(e.clientY);
    const hot = (e.target as Element | null)?.closest?.("a, button");
    gsap.to(cursor, { scale: hot ? 3.2 : 1, duration: 0.25, overwrite: "auto" });
  };
  window.addEventListener("pointermove", onMove);

  const offs = gsap.utils.toArray<HTMLElement>("[data-magnetic]").map((el) => {
    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "elastic.out(1, 0.45)" });
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "elastic.out(1, 0.45)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.28);
      y((e.clientY - r.top - r.height / 2) * 0.4);
    };
    const leave = () => {
      x(0);
      y(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  });
  return () => {
    window.removeEventListener("pointermove", onMove);
    offs.forEach((off) => off());
  };
}

/** All page motion. The markup is complete without it, so no-JS and reduced-motion visitors get a plain, readable page. */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;

    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.('a[href^="#"]');
      const id = a?.getAttribute("href");
      if (!lenis || !id || id === "#main") return;
      e.preventDefault();
      lenis.scrollTo(id === "#top" ? 0 : id, { duration: 1.4 });
    };

    const startSmooth = () => {
      lenis = new Lenis({ lerp: 0.09 });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t) => lenis?.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      document.addEventListener("click", onAnchor);
      return () => {
        document.removeEventListener("click", onAnchor);
        if (tick) gsap.ticker.remove(tick);
        lenis?.destroy();
        lenis = null;
      };
    };

    mm.add(WIDE, () => {
      const stop = startSmooth();
      const offHero = hero();
      const offToys = pointerToys();
      intro();
      manifesto(true);
      stack();
      slides();
      deck();
      skillRows();
      shared();
      return () => {
        stop();
        offHero();
        offToys();
      };
    });

    mm.add(NARROW, () => {
      const stop = startSmooth();
      intro();
      manifesto(false);
      shared();
      gsap.utils.toArray<HTMLElement>("[data-stack-card]").forEach((el) => {
        gsap.from(el, { y: 70, scale: 0.94, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } });
      });
      gsap.utils.toArray<HTMLElement>("[data-deck-card]").forEach((el, i) => {
        gsap.from(el, { x: i % 2 ? 60 : -60, rotate: i % 2 ? 5 : -5, autoAlpha: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      return stop;
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return null;
}
