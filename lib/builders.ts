import type { PromptGroup } from "./resources";

/**
 * AI app builders and Vercel. Free-plan wording was checked on each product's
 * official pricing page on `buildersCheckedOn`. Free plans change often.
 */
export const buildersCheckedOn = "24 November 2026";

export type BuilderLogo = "v0" | "lovable" | "bolt" | "figma";

export type Builder = {
  id: string;
  name: string;
  maker: string;
  logo: BuilderLogo;
  url: string;
  docsUrl: string;
  pricingUrl: string;
  bestFor: string;
  whatItDoes: string;
  /** The free plan, in the product's own terms */
  freePlan: string[];
  /** Limits worth knowing before you start */
  watchOut: string;
};

export const builders: Builder[] = [
  {
    id: "v0",
    name: "v0",
    maker: "Vercel",
    logo: "v0",
    url: "https://v0.app/",
    docsUrl: "https://v0.app/docs",
    pricingUrl: "https://v0.app/pricing",
    bestFor: "Good-looking websites, landing pages and dashboards in Next.js.",
    whatItDoes:
      "Describe a page or app and v0 builds it with real code you can see, edit visually and publish to Vercel in one click.",
    freePlan: ["7 messages a day", "Visual editing with Design Mode", "Deploy to Vercel and sync with GitHub"],
    watchOut: "Seven messages a day goes quickly, so plan each request before you send it.",
  },
  {
    id: "lovable",
    name: "Lovable",
    maker: "Lovable",
    logo: "lovable",
    url: "https://lovable.dev/",
    docsUrl: "https://docs.lovable.dev/introduction/welcome",
    pricingUrl: "https://lovable.dev/pricing",
    bestFor: "Full apps with sign-in and a database, without touching code.",
    whatItDoes:
      "Chat your way to a working web app, with a built-in database, user accounts and hosting on a lovable.app address.",
    freePlan: ["5 build credits a day (up to 30 a month)", "Up to 5 lovable.app sites", "Unlimited collaborators"],
    watchOut: "Daily credits don't roll over. Free sites carry the Lovable badge and can't use your own domain.",
  },
  {
    id: "bolt",
    name: "Bolt",
    maker: "StackBlitz",
    logo: "bolt",
    url: "https://bolt.new/",
    docsUrl: "https://support.bolt.new/",
    pricingUrl: "https://bolt.new/pricing",
    bestFor: "Full-stack apps when you want to see and edit every file.",
    whatItDoes:
      "Builds and runs a complete app in your browser, with a code editor, database and hosting, so you can switch between chatting and coding.",
    freePlan: ["1M tokens a month (300K a day)", "Public and private projects", "Website hosting and databases"],
    watchOut: "Big apps use tokens fast. Free sites show Bolt branding and can't use a custom domain.",
  },
  {
    id: "figma-make",
    name: "Figma Make",
    maker: "Figma",
    logo: "figma",
    url: "https://www.figma.com/make/",
    docsUrl: "https://help.figma.com/hc/en-us/articles/31304412302231-Explore-Figma-Make",
    pricingUrl: "https://www.figma.com/pricing/",
    bestFor: "Designers turning ideas or Figma designs into clickable prototypes and simple apps.",
    whatItDoes:
      "Prompt a prototype or working app, or start from a Figma design, then refine it with prompts or by editing directly.",
    freePlan: ["Included in Figma's free Starter plan", "Up to 500 AI credits a month (150 a day)"],
    watchOut:
      "A from-scratch app can use a lot of credits. On Starter, publishing to the web goes through the Figma Community.",
  },
];

/** Which builder to pick, by what you want to make. */
export const builderPicker: [want: string, pick: string][] = [
  ["A landing page or portfolio that looks polished", "v0"],
  ["An app with sign-in and saved data, no code", "Lovable"],
  ["An app where you also want to read and edit the code", "Bolt"],
  ["A clickable prototype from a design idea or Figma file", "Figma Make"],
];

export type VercelResource = {
  title: string;
  url: string;
  kind: string;
  text: string;
  logo: "vercel" | "nextjs" | "v0";
};

