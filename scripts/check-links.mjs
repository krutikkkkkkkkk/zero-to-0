#!/usr/bin/env node
/**
 * Opens every lesson link in the course (and every YouTube channel on the home page)
 * and reports the ones that are broken. Runs weekly in GitHub Actions
 * (.github/workflows/check-links.yml) and locally with `npm run check-links`.
 *
 * Requires Node.js 22.18+ (it imports the TypeScript data files directly).
 *
 * Usage: node scripts/check-links.mjs [--report report.md]
 * Exit code: 0 when nothing is broken, 1 when at least one link is broken.
 */
import { writeFileSync } from "node:fs";
import { courseModules } from "../lib/course.ts";
import { channels, channelUrl } from "../lib/content.ts";

const TIMEOUT_MS = 25_000;
const CONCURRENCY = 6;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36 zero-to-0-link-check";

/** Many sites refuse automated requests; these mean "check by hand", not "broken". */
const BLOCKED = new Set([401, 403, 405, 429, 999]);

const links = [
  ...courseModules.flatMap((m) =>
    m.lessons.map((l) => ({ id: l.id, title: l.title, where: `Module ${m.number}: ${m.title}`, url: l.url })),
  ),
  ...channels.map((c) => ({ id: `home:${c.handle}`, title: c.name, where: "Home page: free channels", url: channelUrl(c) })),
];

async function check(url) {
  let last;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8" },
      });
      res.body?.cancel().catch(() => {});
      last = { status: res.status, finalUrl: res.url };
      if (res.ok || BLOCKED.has(res.status)) return last;
    } catch (err) {
      last = { status: 0, error: err?.name === "TimeoutError" ? "timed out" : String(err?.cause?.code ?? err?.message ?? err) };
    }
    await new Promise((r) => setTimeout(r, 3000));
  }
  return last;
}

/** A redirect to a different page (not just http→https or a trailing slash) usually means the lesson moved. */
function movedTo(url, finalUrl) {
  if (!finalUrl) return null;
  const norm = (u) => {
    try {
      const x = new URL(u);
      return `${x.hostname.replace(/^www\./, "")}${x.pathname.replace(/\/+$/, "")}`.toLowerCase();
    } catch {
      return u;
    }
  };
  return norm(url) === norm(finalUrl) ? null : finalUrl;
}

const results = [];
let next = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (next < links.length) {
      const link = links[next++];
      const r = await check(link.url);
      results.push({ ...link, ...r, moved: r.status >= 200 && r.status < 400 ? movedTo(link.url, r.finalUrl) : null });
      process.stdout.write(r.status >= 200 && r.status < 400 ? "." : BLOCKED.has(r.status) ? "?" : "x");
    }
  }),
);
process.stdout.write("\n");

const order = new Map(links.map((l, i) => [l.id, i]));
results.sort((a, b) => order.get(a.id) - order.get(b.id));
const broken = results.filter((r) => !(r.status >= 200 && r.status < 400) && !BLOCKED.has(r.status));
const blocked = results.filter((r) => BLOCKED.has(r.status));
const moved = results.filter((r) => r.moved);

const row = (r, extra) => `| ${r.title} | ${r.where} | \`${r.id}\` | ${extra} | ${r.url} |`;
const lines = [
  `Checked ${results.length} links on ${new Date().toISOString().slice(0, 10)}.`,
  "",
  `- **Broken:** ${broken.length}`,
  `- **Blocked automated checks** (open by hand): ${blocked.length}`,
  `- **Redirected to a different page** (may have moved): ${moved.length}`,
];
const table = (title, rows, fn) => {
  if (rows.length === 0) return;
  lines.push("", `### ${title}`, "", "| Lesson | Where | ID | Result | URL |", "| --- | --- | --- | --- | --- |", ...rows.map(fn));
};
table("Broken", broken, (r) => row(r, r.error ?? `HTTP ${r.status}`));
table("Blocked automated checks", blocked, (r) => row(r, `HTTP ${r.status}`));
table("Redirected", moved, (r) => row(r, `now ${r.moved}`));
lines.push(
  "",
  "To fix a lesson, update its `url` (and `lastChecked`) in `lib/course.ts`. Never change its `id`: saved progress uses it.",
);
const report = lines.join("\n");

const reportArg = process.argv.indexOf("--report");
if (reportArg !== -1 && process.argv[reportArg + 1]) writeFileSync(process.argv[reportArg + 1], report + "\n");
console.log(report);
process.exit(broken.length > 0 ? 1 : 0);
