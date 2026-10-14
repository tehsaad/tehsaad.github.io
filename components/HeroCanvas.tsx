"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks";

type P = { x: number; y: number; t: number };

const LIFE = 1700; // ms a stroke stays visible
const SIGNAL = "255, 90, 31";

/**
 * fig. 0: the cursor (or a finger on touch) leaves an ink trail that decays,
 * a reticle tracks it with a normalised coordinate readout. The same feeling as
 * Air Draw, with a pointer standing in for a hand. Until someone moves, the
 * canvas draws a slow demo stroke by itself.
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let userActive = false;
    let pointer: { x: number; y: number } | null = null;
    const pts: P[] = [];
    const start = performance.now();

    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const push = (x: number, y: number) => {
      const now = performance.now();
      const last = pts[pts.length - 1];
      if (last && Math.hypot(last.x - x, last.y - y) < 2) return;
      pts.push({ x, y, t: now });
      if (pts.length > 240) pts.shift();
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (y < 0 || y > r.height) return;
      userActive = true;
      pointer = { x, y };
      push(x, y);
      wake();
    };
    const onLeave = () => {
      pointer = null;
    };

    // A slow figure-eight while nobody is drawing.
    const demo = (now: number) => {
      const t = (now - start) / 1000;
      if (t < 0.9) return;
      const k = (t - 0.9) * 0.9;
      const cx = w * 0.72;
      const cy = h * 0.52;
      const ax = Math.min(w * 0.16, 240);
      const ay = Math.min(h * 0.16, 150);
      const x = cx + Math.sin(k) * ax;
      const y = cy + Math.sin(k * 2) * ay * 0.6;
      pointer = { x, y };
      push(x, y);
    };

    const draw = (now: number) => {
      raf = 0;
      if (!visible) return;
      if (!userActive) demo(now);

      while (pts.length && now - pts[0].t > LIFE) pts.shift();
      ctx.clearRect(0, 0, w, h);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const life = 1 - (now - b.t) / LIFE;
        if (life <= 0) continue;
        ctx.strokeStyle = `rgba(${SIGNAL}, ${life * 0.95})`;
        ctx.lineWidth = 1 + life * 3.2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Landmark-ish samples along the stroke: the "tracking" layer.
      ctx.fillStyle = "rgba(236, 231, 220, 0.5)";
      for (let i = 0; i < pts.length; i += 9) {
        const life = 1 - (now - pts[i].t) / LIFE;
        if (life <= 0.15) continue;
        ctx.globalAlpha = life;
        ctx.fillRect(pts[i].x - 1.5, pts[i].y - 1.5, 3, 3);
      }
      ctx.globalAlpha = 1;

      if (pointer) {
        const { x, y } = pointer;
        ctx.strokeStyle = "rgba(236, 231, 220, 0.75)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.moveTo(x - 26, y);
        ctx.lineTo(x - 20, y);
        ctx.moveTo(x + 20, y);
        ctx.lineTo(x + 26, y);
        ctx.moveTo(x, y - 26);
        ctx.lineTo(x, y - 20);
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x, y + 26);
        ctx.stroke();
        if (readoutRef.current) {
          readoutRef.current.style.transform = `translate3d(${Math.round(x + 30)}px, ${Math.round(y + 18)}px, 0)`;
          readoutRef.current.textContent = `x ${(x / w).toFixed(2)}  y ${(y / h).toFixed(2)}  ${userActive ? "tracking" : "demo"}`;
          readoutRef.current.style.opacity = "1";
        }
      } else if (readoutRef.current) {
        readoutRef.current.style.opacity = "0";
      }

      if (pts.length || !userActive || pointer) raf = requestAnimationFrame(draw);
    };

    const wake = () => {
      if (!raf && visible) raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) wake();
    });
    io.observe(host);
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerdown", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    wake();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0" />
      <div
        ref={readoutRef}
        aria-hidden
        className="label pointer-events-none absolute top-0 left-0 whitespace-pre text-bone-2 opacity-0 transition-opacity duration-300"
      />
    </>
  );
}
