"use client";
import Link from "next/link";
export default function ProjectError({ reset }: { reset: () => void }) {
  return <section className="rebuild-hero"><p className="rebuild-kicker">Our work</p><h1>We could not load this project.</h1><p className="rebuild-lead">Please try again, or contact us for information about the work you would like to discuss.</p><button type="button" className="rebuild-button" onClick={reset}>Try again</button>{" "}<Link className="rebuild-text-link" href="/contact">Contact Ingenium</Link></section>;
}
