import { allLessons, courseModules, type Lesson } from "./course";

/**
 * The "where to start" quiz. Three answers pick a shorter, personal path through the
 * course. Paths only reference permanent lesson IDs, and always run in course order.
 */

export const roles = [
  { id: "office", label: "Office or admin work", route: "The office route" },
  { id: "marketing", label: "Marketing, sales or content", route: "The marketer's route" },
  { id: "finance", label: "Finance or operations", route: "The finance route" },
  { id: "hr", label: "HR or people", route: "The people-team route" },
  { id: "founder", label: "I run a small business", route: "The founder's route" },
  { id: "builder", label: "Developer, designer or student", route: "The builder's route" },
] as const;

export const goals = [
  { id: "daily", label: "Use AI every day at work", keyModule: "ai-at-work" },
  { id: "automate", label: "Automate repetitive tasks", keyModule: "automation-n8n" },
  { id: "build", label: "Build websites, apps or agents", keyModule: "websites-and-agents" },
  { id: "understand", label: "Understand AI and keep up", keyModule: "how-ai-works" },
] as const;

export const paces = [
  { id: "light", label: "1–2 hours a week", perWeek: 2 },
  { id: "steady", label: "3–5 hours a week", perWeek: 4 },
  { id: "fast", label: "6 or more hours a week", perWeek: 7 },
] as const;

export type RoleId = (typeof roles)[number]["id"];
export type GoalId = (typeof goals)[number]["id"];
export type PaceId = (typeof paces)[number]["id"];
export type PathAnswers = { role: RoleId; goal: GoalId; pace: PaceId };

/** Core lessons come first; extras are added when there's more than 1–2 hours a week. */
const goalLessons: Record<GoalId, { core: string[]; extra: string[] }> = {
  daily: {
    core: [
      "openai-chatgpt-fundamentals",
      "anthropic-claude-101",
      "google-use-gemini-apps",
      "google-learn-gemini-notebook",
      "openai-why-hallucinate",
      "anthropic-ai-fluency",
      "openai-prompting",
      "openai-chatgpt-any-role",
    ],
    extra: [
      "openai-chatgpt-capabilities",
      "google-create-gemini-notebook",
      "wispr-first-dictation",
      "anthropic-capabilities-limitations",
      "google-workspace-prompt-guide",
      "openai-data-analysis",
      "anthropic-research-to-presentations",
      "deeplearning-the-batch",
    ],
  },
  automate: {
    core: [
      "openai-chatgpt-fundamentals",
      "anthropic-claude-101",
      "n8n-quickstart",
      "openai-prompting",
      "n8n-essentials",
      "n8n-build-first-workflow-doc",
      "n8n-workflow-templates",
    ],
    extra: [
      "openai-why-hallucinate",
      "n8n-integrations",
      "n8n-in-practice",
      "creator-nate-herk",
      "anthropic-building-effective-agents",
      "n8n-community",
    ],
  },
  build: {
    core: [
      "anthropic-claude-101",
      "3b1b-llms-explained-briefly",
      "anthropic-custom-webpage",
      "github-pages-site",
      "google-ai-studio",
      "anthropic-building-effective-agents",
    ],
    extra: [
      "n8n-quickstart",
      "karpathy-intro-llms",
      "mdn-getting-started",
      "openai-practical-guide-agents",
      "hf-agents-course",
      "stackoverflow-how-to-ask",
      "figma-get-started-ai",
      "shadcn-registry",
      "shadcn-mcp-server",
    ],
  },
  understand: {
    core: [
      "openai-chatgpt-fundamentals",
      "3b1b-llms-explained-briefly",
      "google-intro-generative-ai",
      "anthropic-capabilities-limitations",
      "openai-why-hallucinate",
      "deeplearning-the-batch",
    ],
    extra: [
      "anthropic-claude-101",
      "karpathy-intro-llms",
      "anthropic-ai-fluency",
      "anthropic-newsroom",
      "openai-news",
      "google-ai-blog",
      "creator-ai-explained",
    ],
  },
};

/** Lessons specific to the learner's work, always included. */
const roleLessons: Record<RoleId, string[]> = {
  office: ["openai-chatgpt-any-role", "google-workspace-prompt-guide"],
  marketing: ["openai-chatgpt-marketing"],
  finance: ["openai-chatgpt-finance", "openai-data-analysis"],
  hr: ["openai-chatgpt-hr"],
  founder: ["anthropic-ai-fluency-small-business", "google-ai-small-businesses"],
  builder: ["mdn-getting-started"],
};

export type LearningPath = {
  name: string;
  goalLabel: string;
  lessonIds: ReadonlySet<string>;
  lessons: Lesson[];
  /** Modules whose end-of-module project is part of this path */
  projectModuleIds: ReadonlySet<string>;
  perWeek: number;
  weeks: number;
};

export function buildPath({ role, goal, pace }: PathAnswers): LearningPath {
  const g = goalLessons[goal];
  const paceInfo = paces.find((p) => p.id === pace)!;
  const goalInfo = goals.find((x) => x.id === goal)!;
  const ids = new Set([...g.core, ...roleLessons[role], ...(pace === "light" ? [] : g.extra)]);
  const lessons = allLessons.filter((l) => ids.has(l.id)); // course order

  const touched = courseModules.filter((m) => m.lessons.some((l) => ids.has(l.id))).map((m) => m.id);
  const projectModuleIds = new Set<string>(pace === "light" ? [goalInfo.keyModule] : touched);

  return {
    name: roles.find((r) => r.id === role)!.route,
    goalLabel: goalInfo.label,
    lessonIds: ids,
    lessons,
    projectModuleIds,
    perWeek: paceInfo.perWeek,
    weeks: Math.max(1, Math.ceil((lessons.length + projectModuleIds.size) / paceInfo.perWeek)),
  };
}

/** Compact form for storage and progress links, e.g. "marketing.daily.steady". */
export const serializeAnswers = (a: PathAnswers) => `${a.role}.${a.goal}.${a.pace}`;

export function parseAnswers(value: string | null | undefined): PathAnswers | null {
  if (!value) return null;
  const [role, goal, pace] = value.split(".");
  if (
    roles.some((r) => r.id === role) &&
    goals.some((g) => g.id === goal) &&
    paces.some((p) => p.id === pace)
  ) {
    return { role, goal, pace } as PathAnswers;
  }
  return null;
}
