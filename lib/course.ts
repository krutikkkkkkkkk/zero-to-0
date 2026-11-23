/**
 * The free AI course: every lesson lives here. The page reads this file, so adding,
 * removing or reordering lessons never needs a layout change.
 *
 * Rules (from the PRD):
 * - `id` is permanent. It keys saved progress and link reports, so never rename or reuse one.
 * - `duration` only when the publisher states it.
 * - Creator links go to the channel itself; catalog links go to the specific course.
 * - `lastChecked` is the date the link was last opened and confirmed to load.
 */

export const lessonTypes = ["Course", "Video", "Reading", "Tool", "Community"] as const;
export type LessonType = (typeof lessonTypes)[number];

export type Lesson = {
  id: string;
  title: string;
  publisher: string;
  type: LessonType;
  url: string;
  duration?: string;
  description: string;
  starter?: boolean;
  lastChecked: string; // YYYY-MM-DD
};

/** A hands-on task that closes a module, so learners leave with proof of skill, not just watched videos. */
export type ModuleProject = {
  title: string;
  /** One or two sentences: what to make and why */
  brief: string;
  steps: string[];
  /** The check that tells the learner they're finished */
  doneWhen: string;
};

export type CourseModule = {
  id: string;
  number: number;
  title: string;
  /** What the learner can do after the module */
  outcome: string;
  project: ModuleProject;
  lessons: Lesson[];
};

const CHECKED = "2026-11-23";
export const reviewedOn = "23 November 2026";

