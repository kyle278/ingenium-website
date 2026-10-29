// Portal keeps its existing page identities. Editor canvases and publication probes
// render the replacement pages at those identities while public URLs redirect.
export const editorRouteAliases: Record<string, string> = {
  "/phone-ringing-website": "/business-growth",
  "/never-miss-a-lead": "/crm-automation",
  "/leads-to-jobs": "/business-growth",
  "/websites": "/business-growth",
  "/crm": "/crm-automation",
  "/connected": "/business-growth",
  "/pricing": "/packages",
  "/services": "/packages",
  "/projects": "/results",
  "/how-we-work": "/how-it-works",
  "/contact": "/book-a-call",
  "/demo": "/book-a-call",
  "/team": "/about",
};

export const editorRedirectMissing = [
  { type: "query" as const, key: "__ingenium_editor", value: "1" },
  { type: "query" as const, key: "__editor_verify" },
];
