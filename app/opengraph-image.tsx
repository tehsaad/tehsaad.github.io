import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Saad Rizwan (TehSaad): AI, systems and full-stack builds";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#ff5a2b", color: "#08080b", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", fontSize: 28, fontWeight: 600 }}>CS Undergraduate · NUST SEECS</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 170, fontWeight: 800, lineHeight: 0.9, letterSpacing: -6 }}>
          <span>SAAD</span>
          <span>RIZWAN</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, fontWeight: 600 }}>AI, systems and full-stack builds</div>
      </div>
    ),
    size,
  );
}