export const courseModules: CourseModule[] = [
  {
    id: "six-tools",
    number: 1,
    title: "The six tools",
    outcome: "Use ChatGPT, Claude, Gemini, Gemini Notebook, Wispr Flow and n8n for one real task each.",
    project: {
      title: "One real task, six tools",
      brief: "Pick one real task from your week, like replying to a long email thread or planning a trip, and run it through the tools in this module.",
      steps: [
        "Give the exact same prompt to ChatGPT, Claude and Gemini.",
        "Upload one document to Gemini Notebook and ask it three questions about it.",
        "Dictate your next prompt with Wispr Flow instead of typing it.",
        "Finish the n8n Quickstart workflow and run it once.",
      ],
      doneWhen: "You've written two lines on which tool handled your task best, and why.",
    },
    lessons: [
      {
        id: "openai-chatgpt-fundamentals",
        title: "ChatGPT fundamentals",
        publisher: "OpenAI Academy",
        type: "Reading",
        url: "https://academy.openai.com/public/clubs/work-users-ynjqu/resources/chatgpt-basics",
        description: "What ChatGPT is and how to use it in any role. Start here if you've only tried it a few times.",
        starter: true,
        lastChecked: CHECKED,
      },
      {
        id: "openai-chatgpt-capabilities",
        title: "ChatGPT capabilities overview",
        publisher: "OpenAI Help Center",
        type: "Reading",
        url: "https://help.openai.com/en/articles/9260256-chatgpt-capabilities-overview",
        description: "A tour of what ChatGPT can do today, so you know which feature to reach for.",
        lastChecked: CHECKED,
      },
      {
        id: "anthropic-claude-101",
        title: "Claude 101",
        publisher: "Claude Academy (Anthropic)",
        type: "Course",
        url: "https://academy.claude.com/courses/claude-101",
        duration: "2.5 hr",
        description: "Everyday work with Claude, from your first conversation and good prompts to projects, artifacts and connected tools.",
        starter: true,
        lastChecked: CHECKED,
      },
      {
        id: "google-use-gemini-apps",
        title: "Use Gemini Apps",
        publisher: "Google (Gemini Apps Help)",
        type: "Reading",
        url: "https://support.google.com/gemini/answer/13275745?hl=en",
        description: "Google's own guide to starting chats, adding files and using Gemini on a computer.",
        starter: true,
        lastChecked: CHECKED,
      },
      {
        id: "google-learn-gemini-notebook",
        title: "Learn about Gemini Notebook",
        publisher: "Google (Gemini Notebook Help)",
        type: "Reading",
        url: "https://support.google.com/gemininotebook/answer/16164461?hl=en",
        description: "What Gemini Notebook (formerly NotebookLM) does: answers grounded only in the sources you give it.",
        starter: true,
        lastChecked: CHECKED,
      },
      {
        id: "google-create-gemini-notebook",
        title: "Create a notebook in Gemini Notebook",
        publisher: "Google (Gemini Notebook Help)",
        type: "Reading",
        url: "https://support.google.com/gemininotebook/answer/16206563?hl=en",
        description: "Set up your first notebook and add documents, sites or videos as its sources.",
        lastChecked: CHECKED,
      },
      {
        id: "wispr-first-dictation",
        title: "Starting your first dictation",
        publisher: "Wispr Flow",
        type: "Reading",
        url: "https://docs.wisprflow.ai/articles/6409258247-starting-your-first-dictation",
        description: "Install Wispr Flow and speak into any app instead of typing.",
        lastChecked: CHECKED,
      },
      {
        id: "n8n-quickstart",
        title: "n8n Quickstart",
        publisher: "n8n",
        type: "Course",
        url: "https://learn.n8n.io/courses/course-v1:n8n+QS101+2026H2/about",
        duration: "3 to 5 hours",
        description: "n8n's official starter course. You finish with your first working automation.",
        starter: true,
        lastChecked: CHECKED,
      },
      {
        id: "creator-kevin-stratvert",
        title: "Kevin Stratvert",
        publisher: "Kevin Stratvert (YouTube)",
        type: "Video",
        url: "https://www.youtube.com/@KevinStratvert",
        description: "Friendly, step-by-step tutorials on everyday AI tools and office apps. Good when a written guide isn't enough.",
        lastChecked: CHECKED,
      },
    ],
  },
  {
    id: "how-ai-works",
    number: 2,
    title: "How AI works",
    outcome: "Explain what a language model does and why it gets things wrong.",
    project: {
      title: "Catch a hallucination",
      brief: "Test a chatbot on things you already know, so you can see where it goes wrong.",
      steps: [
        "Ask five questions you know the answers to: your town, your job, a niche hobby, a recent event.",
        "Mark each answer right, partly right or invented.",
        "Ask for sources on one wrong answer, then open them and check.",
        "Retry that question with the source text pasted in, and tell it to say \"I don't know\" when unsure.",
      ],
      doneWhen: "You can explain in two or three sentences why it got the wrong one wrong.",
    },
    lessons: [
      {
        id: "3b1b-llms-explained-briefly",
        title: "Large Language Models explained briefly",
        publisher: "3Blue1Brown",
        type: "Video",
        url: "https://www.youtube.com/watch?v=LPZh9BOjkQs",
        duration: "8 min",
        description: "The clearest short visual explanation of what happens when a chatbot writes its answer.",
        lastChecked: CHECKED,
      },
      {
        id: "google-intro-generative-ai",
        title: "Introduction to Generative AI",
        publisher: "Google Skills",
        type: "Course",
        url: "https://www.skills.google/course_templates/536",
        duration: "45 minutes",
        description: "Google's short beginner course on what generative AI is and how it differs from older AI.",
        lastChecked: CHECKED,
      },
      {
        id: "anthropic-capabilities-limitations",
        title: "AI capabilities and limitations",
        publisher: "Claude Academy (Anthropic)",
        type: "Course",
        url: "https://academy.claude.com/courses/ai-capabilities-and-limitations",
        duration: "3.5 hr",
        description: "A working mental model of what language models can and can't do: prediction, knowledge, memory and context limits.",
        lastChecked: CHECKED,
      },
      {
        id: "openai-why-hallucinate",
        title: "Why language models hallucinate",
        publisher: "OpenAI",
        type: "Reading",
        url: "https://openai.com/index/why-language-models-hallucinate/",
        description: "OpenAI's plain explanation of why models state wrong things confidently, and what reduces it.",
        lastChecked: CHECKED,
      },
      {
        id: "karpathy-intro-llms",
        title: "Intro to Large Language Models",
        publisher: "Andrej Karpathy",
        type: "Video",
        url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        duration: "1 hr",
        description: "A one-hour talk for non-specialists on how models are trained, where they're heading and where they break.",
        lastChecked: CHECKED,
      },
    ],
  },
  {
    id: "ai-at-work",
    number: 3,
    title: "AI at work",
    outcome: "Use AI for email, research, meeting notes and data, and check its output.",
    project: {
      title: "Take back one hour a week",
      brief: "Turn one repeated work task, like a status report, meeting notes or a spreadsheet summary, into a prompt you reuse.",
      steps: [
        "Write a prompt with four parts: who it's for, the context, the format you want, and one example.",
        "Run it on three real pieces of work, improving the prompt after each run.",
        "Check every fact and number against the source before you use the output.",
        "Use only tools your employer allows for work data, and keep confidential material out of personal accounts.",
      ],
      doneWhen: "You have a saved prompt you'd actually use next week, and its output needs only light edits.",
    },
    lessons: [
      {
        id: "anthropic-ai-fluency",
        title: "AI Fluency: Framework and foundations",
        publisher: "Claude Academy (Anthropic)",
        type: "Course",
        url: "https://academy.claude.com/courses/ai-fluency-framework-foundations",
        duration: "4 hr",
        description: "How to decide what to hand to AI, describe it well and check what comes back. Applies to any tool.",
        lastChecked: CHECKED,
      },
      {
        id: "openai-prompting",
        title: "Prompting",
        publisher: "OpenAI Academy",
        type: "Reading",
        url: "https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting",
        description: "The basics of writing prompts, with sample prompts to try for your own role.",
        lastChecked: CHECKED,
      },
      {
        id: "openai-chatgpt-any-role",
        title: "ChatGPT for any role",
        publisher: "OpenAI Academy",
        type: "Reading",
        url: "https://academy.openai.com/public/clubs/work-users-ynjqu/resources/chatgpt-for-any-role",
        description: "A prompt pack for everyday work: emails, rewriting for clarity, summaries and research.",
        lastChecked: CHECKED,
      },
      {
        id: "google-workspace-prompt-guide",
        title: "Google Workspace with Gemini prompt guide",
        publisher: "Google Workspace",
        type: "Reading",
        url: "https://workspace.google.com/learning/content/gemini-prompt-guide",
        description: "Ready-made prompts for Gmail, Docs, Sheets and Meet, arranged by job role.",
        lastChecked: CHECKED,
      },
      {
        id: "openai-data-analysis",
        title: "Data analysis",
        publisher: "OpenAI Academy",
        type: "Reading",
        url: "https://academy.openai.com/public/clubs/work-users-ynjqu/resources/data-analysis",
        description: "Upload a spreadsheet and ask questions of it, then check the numbers before you use them.",
        lastChecked: CHECKED,
      },
      {
        id: "anthropic-research-to-presentations",
        title: "Turn research into presentations",
        publisher: "Claude Academy (Anthropic)",
        type: "Reading",
        url: "https://academy.claude.com/use-cases/turn-research-into-presentations",
        duration: "15 min",
        description: "Go from notes and findings to a slide outline with speaker notes.",
        lastChecked: CHECKED,
      },
    ],
  },
  {
    id: "automation-n8n",
    number: 4,
    title: "Automation with n8n",
    outcome: "Have one repeated task run on its own.",
    project: {
      title: "Automate one repeated task",
      brief: "Build a workflow that runs without you, for example a morning email with your day's plan, or form responses saved into a Google Sheet.",
      steps: [
        "Start from an n8n template or a blank workflow. n8n Cloud has a free trial; the self-hosted Community Edition is free.",
        "Add a trigger: a schedule, a form or a webhook.",
        "Connect at least one app you use, and add an AI step if it helps.",
        "Test it with real data, then activate it.",
      ],
      doneWhen: "It has run on its own at least once without you clicking anything.",
    },
    lessons: [
      {
        id: "n8n-essentials",
        title: "Essentials: Your First Workflows",
        publisher: "n8n",
        type: "Course",
        url: "https://learn.n8n.io/courses/course-v1:n8n+N8N101+2026H2/about",
        duration: "2 to 4 hours",
        description: "Triggers, actions and data between steps. The foundation for everything else in this module.",
        lastChecked: CHECKED,
      },
      {
        id: "n8n-build-first-workflow-doc",
        title: "Build your first workflow",
        publisher: "n8n Docs",
        type: "Reading",
        url: "https://docs.n8n.io/build-your-first-workflow",
        description: "A written walkthrough to keep open beside the editor while you build.",
        lastChecked: CHECKED,
      },
      {
        id: "n8n-integrations",
        title: "Integrations: APIs & Connected Workflows",
        publisher: "n8n",
        type: "Course",
        url: "https://learn.n8n.io/courses/course-v1:n8n+N8N102+2026H2/about",
        duration: "4 to 6 hours",
        description: "Connect the apps you already use, including ones without a ready-made n8n node.",
        lastChecked: CHECKED,
      },
      {
        id: "n8n-in-practice",
        title: "In Practice: AI, Testing & Best Practices",
        publisher: "n8n",
        type: "Course",
        url: "https://learn.n8n.io/courses/course-v1:n8n+N8N103+2026H2/about",
        duration: "3 to 4 hours",
        description: "Add AI steps, test workflows and keep them from failing quietly.",
        lastChecked: CHECKED,
      },
      {
        id: "n8n-workflow-templates",
        title: "n8n workflow templates",
        publisher: "n8n",
        type: "Tool",
        url: "https://n8n.io/workflows/",
        description: "Thousands of community workflows you can copy and adapt instead of starting from a blank canvas.",
        lastChecked: CHECKED,
      },
      {
        id: "creator-n8n-youtube",
        title: "n8n on YouTube",
        publisher: "n8n (YouTube)",
        type: "Video",
        url: "https://www.youtube.com/@n8n-io",
        description: "Official tutorials and feature walkthroughs from the team that builds n8n.",
        lastChecked: CHECKED,
      },
      {
        id: "creator-nate-herk",
        title: "Nate Herk | AI Automation",
        publisher: "Nate Herk (YouTube)",
        type: "Video",
        url: "https://www.youtube.com/@nateherk",
        description: "Hands-on n8n and AI automation builds. The videos are free; his paid offers are optional.",
        lastChecked: CHECKED,
      },
    ],
  },
  {
    id: "websites-and-agents",
    number: 5,
    title: "Websites and AI agents",
    outcome: "Ship one website and one working agent.",
    project: {
      title: "Ship a page and an agent",
      brief: "Put one thing on the public internet and build one agent that does more than chat.",
      steps: [
        "Build a one-page site about you or a small business with Claude or Google AI Studio.",
        "Publish it for free with GitHub Pages or Vercel's Hobby plan.",
        "Build an agent in n8n's AI Agent node or Google AI Studio that uses at least one tool, like search or a spreadsheet.",
        "Give the agent a real task and read every step it takes.",
      ],
      doneWhen: "Your page has a public link that opens on any phone, and your agent finishes one task using a tool.",
    },
    lessons: [
      {
        id: "anthropic-custom-webpage",
        title: "Create a custom webpage",
        publisher: "Claude Academy (Anthropic)",
        type: "Reading",
        url: "https://academy.claude.com/use-cases/create-a-custom-webpage",
        duration: "15 min",
        description: "Build a portfolio page with Claude and put it online without writing code yourself.",
        lastChecked: CHECKED,
      },
      {
        id: "fcc-responsive-web-design",
        title: "Responsive Web Design Certification",
        publisher: "freeCodeCamp",
        type: "Course",
        url: "https://www.freecodecamp.org/learn/responsive-web-design-v9/",
        description: "Learn the HTML and CSS behind every website by building small projects. Free certificate from freeCodeCamp.",
        lastChecked: CHECKED,
      },
      {
        id: "mdn-getting-started",
        title: "Getting started modules",
        publisher: "MDN Web Docs",
        type: "Reading",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started",
        description: "Mozilla's beginner reference for how the web works, for when an AI-built page needs fixing.",
        lastChecked: CHECKED,
      },
      {
        id: "nextjs-learn",
        title: "Learn Next.js",
        publisher: "Next.js (Vercel)",
        type: "Course",
        url: "https://nextjs.org/learn",
        description:
          "The official free course: build a full-stack dashboard in 16 chapters. Useful when you want to understand the code AI builders like v0 write.",
        lastChecked: "2026-11-24",
      },
      {
        id: "github-pages-site",
        title: "Creating a GitHub Pages site",
        publisher: "GitHub Docs",
        type: "Reading",
        url: "https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site",
        description: "Publish a website for free from a GitHub repository.",
        lastChecked: CHECKED,
      },
      {
        id: "vercel-deploy-foundations",
        title: "Deploy on Vercel",
        publisher: "Vercel Academy",
        type: "Video",
        url: "https://vercel.com/academy/vercel-foundations",
        duration: "1 hr",
        description:
          "Nine short videos on putting a site online with Vercel and managing it. The Hobby plan is free for personal projects.",
        lastChecked: "2026-11-24",
      },
      {
        id: "google-ai-studio",
        title: "Google AI Studio",
        publisher: "Google",
        type: "Tool",
        url: "https://aistudio.google.com/",
        description: "Try Gemini models and build small apps from a prompt in the browser.",
        lastChecked: CHECKED,
      },
      {
        id: "anthropic-building-effective-agents",
        title: "Building effective AI agents",
        publisher: "Anthropic",
        type: "Reading",
        url: "https://www.anthropic.com/research/building-effective-agents",
        description: "When you need an agent and when a simple workflow is better. Read before building one.",
        lastChecked: CHECKED,
      },
      {
        id: "openai-practical-guide-agents",
        title: "A practical guide to building agents",
        publisher: "OpenAI",
        type: "Reading",
        url: "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf",
        description: "OpenAI's guide (PDF) to designing an agent: its tools, instructions and safety checks.",
        lastChecked: CHECKED,
      },
      {
        id: "hf-agents-course",
        title: "AI Agents Course",
        publisher: "Hugging Face",
        type: "Course",
        url: "https://huggingface.co/learn/agents-course/unit0/introduction",
        description: "Build and test real agents step by step. Uses Python, so take it after the website lessons.",
        lastChecked: CHECKED,
      },
      {
        id: "creator-chai-aur-code",
        title: "Chai aur Code",
        publisher: "Chai aur Code (YouTube)",
        type: "Video",
        url: "https://www.youtube.com/@chaiaurcode",
        description: "Web development explained in Hindi. Understand what's behind the site you're building.",
        lastChecked: CHECKED,
      },
    ],
  },
  {
    id: "staying-current",
    number: 6,
    title: "Staying current",
    outcome: "Keep up in twenty minutes a week.",
    project: {
      title: "A 20-minute weekly routine",
      brief: "Replace doom-scrolling AI news with one short, fixed habit.",
      steps: [
        "Subscribe to The Batch and bookmark two of the news pages in this module.",
        "Put a recurring 20-minute slot in your calendar.",
        "Each week, write three lines: what changed, whether it affects your work, and one thing to try.",
        "Try that one thing before the next session.",
      ],
      doneWhen: "You've done it two weeks in a row and tried one new feature.",
    },
    lessons: [
      {
        id: "deeplearning-the-batch",
        title: "The Batch",
        publisher: "DeepLearning.AI",
        type: "Reading",
        url: "https://www.deeplearning.ai/the-batch/",
        description: "A weekly newsletter that explains the week's AI news calmly. One email covers most of what matters.",
        lastChecked: CHECKED,
      },
      {
        id: "anthropic-newsroom",
        title: "Anthropic newsroom",
        publisher: "Anthropic",
        type: "Reading",
        url: "https://www.anthropic.com/news",
        description: "Official Claude launches and changes, straight from the source.",
        lastChecked: CHECKED,
      },
      {
        id: "openai-news",
        title: "OpenAI News",
        publisher: "OpenAI",
        type: "Reading",
        url: "https://openai.com/news/",
        description: "Official ChatGPT and model announcements.",
        lastChecked: CHECKED,
      },
      {
        id: "google-ai-blog",
        title: "Google AI news and updates",
        publisher: "Google Blog",
        type: "Reading",
        url: "https://blog.google/innovation-and-ai/technology/ai/",
        description: "Official Gemini, Gemini Notebook and Workspace AI announcements.",
        lastChecked: CHECKED,
      },
      {
        id: "creator-ai-explained",
        title: "AI Explained",
        publisher: "AI Explained (YouTube)",
        type: "Video",
        url: "https://www.youtube.com/@aiexplained-official",
        description: "Careful video breakdowns of major model releases, with less hype than most AI channels.",
        lastChecked: CHECKED,
      },
    ],
  },
  {
    id: "getting-unstuck",
    number: 7,
    title: "Getting unstuck",
    outcome: "Know where and how to ask for help.",
    project: {
      title: "Ask one good public question",
      brief: "Take a real problem from modules 3 to 5 and get it solved in a community.",
      steps: [
        "Search the forum first, in case it's already answered.",
        "Write the question: what you're trying to do, what you tried, the exact error, and what you expected.",
        "Remove anything private, then post it.",
        "When it's solved, post what fixed it so the next person finds it.",
      ],
      doneWhen: "Your question got an answer, or you answered someone else's.",
    },
    lessons: [
      {
        id: "stackoverflow-how-to-ask",
        title: "How do I ask a good question?",
        publisher: "Stack Overflow",
        type: "Reading",
        url: "https://stackoverflow.com/help/how-to-ask",
        description: "How to describe a problem so strangers can actually help. Works in every forum below.",
        lastChecked: CHECKED,
      },
      {
        id: "n8n-community",
        title: "n8n Community",
        publisher: "n8n",
        type: "Community",
        url: "https://community.n8n.io/",
        description: "The official forum for stuck workflows. Search first; most errors have been asked about before.",
        lastChecked: CHECKED,
      },
      {
        id: "openai-developer-community",
        title: "OpenAI Developer Community",
        publisher: "OpenAI",
        type: "Community",
        url: "https://community.openai.com/",
        description: "Official forum for questions about OpenAI tools and the API.",
        lastChecked: CHECKED,
      },
      {
        id: "anthropic-claude-discord",
        title: "Claude Discord",
        publisher: "Anthropic",
        type: "Community",
        url: "https://www.anthropic.com/discord",
        description: "Anthropic's official Discord server for Claude users.",
        lastChecked: CHECKED,
      },
      {
        id: "fcc-forum",
        title: "The freeCodeCamp Forum",
        publisher: "freeCodeCamp",
        type: "Community",
        url: "https://forum.freecodecamp.org/",
        description: "A patient, beginner-friendly forum for website and coding questions.",
        lastChecked: CHECKED,
      },
    ],
  },
  {
    id: "your-industry",
    number: 8,
    title: "Your industry",
    outcome: "Apply the tools in finance, marketing, HR or a small business.",
    project: {
      title: "A one-page AI playbook for your job",
      brief: "Map where AI fits into the work you actually do.",
      steps: [
        "List ten tasks you do every week.",
        "Mark each one: AI drafts it, AI summarises it, AI analyses it, or no AI.",
        "For your top three, write and test a prompt or workflow.",
        "Note the risks for each: private data, accuracy, and what must stay human.",
      ],
      doneWhen: "You have one page you could share with a colleague, with three tested uses.",
    },
    lessons: [
      {
        id: "openai-chatgpt-finance",
        title: "ChatGPT for finance",
        publisher: "OpenAI Academy",
        type: "Reading",
        url: "https://academy.openai.com/public/clubs/work-users-ynjqu/resources/use-cases-finance",
        description: "Prompts for analysis, forecasting, reporting and explaining numbers to leadership.",
        lastChecked: CHECKED,
      },
      {
        id: "openai-chatgpt-marketing",
        title: "ChatGPT for marketing",
        publisher: "OpenAI Academy",
        type: "Reading",
        url: "https://academy.openai.com/public/clubs/work-users-ynjqu/resources/use-cases-marketing",
        description: "Prompts for campaign planning, competitor research, content and performance analysis.",
        lastChecked: CHECKED,
      },
      {
        id: "openai-chatgpt-hr",
        title: "ChatGPT for HR",
        publisher: "OpenAI Academy",
        type: "Reading",
        url: "https://academy.openai.com/public/clubs/work-users-ynjqu/resources/use-cases-hr",
        description: "Prompts for recruiting, policy drafts, engagement and employee communication.",
        lastChecked: CHECKED,
      },
      {
        id: "anthropic-ai-fluency-small-business",
        title: "AI Fluency for small businesses",
        publisher: "Claude Academy (Anthropic)",
        type: "Course",
        url: "https://academy.claude.com/courses/ai-fluency-for-small-businesses",
        duration: "3.5 hr",
        description: "Everyday business tasks such as research, customer data and operations, done with AI safely.",
        lastChecked: CHECKED,
      },
      {
        id: "google-ai-small-businesses",
        title: "AI training and tools for small businesses",
        publisher: "Grow with Google",
        type: "Course",
        url: "https://grow.google/ai-for-small-businesses/",
        description: "Google's tutorials for owners on saving time with AI in marketing and day-to-day running.",
        lastChecked: CHECKED,
      },
    ],
  },
  {
    id: "design-with-ai",
    number: 9,
    title: "Design and build with AI",
    outcome: "Design a screen with AI tools and let an agent turn it into a working page.",
    project: {
      title: "From screen to working page",
      brief: "Design one screen, like a pricing page or a sign-up form, and turn it into a working page with AI.",
      steps: [
        "Collect three references for the screen from Mobbin's free library.",
        "Design it in Figma or Framer, using the AI features your plan includes.",
        "Build it with an AI app builder (v0, Lovable, Bolt or Figma Make), or have an agent build it from your design with the Figma or Framer MCP server.",
        "Compare the result with your design and fix the three biggest differences.",
      ],
      doneWhen: "The page is live at a public link and matches your design on a phone and a laptop.",
    },
    lessons: [
      {
        id: "figma-get-started-ai",
        title: "Get started with Figma AI",
        publisher: "Figma Learn",
        type: "Reading",
        url: "https://help.figma.com/hc/en-us/articles/23870272542231-Get-started-with-Figma-AI",
        description:
          "What each Figma AI tool does. The free Starter plan includes a small monthly allowance of AI credits; some features need a paid seat.",
        lastChecked: CHECKED,
      },
      {
        id: "figma-make",
        title: "Explore Figma Make",
        publisher: "Figma Learn",
        type: "Reading",
        url: "https://help.figma.com/hc/en-us/articles/31304412302231-Explore-Figma-Make",
        description:
          "Prompt a clickable prototype or simple app, or start from a Figma design. Works on the free Starter plan within its AI credits.",
        lastChecked: "2026-11-24",
      },
      {
        id: "figma-mcp-server",
        title: "Guide to the Figma MCP server",
        publisher: "Figma Learn",
        type: "Reading",
        url: "https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server",
        description:
          "Let Claude, Cursor and other agents read your Figma designs and build from them. Available on all plans, including free.",
        lastChecked: CHECKED,
      },
      {
        id: "framer-academy",
        title: "Framer Academy",
        publisher: "Framer",
        type: "Course",
        url: "https://www.framer.com/academy/",
        description: "Short video lessons on designing, building and publishing a site with Framer's AI agent.",
        lastChecked: CHECKED,
      },
      {
        id: "framer-mcp",
        title: "Getting started with Framer MCP",
        publisher: "Framer Help",
        type: "Reading",
        url: "https://www.framer.com/help/articles/getting-started-with-framer-mcp/",
        duration: "4 min video",
        description:
          "Connect Claude, ChatGPT or Cursor to Framer so an agent can create pages and edit content. Included in Framer's free plan.",
        lastChecked: CHECKED,
      },
      {
        id: "v0-build-with-v0",
        title: "Build with v0",
        publisher: "Vercel Academy",
        type: "Course",
        url: "https://vercel.com/academy/v0-foundations",
        description:
          "Build, customise and ship a real website with v0, no code required. v0's free plan allows 7 messages a day.",
        lastChecked: "2026-11-24",
      },
      {
        id: "lovable-welcome",
        title: "Welcome to Lovable",
        publisher: "Lovable Docs",
        type: "Reading",
        url: "https://docs.lovable.dev/introduction/welcome",
        description:
          "How Lovable builds full apps with sign-in and a database from a chat. The free plan gives 5 build credits a day.",
        lastChecked: "2026-11-24",
      },
      {
        id: "bolt-help-center",
        title: "Bolt Help Center",
        publisher: "Bolt",
        type: "Reading",
        url: "https://support.bolt.new/",
        description:
          "Guides for building, fixing and publishing full-stack apps in Bolt. The free plan includes 1M tokens a month.",
        lastChecked: "2026-11-24",
      },
      {
        id: "mobbin-library",
        title: "Mobbin",
        publisher: "Mobbin",
        type: "Tool",
        url: "https://mobbin.com/",
        description:
          "600,000+ real app screens to study before you design. Browsing is free with an account; the Mobbin MCP for agents needs a Pro or Team plan.",
        lastChecked: CHECKED,
      },
      {
        id: "shadcn-registry",
        title: "shadcn/ui registry",
        publisher: "shadcn/ui",
        type: "Reading",
        url: "https://ui.shadcn.com/docs/registry",
        description: "Run your own registry of components that anyone, or any AI agent, can install with one command. Open source.",
        lastChecked: CHECKED,
      },
      {
        id: "shadcn-mcp-server",
        title: "shadcn MCP server",
        publisher: "shadcn/ui",
        type: "Reading",
        url: "https://ui.shadcn.com/docs/mcp",
        description: "Let your AI agent browse, search and install components from shadcn registries when you ask in plain English.",
        lastChecked: CHECKED,
      },
      {
        id: "shadcn-registry-directory",
        title: "Registry directory",
        publisher: "shadcn/ui",
        type: "Tool",
        url: "https://ui.shadcn.com/docs/directory",
        description: "Community registries of free components and page blocks you can add to a project.",
        lastChecked: CHECKED,
      },
    ],
  },
];

export const allLessons = courseModules.flatMap((m) => m.lessons);
export const totalLessons = allLessons.length;
export const allLessonIds: ReadonlySet<string> = new Set(allLessons.map((l) => l.id));
export const starterLessons = allLessons.filter((l) => l.starter);

/** Progress key for a module's project. Stored alongside lesson IDs, so it's permanent too. */
export const projectId = (moduleId: string) => `project:${moduleId}`;
export const allProjectIds = courseModules.map((m) => projectId(m.id));
export const totalProjects = allProjectIds.length;
/** Every ID that can be ticked off: lessons and module projects */
export const allProgressIds: ReadonlySet<string> = new Set([...allLessonIds, ...allProjectIds]);
