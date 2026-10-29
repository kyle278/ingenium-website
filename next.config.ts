import type { NextConfig } from "next";
import { editorRedirectMissing } from "./lib/website-editor/route-aliases";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      { source: "/websites", destination: "/business-growth", permanent: true },
      { source: "/crm", destination: "/crm-automation", permanent: true },
      { source: "/connected", destination: "/business-growth", permanent: true },
      { source: "/pricing", destination: "/packages", permanent: true },
      { source: "/services", destination: "/packages", permanent: true },
      { source: "/projects", destination: "/results", permanent: true },
      { source: "/how-we-work", destination: "/how-it-works", permanent: true },
      { source: "/contact", destination: "/book-a-call", permanent: true },
      { source: "/demo", destination: "/book-a-call", permanent: true },
      { source: "/team", destination: "/about#team", permanent: true },
      { source: "/phone-ringing-website", destination: "/business-growth", permanent: true },
      { source: "/never-miss-a-lead", destination: "/crm-automation", permanent: true },
      { source: "/leads-to-jobs", destination: "/business-growth", permanent: true },
    ].map(rule => ({ ...rule, missing: editorRedirectMissing }));
  },
};

export default nextConfig;
