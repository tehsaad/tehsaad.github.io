import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "TehSaad: builds in computer vision, C++ and the full stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Instrument Serif for the card headline; falls back to the default face if fonts can't be fetched at build. */
async function serif() {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap", {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/533 (KHTML, like Gecko)" },
    }).then((r) => r.text());
    const faces = Object.fromEntries(
      [...css.matchAll(/font-style: (normal|italic);[^}]*?src: url\((.+?)\)/g)].map((m) => [m[1], m[2]]),
    );
    if (!faces.normal || !faces.italic) return null;
    const [normal, italic] = await Promise.all(
      [faces.normal, faces.italic].map((u) => fetch(u).then((r) => r.arrayBuffer())),
    );
    return [
      { name: "Instrument Serif", data: normal, style: "normal" as const, weight: 400 as const },
      { name: "Instrument Serif", data: italic, style: "italic" as const, weight: 400 as const },
    ];
  } catch {
    return null;
  }
}

export default async function OG() {
  const fonts = await serif();
  const mono = { fontFamily: "monospace", fontSize: 20, letterSpacing: 2, textTransform: "uppercase" as const };
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#0c0c0a",
          backgroundImage:
            "linear-gradient(to right, rgba(236,231,220,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(236,231,220,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#ece7dc",
          fontFamily: fonts ? "Instrument Serif" : "serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", color: "#8f8a7e", ...mono }}>
          <span style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span style={{ width: 14, height: 14, background: "#ff5a1f" }} />
            <span style={{ color: "#ece7dc" }}>tehsaad</span>
            <span>/ bench</span>
          </span>
          <span>cs student · ai &amp; software</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 132, lineHeight: 0.9, letterSpacing: -3 }}>
          <span>I learn things</span>
          <span style={{ paddingLeft: 120 }}>by making</span>
          <span style={{ display: "flex" }}>
            <span>them&nbsp;</span>
            <span style={{ color: "#ff5a1f", fontStyle: "italic" }}>run.</span>
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#8f8a7e", ...mono, fontSize: 18 }}>
          <span>computer vision · c++ / qt · full-stack</span>
          <span style={{ color: "#ff5a1f" }}>4 case files</span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts ?? undefined },
  );
}
