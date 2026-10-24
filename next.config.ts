import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      { source: "/websites", destination: "/phone-ringing-website", permanent: true },
      { source: "/crm", destination: "/never-miss-a-lead", permanent: true },
      { source: "/connected", destination: "/leads-to-jobs", permanent: true },
      { source: "/pricing", destination: "/packages", permanent: true },
      { source: "/services", destination: "/packages", permanent: true },
      { source: "/projects", destination: "/results", permanent: true },
      { source: "/how-we-work", destination: "/how-it-works", permanent: true },
      { source: "/contact", destination: "/book-a-call", permanent: true },
      { source: "/demo", destination: "/book-a-call", permanent: true },
      { source: "/team", destination: "/about#team", permanent: true },
      { source: "/starter-website", destination: "/packages#7-day-starter", permanent: true },
    ];
  },
};

export default nextConfig;
