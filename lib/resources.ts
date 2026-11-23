/**
 * Resources section data: free GitHub repos and copy-paste prompt libraries.
 * Repo facts (stars, licence, activity) were checked with the GitHub API on `resourcesCheckedOn`.
 */

export const resourcesCheckedOn = "24 November 2026";

export type RepoLevel = "Beginner" | "Intermediate" | "Advanced";

export type Repo = {
  repo: string; // owner/name
  title: string;
  description: string;
  level: RepoLevel;
  /** Rounded star count, for a rough sense of popularity */
  stars: string;
  /** Anything that costs money or needs care, said plainly */
  note?: string;
};

export type RepoGroup = { id: string; title: string; intro: string; repos: Repo[] };

export const repoGroups: RepoGroup[] = [
  {
    id: "courses",
    title: "Full courses on GitHub",
    intro: "Complete, structured lessons you can read in the browser. Start here if you want a course, not a tool.",
    repos: [
      {
        repo: "microsoft/generative-ai-for-beginners",
        title: "Generative AI for Beginners",
        description: "21 lessons on prompts, chat apps, image generation and building with AI, each with a short video.",
        level: "Beginner",
        stars: "124k",
      },
      {
        repo: "microsoft/ai-agents-for-beginners",
        title: "AI Agents for Beginners",
        description: "18 lessons on what agents are, how they use tools and plan, and how to build one safely.",
        level: "Beginner",
        stars: "81k",
      },
      {
        repo: "microsoft/AI-For-Beginners",
        title: "AI for Beginners",
        description: "A 12-week, 24-lesson tour of how AI works, from neural networks to computer vision and language.",
        level: "Beginner",
        stars: "71k",
      },
      {
        repo: "microsoft/mcp-for-beginners",
        title: "MCP for Beginners",
        description: "How the Model Context Protocol lets AI assistants connect to your tools and data, with examples.",
        level: "Intermediate",
        stars: "18k",
      },
      {
        repo: "huggingface/agents-course",
        title: "Hugging Face Agents Course",
        description: "The code and notebooks behind Hugging Face's free course on building agents.",
        level: "Intermediate",
        stars: "35k",
      },
      {
        repo: "microsoft/Web-Dev-For-Beginners",
        title: "Web Dev for Beginners",
        description: "24 lessons of HTML, CSS and JavaScript. Useful before you ask AI to build websites for you.",
        level: "Beginner",
        stars: "97k",
      },
    ],
  },
  {
    id: "prompting",
    title: "Learn to prompt",
    intro: "Better prompts are the cheapest upgrade there is.",
    repos: [
      {
        repo: "anthropics/prompt-eng-interactive-tutorial",
        title: "Prompt engineering interactive tutorial",
        description: "Anthropic's step-by-step prompting course, from basic structure to complex prompts, with exercises.",
        level: "Beginner",
        stars: "40k",
        note: "The exercises call the Claude API, which needs API credits. You can read every lesson for free.",
      },
      {
        repo: "dair-ai/Prompt-Engineering-Guide",
        title: "Prompt Engineering Guide",
        description: "A big, well-organised guide to prompting techniques, with examples for each.",
        level: "Beginner",
        stars: "80k",
      },
      {
        repo: "f/prompts.chat",
        title: "prompts.chat (formerly Awesome ChatGPT Prompts)",
        description: "Thousands of community prompts for roles and tasks. Good for ideas; adapt them to your own work.",
        level: "Beginner",
        stars: "178k",
      },
    ],
  },
  {
    id: "cookbooks",
    title: "Recipes and example apps",
    intro: "Working examples to copy from once you're ready to build something.",
    repos: [
      {
        repo: "anthropics/claude-cookbooks",
        title: "Claude cookbooks",
        description: "Short, practical recipes for Claude: tool use, documents, images, agents and more.",
        level: "Intermediate",
        stars: "55k",
        note: "Running the code needs an API key and credits.",
      },
      {
        repo: "openai/openai-cookbook",
        title: "OpenAI cookbook",
        description: "Examples and guides for building with OpenAI models, from basic calls to agents.",
        level: "Intermediate",
        stars: "77k",
        note: "Running the code needs an API key and credits.",
      },
      {
        repo: "google-gemini/cookbook",
        title: "Gemini cookbook",
        description: "Guides and notebooks for the Gemini API, many of which run in Google Colab.",
        level: "Intermediate",
        stars: "18k",
        note: "The Gemini API has a free tier with usage limits.",
      },
      {
        repo: "Shubhamsaboo/awesome-llm-apps",
        title: "Awesome LLM Apps",
        description: "100+ small, complete AI apps and agents to run, read and remix.",
        level: "Intermediate",
        stars: "146k",
      },
    ],
  },
  {
    id: "local",
    title: "Run AI on your own computer",
    intro: "Free, private and offline once set up. You need a reasonably recent laptop.",
    repos: [
      {
        repo: "ollama/ollama",
        title: "Ollama",
        description: "The easiest way to download and run open models like Gemma, Qwen and Llama on your laptop.",
        level: "Beginner",
        stars: "188k",
      },
      {
        repo: "open-webui/open-webui",
        title: "Open WebUI",
        description: "A ChatGPT-style chat window for models running on your own computer through Ollama.",
        level: "Intermediate",
        stars: "159k",
      },
      {
        repo: "Comfy-Org/ComfyUI",
        title: "ComfyUI",
        description: "Generate images on your own computer with a node-based editor. Free, but a graphics card helps a lot.",
        level: "Advanced",
        stars: "148k",
      },
    ],
  },
  {
    id: "build",
    title: "Automate and build",
    intro: "Tools and building blocks for the automation and website modules of the course.",
    repos: [
      {
        repo: "n8n-io/n8n",
        title: "n8n",
        description: "The workflow automation tool used in module 4. The self-hosted Community Edition is free.",
        level: "Beginner",
        stars: "212k",
        note: "Uses n8n's Sustainable Use License, not a standard open-source licence.",
      },
      {
        repo: "public-apis/public-apis",
        title: "Public APIs",
        description: "A huge list of free APIs (weather, news, finance, maps) to plug into your automations.",
        level: "Beginner",
        stars: "501k",
      },
      {
        repo: "modelcontextprotocol/servers",
        title: "MCP reference servers",
        description: "Official example servers that connect AI assistants to files, Git, the web and more.",
        level: "Intermediate",
        stars: "92k",
      },
      {
        repo: "punkpeye/awesome-mcp-servers",
        title: "Awesome MCP servers",
        description: "A community list of MCP servers for hundreds of apps. Only install ones you trust.",
        level: "Intermediate",
        stars: "98k",
      },
      {
        repo: "shadcn-ui/ui",
        title: "shadcn/ui",
        description: "Free, good-looking website components that AI coding tools know how to use well.",
        level: "Intermediate",
        stars: "129k",
      },
      {
        repo: "google-gemini/gemini-cli",
        title: "Gemini CLI",
        description: "An AI agent in your terminal that can read and change files in a project.",
        level: "Intermediate",
        stars: "109k",
        note: "Free to install. Usage limits depend on your Google account; check them before relying on it.",
      },
    ],
  },
  {
    id: "deeper",
    title: "Go deeper",
    intro: "For when you want to understand how the models themselves work. Expect some maths and Python.",
    repos: [
      {
        repo: "karpathy/nn-zero-to-hero",
        title: "Neural Networks: Zero to Hero",
        description: "Andrej Karpathy's lecture series, building neural networks and a small GPT from scratch.",
        level: "Advanced",
        stars: "26k",
      },
      {
        repo: "rasbt/LLMs-from-scratch",
        title: "Build a Large Language Model (From Scratch)",
        description: "Code for building a ChatGPT-like model step by step in PyTorch.",
        level: "Advanced",
        stars: "109k",
        note: "The code is free; the book it accompanies is paid.",
      },
      {
        repo: "mlabonne/llm-course",
        title: "LLM Course",
        description: "Roadmaps and free Colab notebooks covering how language models are built, tuned and deployed.",
        level: "Advanced",
        stars: "85k",
      },
      {
        repo: "microsoft/ML-For-Beginners",
        title: "ML for Beginners",
        description: "26 lessons of classic machine learning, the foundation under today's AI.",
        level: "Intermediate",
        stars: "92k",
      },
    ],
  },
];

