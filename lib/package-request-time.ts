import "server-only";
import { cache } from "react";
import { connection } from "next/server";

// Read once per on-demand request, then serialise the same value to every
// countdown/price component. The browser hydrates that snapshot before ticking.
export const packageRequestTime = cache(async () => {
  await connection();
  return Date.now();
});
