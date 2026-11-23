import { courseModules, totalLessons, totalProjects } from "./course";

export const SITE_URL = "https://zeroto.infinitylinkage.com";
export const COURSE_URL = `${SITE_URL}/zerotoinfinity`;

/** Share intents. LinkedIn only takes a URL; it builds the post preview from that page's og:image. */
export function shareUrls(url: string, text: string) {
  const u = encodeURIComponent(url);
  return {
    x: `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${u}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
  };
}

export const courseShareText = `A free AI course built from the best free lessons: ${totalLessons} lessons from Anthropic, OpenAI, Google, n8n and more, in order, with a project in every module. No account, no fee.`;

/* ---------- Progress share pages: /progress/<lessons>-<projects>-<module> ---------- */

export type ProgressStats = { lessons: number; projects: number; module: number };

export const progressSlug = (s: ProgressStats) => `${s.lessons}-${s.projects}-${s.module}`;

/** Parses "12-2-1". Returns null for anything out of range or not in canonical form. */
export function parseProgressSlug(slug: string): ProgressStats | null {
  const m = /^(\d{1,2})-(\d{1,2})-(\d{1,2})$/.exec(slug);
  if (!m) return null;
  const [lessons, projects, module] = m.slice(1).map(Number);
  if (lessons > totalLessons || projects > totalProjects || module > courseModules.length) return null;
  if (progressSlug({ lessons, projects, module }) !== slug) return null; // no leading zeros
  return { lessons, projects, module };
}

export const progressCardPath = (s: ProgressStats) =>
  `/progress-card?l=${s.lessons}&p=${s.projects}${s.module ? `&m=${s.module}` : ""}`;

/** One sentence about the progress, used in share text and page titles. */
export function progressSentence(s: ProgressStats) {
  if (s.lessons === totalLessons) return `I finished all ${totalLessons} lessons of the free AI course on Zero to ₹0.`;
  const mod = courseModules.find((m) => m.number === s.module);
  if (mod) return `I finished module ${mod.number} of the free AI course on Zero to ₹0: ${mod.title}.`;
  return `I've done ${s.lessons} of ${totalLessons} lessons in the free AI course on Zero to ₹0.`;
}
