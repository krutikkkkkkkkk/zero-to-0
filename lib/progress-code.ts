/**
 * Progress links carry finished items without an account. Each lesson or project ID
 * becomes a fixed 4-character code (a hash of its permanent ID), so links keep working
 * when lessons are added, removed or reordered: unknown codes are simply ignored.
 */

const CODE_SPACE = 36 ** 4;

export function shortCode(id: string): string {
  let h = 0x811c9dc5; // FNV-1a
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return (h % CODE_SPACE).toString(36).padStart(4, "0");
}

export function encodeProgress(ids: Iterable<string>): string {
  return [...ids].map(shortCode).sort().join("");
}

export function decodeProgress(code: string, validIds: Iterable<string>): string[] {
  const byCode = new Map([...validIds].map((id) => [shortCode(id), id]));
  const found = new Set<string>();
  const clean = code.toLowerCase().replace(/[^0-9a-z]/g, "");
  for (let i = 0; i + 4 <= clean.length; i += 4) {
    const id = byCode.get(clean.slice(i, i + 4));
    if (id) found.add(id);
  }
  return [...found];
}