export const allRepos = repoGroups.flatMap((g) => g.repos);

/* ------------------------------------------------------------------ */
/* Prompt libraries. Original prompts; [square brackets] are blanks.   */
/* ------------------------------------------------------------------ */

export type Prompt = {
  id: string;
  title: string;
  /** When to reach for it */
  useFor: string;
  prompt: string;
  tip?: string;
};

export type PromptGroup = { id: string; title: string; prompts: Prompt[] };

export const websitePromptGroups: PromptGroup[] = [
  {
    id: "pages",
    title: "Build a page",
    prompts: [
      {
        id: "portfolio",
        title: "Personal portfolio",
        useFor: "A simple site about you, for job hunting or freelancing.",
        prompt: `Build a single-page personal website for me as one HTML file with the CSS inside it. No frameworks.

About me:
- Name: [your name]
- What I do, in one line: [e.g. marketing analyst in Pune who automates reports with AI]
- Three projects or achievements: [project 1], [project 2], [project 3]
- Contact: [email or LinkedIn URL]

Sections: a hero with my name and one-line pitch, a short About (three sentences), projects as cards, and a contact section.
Style: [calm and minimal / bold and colourful]. It must read well on phones, have good colour contrast and use system fonts.
Write the copy in a warm, plain voice. Don't invent facts about me: where you need something I haven't given, leave a clearly marked placeholder.`,
        tip: "Ask for one HTML file. It's the easiest thing to preview and to publish on GitHub Pages.",
      },
      {
        id: "local-business",
        title: "Small business landing page",
        useFor: "A café, salon, tuition class, clinic or shop.",
        prompt: `Create a one-page website for a small business as a single HTML file with the CSS inside it.

Business: [name], a [type of business] in [area, city].
What makes it worth visiting: [2–3 points]
Opening hours: [hours]
Phone / WhatsApp: [number]
Address and Google Maps link: [address] [maps link]
Prices for the top items or services, in ₹: [list]

Sections: hero with a clear call to action ("Call now" or "Message on WhatsApp"), what we offer, prices, reviews (leave three placeholder slots; don't write fake reviews), hours and location, footer.
Make it fast and phone-first: most visitors will come from Google Maps on a phone.`,
        tip: "Never let AI write customer reviews for you. Add real ones later.",
      },
      {
        id: "waitlist",
        title: "Product launch or waitlist page",
        useFor: "Testing an idea before you build it.",
        prompt: `Write and build a launch page for [product name], which helps [who] to [do what] without [pain they have today].

Include: a headline under 10 words, a one-sentence subheading, three benefits (not features), a short "how it works" in three steps, an FAQ with four likely objections, and a sign-up form.
For the form, use a plain HTML form whose action is [your Google Form or free form-service URL]; don't write any backend code.
Give me the copy first so I can edit it, then the full HTML file with the CSS inside it.`,
        tip: "Collecting emails means you're handling personal data. Say what you'll use it for, right next to the form.",
      },
      {
        id: "event",
        title: "Event or workshop page",
        useFor: "A meetup, workshop, webinar or class.",
        prompt: `Make a single-page website for an event as one HTML file with the CSS inside it.

Event: [title]
Date and time (with time zone): [date, time IST]
Where: [venue address or online link]
Who it's for: [audience]
What attendees will learn or get: [3–5 points]
Speakers: [names and one-line bios]
Price: [free / ₹ amount]
Registration link: [URL]

Put the date, place and register button where they're visible without scrolling on a phone. Add an "Add to Google Calendar" link built from the details above.`,
      },
      {
        id: "menu",
        title: "Menu or price list",
        useFor: "Restaurants, cloud kitchens, salons, repair shops.",
        prompt: `Turn this menu into a clean, mobile-friendly web page (one HTML file, CSS inside).

[paste your menu: item, price in ₹, short description, veg / non-veg]

Group items into sections with a sticky section list at the top. Mark veg and non-veg clearly with the standard green and red symbols. Keep prices right-aligned. Add a "Order on WhatsApp" button that opens [WhatsApp number] with a pre-filled message.`,
      },
      {
        id: "pricing",
        title: "Pricing page",
        useFor: "Freelancers and small SaaS products with plans.",
        prompt: `Design a pricing section for [product or service] with three plans: [plan 1: price, what's included], [plan 2: …], [plan 3: …].

Highlight the plan most people should pick. Show prices in ₹ per month, with a yearly toggle that shows the yearly price [or: no yearly option].
Under the plans, add a comparison table and a short FAQ answering: can I cancel, what payment methods, is GST included.
Output one HTML file with the CSS and a few lines of JavaScript inside it.`,
      },
    ],
  },
  {
    id: "improve",
    title: "Improve what you have",
    prompts: [
      {
        id: "review",
        title: "Review for phones and accessibility",
        useFor: "Before you share a page AI made for you.",
        prompt: `Review this web page for three things: how it works on a 375px-wide phone, accessibility (contrast, headings, alt text, keyboard use, form labels), and page speed.

First list every problem you find, most serious first, with the line it's on. Then give me the full corrected file. Don't change the design or the wording unless a fix requires it.

[paste your HTML and CSS]`,
      },
      {
        id: "copy",
        title: "Rewrite the copy",
        useFor: "When the page works but the words are vague.",
        prompt: `Rewrite the text on this page so a busy visitor understands what it is and what to do within five seconds.

Audience: [who visits]
The one action I want them to take: [action]
Tone: [friendly / professional / playful], plain English, no buzzwords, short sentences.

Keep the same sections. For each, give me the old text and your new text side by side, then explain your three most important changes.

[paste your page text or HTML]`,
      },
      {
        id: "screenshot",
        title: "Turn a sketch or screenshot into a page",
        useFor: "You've drawn a layout, or found one you like.",
        prompt: `I've attached [a sketch / a screenshot] of a page layout. Recreate the layout as one HTML file with the CSS inside it.

Match the structure, spacing and hierarchy, but use my own content below instead of any text or images in the picture, and don't copy logos or brand names from it.

My content: [headline, sections, text]
Colours: [colours, or "pick a palette that suits a [type] business"]`,
        tip: "Use references for structure, not for copying someone else's design or brand.",
      },
      {
        id: "seo",
        title: "Search and share previews",
        useFor: "So the page looks right on Google and WhatsApp.",
        prompt: `Add search and social-sharing tags to this page: a title under 60 characters, a meta description under 155 characters, Open Graph and X (Twitter) card tags, and a favicon link.

The page is about: [one sentence]
Its address will be: [URL]
The preview image will be at: [image URL, 1200×630]

Explain each tag in one line, then give me the updated <head>.

[paste your HTML]`,
      },
    ],
  },
  {
    id: "ship",
    title: "Publish it",
    prompts: [
      {
        id: "github-pages",
        title: "Publish free on GitHub Pages",
        useFor: "Getting a public link for a one-file site.",
        prompt: `I have a website as a single file called index.html. Walk me through publishing it for free on GitHub Pages, assuming I've never used GitHub.

Give me numbered steps, one action each, and tell me what I should see on screen after each step. Use only the GitHub website (no command line). At the end, tell me my site's address and how to update it later.`,
      },
      {
        id: "debug",
        title: "Fix something that's broken",
        useFor: "When the page doesn't look or behave as expected.",
        prompt: `Something's wrong with my web page.

What I expected: [what should happen]
What actually happens: [what you see instead]
Where: [browser and phone or laptop]
Error messages, if any: [paste them]

Here's the code: [paste it]

Explain the cause in plain language first, then show only the lines that need to change.`,
      },
    ],
  },
];

