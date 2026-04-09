import { aeoQueryThemes, pageSeo, PUBLIC_DISCOVERY_PATHS, SITE_URL } from "@/lib/seo";

function toAbsoluteUrl(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function GET() {
  const lines = [
    "# Ingenium",
    "",
    `Site: ${SITE_URL}`,
    "Summary: Ingenium is a revenue platform implementation partner connecting website acquisition, CRM execution, AI agents, automation, and governance.",
    "Audience: Ambitious US and EU teams looking for accountable RevOps, CRM, AI, automation, and conversion-system implementation.",
    "",
    "## Key Pages",
    ...PUBLIC_DISCOVERY_PATHS.flatMap((path) => {
      const config = pageSeo[path];
      return [
        `- ${config.title}: ${toAbsoluteUrl(path)}`,
        `  ${config.description}`,
      ];
    }),
    "",
    "## Common Questions",
    ...aeoQueryThemes.map((question) => `- ${question}`),
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
