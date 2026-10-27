"use client";
import { useState } from "react";
export default function BookingCalendar({ url }: { url: string }) {
  const [loaded, setLoaded] = useState(false);
  return <section className="local-calendar"><h2>Choose a time for your free call.</h2><p>The calendar is provided by an external booking service. Load it to view availability and confirm your appointment there.</p>{loaded ? <iframe src={url} title="Book a free 15-minute call" className="local-calendar-frame" /> : <button type="button" className="rebuild-button" onClick={() => setLoaded(true)}>Load booking calendar</button>}<a className="rebuild-text-link" href={url} target="_blank" rel="noopener noreferrer">Open the calendar in a new tab ↗</a></section>;
}
