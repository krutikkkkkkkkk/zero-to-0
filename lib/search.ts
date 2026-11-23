import { courseModules, type Lesson } from "./course";

/**
 * Words people search for that a lesson's own text doesn't contain
 * (e.g. "excel" for the data-analysis lesson). Keyed by permanent lesson ID.
 */
const extraTerms: Record<string, string> = {
  "openai-chatgpt-fundamentals": "chatbot beginner basics",
  "anthropic-claude-101": "chatbot beginner basics prompt",
  "google-learn-gemini-notebook": "notebooklm research documents pdf sources",
  "google-create-gemini-notebook": "notebooklm research documents pdf sources",
  "wispr-first-dictation": "voice speech typing dictate",
  "n8n-quickstart": "automation automate workflow zapier",
  "3b1b-llms-explained-briefly": "llm neural network transformer gpt",
  "google-intro-generative-ai": "genai llm basics",
  "anthropic-capabilities-limitations": "hallucination limits mistakes accuracy",
  "openai-why-hallucinate": "hallucination accuracy wrong mistakes",
  "karpathy-intro-llms": "llm neural network transformer gpt",
  "openai-prompting": "prompt engineering prompts writing",
  "openai-chatgpt-any-role": "email writing office",
  "google-workspace-prompt-guide": "gmail docs sheets excel slides email office prompts",
  "openai-data-analysis": "excel spreadsheet sheets csv charts numbers data",
  "anthropic-research-to-presentations": "slides powerpoint deck presentation research",
  "n8n-essentials": "automation automate workflow zapier",
  "n8n-build-first-workflow-doc": "automation automate workflow zapier",
  "n8n-integrations": "automation api webhook integration",
  "n8n-in-practice": "automation agent agents testing",
  "n8n-workflow-templates": "automation templates examples",
  "creator-nate-herk": "automation agent agents youtube",
  "anthropic-custom-webpage": "website html landing page vibe coding",
  "fcc-responsive-web-design": "html css website coding",
  "mdn-getting-started": "html css javascript website coding",
  "github-pages-site": "hosting publish website deploy free",
  "google-ai-studio": "build app vibe coding gemini api",
  "anthropic-building-effective-agents": "agent agents workflow",
  "openai-practical-guide-agents": "agent agents pdf",
  "hf-agents-course": "agent agents python code",
  "creator-chai-aur-code": "hindi coding javascript web",
  "deeplearning-the-batch": "news newsletter weekly",
  "anthropic-newsroom": "news claude updates",
  "openai-news": "news chatgpt updates",
  "google-ai-blog": "news gemini updates",
  "creator-ai-explained": "news youtube",
  "stackoverflow-how-to-ask": "help question stuck",
  "openai-chatgpt-finance": "excel spreadsheet accounting budget",
  "openai-chatgpt-marketing": "content social media copywriting sales",
  "openai-chatgpt-hr": "people hiring recruiting",
  "anthropic-ai-fluency-small-business": "founder business owner",
  "google-ai-small-businesses": "founder business owner",
  "figma-get-started-ai": "design ui",
  "figma-mcp-server": "design ui code agent",
  "framer-academy": "website design no-code",
  "framer-mcp": "website design agent",
  "mobbin-library": "design inspiration ui screens",
  "shadcn-registry": "react components ui",
  "shadcn-mcp-server": "react components ui agent",
  "shadcn-registry-directory": "react components ui blocks",
  "nextjs-learn": "react website coding vercel app",
  "vercel-deploy-foundations": "hosting publish website deploy free vercel",
  "figma-make": "prototype app builder vibe coding design no-code",
  "v0-build-with-v0": "app builder vibe coding website vercel no-code",
  "lovable-welcome": "app builder vibe coding database login no-code",
  "bolt-help-center": "app builder vibe coding stackblitz full-stack",
};

const moduleTitleOf = new Map(courseModules.flatMap((m) => m.lessons.map((l) => [l.id, m.title] as const)));

const haystacks = new Map(
  courseModules.flatMap((m) =>
    m.lessons.map((l) => [
      l.id,
      [l.title, l.publisher, l.type, l.description, moduleTitleOf.get(l.id), extraTerms[l.id]]
        .filter(Boolean)
        .join(" ")
        .toLowerCase(),
    ]),
  ),
);

/** Split a query into words, dropping a plural "s" so "agents" also finds "agent". */
export function searchTerms(query: string): string[] {
  return query
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.replace(/[^\p{L}\p{N}.+#-]/gu, ""))
    .filter(Boolean)
    .map((w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w));
}

/** True when every search word appears somewhere in the lesson (title, publisher, description, module or extra terms). */
export function lessonMatches(lesson: Lesson, terms: string[]): boolean {
  if (terms.length === 0) return true;
  const text = haystacks.get(lesson.id) ?? "";
  return terms.every((t) => text.includes(t));
}
