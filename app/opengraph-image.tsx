import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at top right, rgba(0, 122, 255, 0.22), transparent 34%), linear-gradient(135deg, #0f172a 0%, #111827 48%, #164e63 100%)",
          padding: "64px",
          color: "#f8fafc",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            borderRadius: "999px",
            border: "1px solid rgba(148, 163, 184, 0.24)",
            background: "rgba(255,255,255,0.08)",
            padding: "14px 22px",
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Ingenium Consulting
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: 920 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.02 }}>
            Connected websites, CRM, automations, and AI that operate as one system.
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: "rgba(226,232,240,0.88)" }}>
            Built for startups and SMEs that need cleaner acquisition, routing, reporting, and governed workflow
            execution.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            fontSize: 24,
            color: "rgba(226,232,240,0.92)",
          }}
        >
          {["Websites", "CRM", "Automation", "AI Workflows"].map((item) => (
            <div
              key={item}
              style={{
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.08)",
                padding: "12px 18px",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