/** Vercel: free hosting and free learning for what you build. */
export const vercelResources: VercelResource[] = [
  {
    title: "Vercel Hobby plan",
    url: "https://vercel.com/pricing",
    kind: "Free hosting",
    text: "Put a website or app online for $0, with a vercel.app address and HTTPS. Free accounts are capped and can't buy extra usage. It's meant for personal projects, so check Vercel's terms before running a business on it.",
    logo: "vercel",
  },
  {
    title: "Build with v0",
    url: "https://vercel.com/academy/v0-foundations",
    kind: "Vercel Academy course",
    text: "Build, customise and ship a real website with v0. No code required.",
    logo: "v0",
  },
  {
    title: "Deploy on Vercel",
    url: "https://vercel.com/academy/vercel-foundations",
    kind: "Vercel Academy course · 1 hr",
    text: "Nine short videos on the Vercel concepts you need to publish and manage a site.",
    logo: "vercel",
  },
  {
    title: "Build and Launch with AI",
    url: "https://vercel.com/academy/build-and-launch-with-ai",
    kind: "Vercel Academy course",
    text: "Take an AI-built idea all the way to a launched product.",
    logo: "vercel",
  },
  {
    title: "Learn Next.js",
    url: "https://nextjs.org/learn",
    kind: "Free course",
    text: "The official Next.js course: 16 chapters that build a full-stack dashboard, from styling to databases and sign-in.",
    logo: "nextjs",
  },
  {
    title: "Vercel templates",
    url: "https://vercel.com/templates",
    kind: "Starter projects",
    text: "Ready-made sites and apps (portfolios, blogs, stores, AI chatbots) you can deploy in one click and then change.",
    logo: "vercel",
  },
];

/** Prompts written for AI app builders (v0, Lovable, Bolt, Figma Make). */
export const builderPromptGroups: PromptGroup[] = [
  {
    id: "builder-prompts",
    title: "Prompts that save credits",
    prompts: [
      {
        id: "first-app-prompt",
        title: "Your first prompt",
        useFor: "Starting a new app. One clear brief beats ten vague messages.",
        prompt: `Build a [type of app, e.g. booking app] for [who uses it].

The one job it must do: [e.g. let customers pick a 30-minute slot and get a confirmation].

Pages:
1. [page]: [what's on it]
2. [page]: [what's on it]
3. [page]: [what's on it]

Data it stores: [e.g. bookings with name, phone, date, time]
Who can see what: [e.g. customers see only their own bookings; I see all of them]
Look and feel: [e.g. clean, friendly, lots of white space, brand colour], must work well on phones.

Build the simplest version that does the one job. Don't add extra features. Use sample data so I can try it straight away.`,
        tip: "Write this in a notes app first. A complete first brief can save a whole day of free credits.",
      },
      {
        id: "one-change",
        title: "One change at a time",
        useFor: "Adding a feature without breaking what works.",
        prompt: `Make one change only: [describe the change, e.g. add a "Cancel booking" button on the My bookings page].

Keep everything else exactly as it is: don't restyle, rename or move anything I haven't mentioned.
When it's done, tell me what you changed and how I can test it.`,
      },
      {
        id: "fix-bug",
        title: "Fix a bug properly",
        useFor: "When something broke and repeated \"fix it\" messages aren't working.",
        prompt: `There's a bug. Don't change any code yet.

What I did: [steps]
What I expected: [expected]
What happened instead: [actual, plus any error message]

First explain the most likely cause and how you'd confirm it. Then fix only that, and tell me how to check it's fixed.`,
        tip: "If two attempts fail, go back to the last working version in the tool's history and describe the bug again.",
      },
      {
        id: "launch-check",
        title: "Before you share it",
        useFor: "A final check before you send the link to anyone.",
        prompt: `Review this app before I share it publicly. Check and list, without changing anything yet:

1. Any page that breaks on a 375px-wide phone
2. Forms without labels or helpful error messages
3. Anywhere private data could be seen by the wrong user
4. Any secret keys or passwords visible in the code
5. Missing page titles, descriptions and share images

Rank the problems by how serious they are, then fix them one at a time when I say go.`,
      },
    ],
  },
];
