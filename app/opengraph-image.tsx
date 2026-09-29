import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Ingenium — Websites and CRM, built around your business.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [logo, font] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/ingenium-logo.png")),
    readFile(join(process.cwd(), "public/brand/Manrope-Bold.ttf")),
  ]);
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#F7F8FA", color: "#14243D", fontFamily: "Manrope" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/png;base64,${logo.toString("base64")}`} width={340} height={83} alt="Ingenium" />
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>Websites and CRM, built around your business.</div>
        <div style={{ fontSize: 26, color: "#55647B" }}>Websites · CRM · Built together</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 22, color: "#087F78" }}>
        <span>ingeniumconsulting.net</span>
        <div style={{ display: "flex", gap: 8 }}><div style={{ width: 100, height: 12, background: "#1767C3", borderRadius: 6 }} /><div style={{ width: 100, height: 12, background: "#087F78", borderRadius: 6 }} /></div>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Manrope", data: font, weight: 700, style: "normal" }] },
  );
}
