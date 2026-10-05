import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Starter Website: your business website, written for you and live in 5 working days. €495 + €50/month.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function StarterOpenGraphImage() {
  const [logo, font] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/ingenium-logo.png")),
    readFile(join(process.cwd(), "public/brand/Manrope-Bold.ttf")),
  ]);
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#F7F8FA", color: "#14243D", fontFamily: "Manrope" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/png;base64,${logo.toString("base64")}`} width={300} height={74} alt="Ingenium" />
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ fontSize: 24, color: "#087F78", letterSpacing: 2 }}>STARTER WEBSITE · CARLOW &amp; KILKENNY</div>
        <div style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.1, maxWidth: 1060 }}>Your business website, written for you and live in 5 working days.</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ fontSize: 58, fontWeight: 700 }}>€495 + €50/month</div>
        <div style={{ display: "flex", padding: "10px 22px", borderRadius: 999, background: "#E8F0FB", fontSize: 26 }}>Domain and hosting included</div>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Manrope", data: font, weight: 700, style: "normal" }] },
  );
}