export const imagePromptGroups: PromptGroup[] = [
  {
    id: "business",
    title: "For your business",
    prompts: [
      {
        id: "product-photo",
        title: "Product photo",
        useFor: "Clean product shots for a shop page or catalogue.",
        prompt: `A studio product photo of [product, with material, colour and size], placed on [surface, e.g. a light oak table], against a [plain off-white] background.
Soft daylight from the left, gentle shadow, shot at eye level with a 50mm lens look, sharp focus on the product.
Minimal, premium feel. No text, no logos, no hands. Square format.`,
        tip: "AI can change product details. For real listings, edit a photo of your actual product instead of inventing one.",
      },
      {
        id: "edit-own-photo",
        title: "Clean up your own photo",
        useFor: "Profile pictures and team photos.",
        prompt: `Using the photo I've attached of me, keep my face, features and skin tone exactly as they are.
Replace the background with [a soft grey studio backdrop / a blurred modern office], even out the lighting, and tidy stray hairs.
Keep it natural: no smoothing, slimming or changes to my appearance. Crop to a [square / 4:5] head-and-shoulders frame.`,
        tip: "Only edit photos of yourself, or of people who've said yes.",
      },
      {
        id: "logo-directions",
        title: "Logo directions",
        useFor: "Exploring ideas before you commit to a logo.",
        prompt: `Show six different logo directions for [business name], a [what it does] for [audience].
Personality: [three words, e.g. trustworthy, warm, modern].
Mix approaches: a wordmark, a lettermark from the initials, a simple symbol based on [an idea from the business], and an emblem.
Flat vector style, one or two colours each, on white. Make the name spelled exactly "[business name]". Present them as a 3×2 grid with a number under each.`,
        tip: "Treat results as sketches. Check a final logo isn't similar to an existing trademark before you use it.",
      },
      {
        id: "mockup",
        title: "App or website mockup",
        useFor: "Showing a design in context for a pitch or post.",
        prompt: `A clean mockup of a smartphone [and a laptop] at a slight angle on a [desk / plain coloured] background, showing the screen I've attached.
Keep my screen exactly as it is: don't redraw or change its text. Soft shadows, realistic reflections, plenty of empty space around the devices. [16:9] format.`,
      },
    ],
  },
  {
    id: "social",
    title: "For social and video",
    prompts: [
      {
        id: "instagram",
        title: "Social post with a headline",
        useFor: "Instagram or LinkedIn posts that carry text.",
        prompt: `A social media graphic, [square 1:1 / portrait 4:5].
Headline, spelled exactly: "[your headline, under 8 words]"
Style: [bold flat illustration / clean editorial photo / hand-drawn doodles], colours [your brand colours].
Layout: headline large in the top third, a simple supporting illustration of [subject] below, lots of breathing room. Leave the bottom 10% empty for my handle.`,
        tip: "Keep headlines short. Image models still misspell long text, so check every letter.",
      },
      {
        id: "thumbnail",
        title: "YouTube thumbnail",
        useFor: "Thumbnails that read at a tiny size.",
        prompt: `A YouTube thumbnail, 16:9, for a video titled "[video title]".
One clear focal subject: [subject]. Bold contrast, simple background in [colour], at most 3 words of text: "[TEXT]", very large, high contrast.
It must still be readable at 160px wide. No clutter, no small details.`,
      },
      {
        id: "poster",
        title: "Event poster",
        useFor: "Workshops, college fests, community events.",
        prompt: `An event poster, A4 portrait.
Title, spelled exactly: "[event name]"
Details: [date] · [time] · [venue]
Mood: [energetic / calm / professional], inspired by [e.g. Indian block-print patterns / Swiss modernist posters], colours [colours].
Clear hierarchy: title biggest, then date, then venue. Leave a blank square at the bottom right for a QR code.`,
      },
      {
        id: "storyboard",
        title: "Storyboard for a short video",
        useFor: "Planning a reel or explainer before you shoot.",
        prompt: `Create a 6-panel storyboard in a 3×2 grid for a [30-second reel] about [topic].
Simple, consistent sketch style, black ink with one accent colour.
Panel by panel: 1) [hook], 2) [problem], 3) [turn], 4) [solution], 5) [result], 6) [call to action].
Number each panel and add a one-line caption under it.`,
      },
    ],
  },
  {
    id: "design",
    title: "For websites and slides",
    prompts: [
      {
        id: "hero",
        title: "Website hero illustration",
        useFor: "The big image at the top of a landing page.",
        prompt: `A wide hero illustration for a website about [topic], 16:9.
Style: [flat vector with soft grain / isometric 3D / editorial collage], limited palette of [colours] on a [background colour].
Show [scene, e.g. a small shop owner relaxing while tasks complete on a laptop]. Keep the left third calm and empty so a headline can sit there. No text.`,
      },
      {
        id: "icons",
        title: "Matching icon set",
        useFor: "Feature lists and dashboards.",
        prompt: `A set of 8 matching icons in a 4×2 grid on white: [list the 8 things, e.g. calendar, invoice, chat, chart…].
Line style, 2px rounded strokes, one accent colour [colour], same size and visual weight, generous padding, no text.`,
        tip: "For a website, ask for the same set again as separate images, or redraw your favourites as SVG.",
      },
      {
        id: "infographic",
        title: "Simple infographic",
        useFor: "Explaining a process in one picture.",
        prompt: `A clean infographic explaining [process] in [4] steps, vertical layout, [colours].
Step titles, spelled exactly: 1) "[step 1]", 2) "[step 2]", 3) "[step 3]", 4) "[step 4]".
One simple icon per step, numbered circles joined by a line, lots of white space. Text short and large.`,
        tip: "Double-check numbers and facts. Images can't cite sources, so put the data source in your caption.",
      },
      {
        id: "pattern",
        title: "Seamless background pattern",
        useFor: "Backgrounds for slides, packaging or a website.",
        prompt: `A seamless, tileable pattern of [motifs, e.g. small leaves and dots], [colours], subtle and low-contrast so text can sit on top. Flat style, even spacing, no text. Square.`,
      },
    ],
  },
];

