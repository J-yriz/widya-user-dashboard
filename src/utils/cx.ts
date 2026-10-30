/** Class-name joiner. Keeps conditional styling readable without a dep. */
export function cx(...parts: ReadonlyArray<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
