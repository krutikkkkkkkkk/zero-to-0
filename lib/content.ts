export type Category = "Everyday AI" | "Official channels" | "Automation" | "Build & code" | "Hindi";

import type { LogoKey } from "@/components/brand-logo";

export type Channel = {
  name: string;
  handle: string;
  category: Category;
  level: string;
  initials: string;
  color: string;
  description: string;
  topics: string;
  /** Query used for the per-module "Learn from" links */
  search: string;
  /** Company logo shown instead of initials (individual creators keep initials) */
  logo?: LogoKey;
};

/** Home-page copy for each course module (the modules themselves live in lib/course.ts). */
export type ModuleHomeCopy = {
  /** One line in the site's parody voice */
  tagline: string;
  /** Tools and topics covered, shown as a slash list */
  tags: string;
  /** Small label on the right of each row */
  label: "START HERE" | "GET PRACTICAL" | "BUILD SOMETHING" | "KEEP GOING" | "YOUR JOB";
  /** Honest note about costs or safety */
  note: string;
  /** YouTube channels (see `channels`) worth watching for this module */
  handles: string[];
};

export const categories = ["All resources", "Everyday AI", "Official channels", "Automation", "Build & code", "Hindi"] as const;
export type CategoryFilter = (typeof categories)[number];

export const channels: Channel[] = [
  { name: "Kevin Stratvert", handle: "KevinStratvert", category: "Everyday AI", level: "Beginner", initials: "KS", color: "#d9e8e0", description: "Friendly, step-by-step tutorials for AI tools, Excel, and getting actual work done.", topics: "ChatGPT · Gemini · NotebookLM", search: "ChatGPT beginner tutorial" },
  { name: "Jeff Su", handle: "JeffSu", category: "Everyday AI", level: "Beginner", initials: "JS", color: "#eee2d6", description: "Practical prompting and work routines. Less AI theatre, more useful output.", topics: "Prompting · Claude · Productivity", search: "AI prompting" },
  { name: "OpenAI", handle: "OpenAI", logo: "openai", category: "Official channels", level: "All levels", initials: "O", color: "#d9e8e0", description: "Product demonstrations and developer sessions, straight from the source.", topics: "ChatGPT · Tools · Developer sessions", search: "ChatGPT" },
  { name: "Anthropic", handle: "anthropic-ai", logo: "anthropic", category: "Official channels", level: "All levels", initials: "A", color: "#edd5c6", description: "Official Claude explanations, demonstrations, and deeper research discussions.", topics: "Claude · Artifacts · Claude Code", search: "Claude" },
  { name: "Google Workspace", handle: "googleworkspace", logo: "google", category: "Official channels", level: "Beginner", initials: "G", color: "#e1e7f2", description: "Gemini in everyday work apps. Check plan requirements before following along.", topics: "Gemini · Docs · Sheets · Gmail", search: "Gemini" },
  { name: "Google for Developers", handle: "GoogleDevelopers", logo: "google", category: "Build & code", level: "Technical", initials: "G", color: "#e1e7f2", description: "Build with Gemini, Google AI Studio, and APIs. Some coding required.", topics: "Gemini API · AI Studio · Web", search: "Gemini API" },
  { name: "n8n", handle: "n8n-io", logo: "n8n", category: "Automation", level: "Beginner → Advanced", initials: "n8n", color: "#f0dadd", description: "Triggers, actions, and workflows from the people who make the platform.", topics: "Workflows · Error handling · Agents", search: "beginner" },
  { name: "Nate Herk", handle: "nateherk", category: "Automation", level: "Intermediate", initials: "NH", color: "#e7e3d3", description: "Hands-on AI automation builds. Public tutorials; optional paid offers are separate.", topics: "n8n · AI agents · Automation", search: "n8n beginner" },
  { name: "freeCodeCamp.org", handle: "freecodecamp", logo: "freecodecamp", category: "Build & code", level: "Beginner → Advanced", initials: "fC", color: "#dfe1ed", description: "Long-form, free technical courses. Pick a course that matches your prerequisites.", topics: "Web development · Python · AI/ML", search: "Generative AI" },
  { name: "Microsoft Developer", handle: "MicrosoftDeveloper", category: "Build & code", level: "Technical", initials: "M", color: "#e1e7f2", description: "Technical explanations and AI application building with developer tooling.", topics: "AI apps · Python · Agents", search: "AI agents" },
  { name: "Chai aur Code", handle: "chaiaurcode", category: "Hindi", level: "Beginner → Advanced", initials: "C", color: "#ecdcc8", description: "Hindi coding explanations. Understand what is behind the website you are building.", topics: "Hindi · JavaScript · Web development", search: "JavaScript" },
  { name: "codebasics Hindi", handle: "codebasicsHindi", category: "Hindi", level: "Beginner", initials: "cb", color: "#dce8e0", description: "Step-by-step Hindi programming foundations and technical learning.", topics: "Hindi · Python · Data analysis", search: "Python" },
];

