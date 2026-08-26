import { ImageResponse } from "next/og";
import sv from "@/dictionaries/sv";

// Locale-neutral share card. Swedish is the primary language, so the card uses Swedish copy.
export const alt = "DomainLert — bevakning av domäners utgång";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#f7f5ef",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 48 }}>
          <div style={{ display: "flex", width: 60, height: 60, borderRadius: 16, background: "#1c1d19" }} />
          <div style={{ display: "flex", fontSize: 34, fontWeight: 800, color: "#1c1d19" }}>
            Domain<span style={{ color: "#bf4e32" }}>Lert</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#1c1d19", lineHeight: 1.15, maxWidth: 920 }}>
          {sv.og.title}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#77786f", marginTop: 32, maxWidth: 820 }}>
          {sv.og.subtitle}
        </div>
      </div>
    ),
    { ...size },
  );
}
