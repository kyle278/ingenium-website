export function parseDelimited<T>(
  lines: string[],
  fallback: T[],
  map: (parts: string[]) => T | null,
  minParts = 1
): T[] {
  const parsed = lines
    .map((line) => line.split("|").map((part) => part.trim()))
    .map((parts) => {
      while (parts.length < minParts) parts.push("");
      return map(parts);
    })
    .filter((item): item is T => Boolean(item));

  return parsed.length ? parsed : fallback;
}