export const moduleHomeCopy: Record<string, ModuleHomeCopy> = {
  "six-tools": {
    tagline: "Same tools. Better questions. Fewer seventeen-tab identity crises.",
    tags: "ChatGPT / Claude / Gemini / Gemini Notebook / Wispr Flow / n8n",
    label: "START HERE",
    note: "Use free tiers where available. Some features require paid plans, and each lesson says so.",
    handles: ["KevinStratvert", "JeffSu", "OpenAI", "anthropic-ai", "googleworkspace"],
  },
  "how-ai-works": {
    tagline: "Confidence is not correctness. This applies to models and course sales pages.",
    tags: "Language models / Hallucinations / Checking facts",
    label: "GET PRACTICAL",
    note: "Start with concepts before engineering-heavy courses; check prerequisites.",
    handles: ["freecodecamp", "OpenAI", "anthropic-ai", "MicrosoftDeveloper"],
  },
  "ai-at-work": {
    tagline: "Emails, summaries, research, and spreadsheets. Bring a task, not confidential client data.",
    tags: "Prompting / Writing / Research / Data",
    label: "GET PRACTICAL",
    note: "Use sample data. Don't paste private work records or passwords into tools your employer hasn't approved.",
    handles: ["JeffSu", "KevinStratvert", "googleworkspace"],
  },
  "automation-n8n": {
    tagline: "Automate the boring stuff. Not the consequences of a mistake.",
    tags: "Triggers / Actions / APIs / Templates",
    label: "BUILD SOMETHING",
    note: "Hosting, APIs and connected apps can cost money. Check costs before you switch a workflow on.",
    handles: ["n8n-io", "nateherk"],
  },
  "websites-and-agents": {
    tagline: "An agent is not an employee just because you gave it a profile picture.",
    tags: "HTML & CSS / GitHub Pages / Vercel / Agents",
    label: "BUILD SOMETHING",
    note: "Publishing on GitHub Pages or Vercel's Hobby plan is free. Some agent tools need API credits.",
    handles: ["freecodecamp", "GoogleDevelopers", "MicrosoftDeveloper", "chaiaurcode"],
  },
  "staying-current": {
    tagline: "Twenty minutes a week. Not a doom-scroll with a learning label.",
    tags: "Newsletters / Official news / A weekly routine",
    label: "KEEP GOING",
    note: "Every source here is free to read. Ignore anything that says you're \"falling behind\".",
    handles: ["OpenAI", "anthropic-ai"],
  },
  "getting-unstuck": {
    tagline: "Asking a good question is a skill. So is searching before you ask it.",
    tags: "Forums / Discord / Asking well",
    label: "KEEP GOING",
    note: "Never post passwords, API keys or private data when asking for help.",
    handles: ["freecodecamp"],
  },
  "your-industry": {
    tagline: "Finance, marketing, HR or your own shop. Same tools, your actual job.",
    tags: "Finance / Marketing / HR / Small business",
    label: "YOUR JOB",
    note: "Check your company's AI policy before using these tools with real work.",
    handles: ["JeffSu", "googleworkspace"],
  },
  "design-with-ai": {
    tagline: "From a sketch to a working page, without a paid bootcamp.",
    tags: "Figma Make / v0 / Lovable / Bolt / shadcn/ui",
    label: "BUILD SOMETHING",
    note: "Each app builder has a free plan with limited credits. Plan your prompts before you spend them.",
    handles: ["chaiaurcode"],
  },
};

export const faqs: [question: string, answer: string][] = [
  ["Is it really free?", "This learning guide and the linked public videos have no course fee. Creators may also offer paid memberships, templates, or courses; those are optional. Software, hosting, APIs, and your internet connection can cost money."],
  ["I've never coded. Is this for me?", "Yes for the everyday AI and work-task sections. Websites and advanced agents may require technical skills. Tutorials are not magic spells; prerequisites still exist."],
  ["When does it start?", "When you open a tutorial. Please resist scheduling a learning launch instead of learning."],
  ["Are these your videos?", "No. Every resource belongs to its original creator. We link to their channels and add a learning route and practice prompts. Free to watch does not mean free to copy or reupload."],
  ["I've already done an AI course. Do I need another?", "Maybe not. Pick a task you still cannot do, find the relevant tutorial, and practice. Paid teaching can be useful for feedback, accountability, or live support—compare those benefits honestly."],
  ["Where are the live classes and WhatsApp group?", "Neither is promised here. Follow public videos and streams directly from creators. Your phone can experience personal growth through fewer notifications."],
  ["How long do I get access?", "This guide has no enrollment expiry. External videos can change, disappear, or be region-restricted. Browser-saved practice progress stays on this device unless you clear browser storage."],
  ["Will I get a certificate?", "Not from this guide. Build a project you can explain and demonstrate. External certificates have their own conditions."],
  ["Can I get a refund?", "We charged ₹0. Your money never left. Your time is best protected by choosing one useful tutorial and actually trying it."],
  ["Is this affiliated with Zero to Infinity with AI?", "No. This is an independent parody of paid-course marketing, not an allegation of misconduct or an endorsement by the original program, its instructors, or any linked creator."],
];

export const channelUrl = (c: Channel) => `https://www.youtube.com/@${c.handle}`;
export const channelSearchUrl = (c: Channel) =>
  `https://www.youtube.com/@${c.handle}/search?query=${encodeURIComponent(c.search)}`;