/** The formula behind the image prompts, shown at the top of that page. */
export const imagePromptFormula: [string, string][] = [
  ["Subject", "What's in the picture, specifically: materials, colours, how many."],
  ["Style", "Photo, flat illustration, 3D, watercolour, collage: name one."],
  ["Composition", "Where things sit, the camera angle, what stays empty."],
  ["Light and colour", "Soft daylight, studio light, a palette of two or three colours."],
  ["Text", "Exact words in quotes, kept short, or say \"no text\"."],
  ["Format", "Square, 4:5, 16:9 or A4, and what it's for."],
];

/** Free places to try the image prompts. Free limits change often. */
export const imageTools: { name: string; url: string; note: string }[] = [
  { name: "ChatGPT", url: "https://chatgpt.com/", note: "Image generation and editing; the free plan has a small daily limit." },
  { name: "Google Gemini", url: "https://gemini.google.com/", note: "Image generation and editing with a free Google account, within limits." },
  { name: "Microsoft Designer", url: "https://designer.microsoft.com/", note: "Free with a Microsoft account; good for social posts." },
  { name: "Ideogram", url: "https://ideogram.ai/", note: "Strong at text inside images; a limited free tier." },
];

/** Free places to try the website prompts. */
export const websiteTools: { name: string; url: string; note: string }[] = [
  { name: "Claude", url: "https://claude.ai/", note: "Shows the page live next to the chat as an artifact." },
  { name: "Google AI Studio", url: "https://aistudio.google.com/", note: "Free to use; can build and preview small apps." },
  { name: "ChatGPT", url: "https://chatgpt.com/", note: "Use Canvas to see and edit the code." },
  { name: "GitHub Pages", url: "https://pages.github.com/", note: "Free hosting once your file is ready." },
];
