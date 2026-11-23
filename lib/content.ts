export type Category = "Everyday AI" | "Official channels" | "Automation" | "Build & code" | "Hindi";

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
};

export type LearningModule = {
  title: string;
  description: string;
  tags: string;
  exercise: string;
  note: string;
  handles: string[];
};

export const categories = ["All resources", "Everyday AI", "Official channels", "Automation", "Build & code", "Hindi"] as const;
export type CategoryFilter = (typeof categories)[number];

export const channels: Channel[] = [
  { name: "Kevin Stratvert", handle: "KevinStratvert", category: "Everyday AI", level: "Beginner", initials: "KS", color: "#d9e8e0", description: "Friendly, step-by-step tutorials for AI tools, Excel, and getting actual work done.", topics: "ChatGPT · Gemini · NotebookLM", search: "ChatGPT beginner tutorial" },
  { name: "Jeff Su", handle: "JeffSu", category: "Everyday AI", level: "Beginner", initials: "JS", color: "#eee2d6", description: "Practical prompting and work routines. Less AI theatre, more useful output.", topics: "Prompting · Claude · Productivity", search: "AI prompting" },
  { name: "OpenAI", handle: "OpenAI", category: "Official channels", level: "All levels", initials: "O", color: "#d9e8e0", description: "Product demonstrations and developer sessions, straight from the source.", topics: "ChatGPT · Tools · Developer sessions", search: "ChatGPT" },
  { name: "Anthropic", handle: "anthropic-ai", category: "Official channels", level: "All levels", initials: "A", color: "#edd5c6", description: "Official Claude explanations, demonstrations, and deeper research discussions.", topics: "Claude · Artifacts · Claude Code", search: "Claude" },
  { name: "Google Workspace", handle: "googleworkspace", category: "Official channels", level: "Beginner", initials: "G", color: "#e1e7f2", description: "Gemini in everyday work apps. Check plan requirements before following along.", topics: "Gemini · Docs · Sheets · Gmail", search: "Gemini" },
  { name: "Google for Developers", handle: "GoogleDevelopers", category: "Build & code", level: "Technical", initials: "G", color: "#e1e7f2", description: "Build with Gemini, Google AI Studio, and APIs. Some coding required.", topics: "Gemini API · AI Studio · Web", search: "Gemini API" },
  { name: "n8n", handle: "n8n-io", category: "Automation", level: "Beginner → Advanced", initials: "n8n", color: "#f0dadd", description: "Triggers, actions, and workflows from the people who make the platform.", topics: "Workflows · Error handling · Agents", search: "beginner" },
  { name: "Nate Herk", handle: "nateherk", category: "Automation", level: "Intermediate", initials: "NH", color: "#e7e3d3", description: "Hands-on AI automation builds. Public tutorials; optional paid offers are separate.", topics: "n8n · AI agents · Automation", search: "n8n beginner" },
  { name: "freeCodeCamp.org", handle: "freecodecamp", category: "Build & code", level: "Beginner → Advanced", initials: "fC", color: "#dfe1ed", description: "Long-form, free technical courses. Pick a course that matches your prerequisites.", topics: "Web development · Python · AI/ML", search: "Generative AI" },
  { name: "Microsoft Developer", handle: "MicrosoftDeveloper", category: "Build & code", level: "Technical", initials: "M", color: "#e1e7f2", description: "Technical explanations and AI application building with developer tooling.", topics: "AI apps · Python · Agents", search: "AI agents" },
  { name: "Chai aur Code", handle: "chaiaurcode", category: "Hindi", level: "Beginner → Advanced", initials: "C", color: "#ecdcc8", description: "Hindi coding explanations. Understand what is behind the website you are building.", topics: "Hindi · JavaScript · Web development", search: "JavaScript" },
  { name: "codebasics Hindi", handle: "codebasicsHindi", category: "Hindi", level: "Beginner", initials: "cb", color: "#dce8e0", description: "Step-by-step Hindi programming foundations and technical learning.", topics: "Hindi · Python · Data analysis", search: "Python" },
];

export const modules: LearningModule[] = [
  { title: "Essential AI tools", description: "Same tools. Better questions. Fewer seventeen-tab identity crises.", tags: "ChatGPT / Claude / Gemini / NotebookLM", exercise: "Write three prompts for tasks you genuinely do. Test each prompt, check the output, and revise it.", note: "Use free tiers where available. Some features require paid plans.", handles: ["KevinStratvert", "JeffSu", "OpenAI", "anthropic-ai", "googleworkspace"] },
  { title: "How AI works", description: "Confidence is not correctness. This applies to models and course sales pages.", tags: "Generative AI / Context / Verification", exercise: "Ask an assistant a factual question. Check three key claims against reliable sources and record any errors.", note: "Start with concepts before engineering-heavy courses; check prerequisites.", handles: ["freecodecamp", "OpenAI", "anthropic-ai", "MicrosoftDeveloper"] },
  { title: "AI at work", description: "Emails, summaries, research, and spreadsheets. Bring a task, not confidential client data.", tags: "Writing / Research / Spreadsheets", exercise: "Create a repeatable routine using sample data. Write a checklist for checking the result before using it.", note: "Use synthetic data. Do not paste private work records or credentials into tools.", handles: ["JeffSu", "KevinStratvert", "googleworkspace"] },
  { title: "Automation with n8n", description: "Automate the boring stuff. Not the consequences of a mistake.", tags: "Triggers / Actions / Human approval", exercise: "Build a small workflow that prepares an action, then waits for your approval before sending or changing anything.", note: "Hosting, APIs, and connected apps can cost money. Check costs before running a workflow.", handles: ["n8n-io", "nateherk"] },
  { title: "Websites & AI agents", description: "An agent is not an employee just because you gave it a profile picture.", tags: "Web fundamentals / Permissions / Testing", exercise: "Build a small web project and test it. Design a narrow agent with mock inputs and explicit permissions.", note: "Advanced lessons can require code, hosting, or API fees. A paper agent design is a no-spend starting point.", handles: ["freecodecamp", "GoogleDevelopers", "MicrosoftDeveloper", "chaiaurcode"] },
];

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
