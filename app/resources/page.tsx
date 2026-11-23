import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COURSE_HREF } from "@/components/ui";
import { totalLessons } from "@/lib/course";
import { channels } from "@/lib/content";
import { builders } from "@/lib/builders";
import { allRepos, imagePromptGroups, websitePromptGroups } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Free AI resources — Zero to ₹0",
  description: "Free GitHub repos, copy-paste website and image prompts, YouTube channels and a full AI course for beginners.",
};

const count = (groups: { prompts: unknown[] }[]) => groups.reduce((n, g) => n + g.prompts.length, 0);

const cards = [
  {
    href: "/resources/ai-builders",
    kicker: `${builders.length} builders + Vercel`,
    title: "AI app builders",
    text: "v0, Lovable, Bolt and Figma Make: what each is best at, what's free, and free hosting and courses from Vercel.",
  },
  {
    href: "/resources/github",
    kicker: `${allRepos.length} repos`,
    title: "GitHub repos",
    text: "Full courses, prompting guides, example apps and tools that run AI on your own laptop.",
  },
  {
    href: "/resources/website-prompts",
    kicker: `${count(websitePromptGroups)} prompts`,
    title: "Website prompts",
    text: "Build a portfolio, a shop page or a launch page with AI, then publish it for free.",
  },
  {
    href: "/resources/image-prompts",
    kicker: `${count(imagePromptGroups)} prompts`,
    title: "Image prompts",
    text: "Product photos, social posts, thumbnails and posters, plus the formula behind them.",
  },
  {
    href: "/#resources",
    kicker: `${channels.length} channels`,
    title: "Free YouTube channels",
    text: "Channels that teach everyday AI, automation and coding, including in Hindi.",
  },
  {
    href: COURSE_HREF,
    kicker: `${totalLessons} lessons`,
    title: "The free AI course",
    text: "The best free lessons from the people who make the tools, in order, with a project in every module.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <span className="block text-[10px] font-extrabold tracking-[1.6px]">FREE RESOURCES</span>
      <h1 className="mt-4 max-w-[760px] text-[52px] leading-[1.05] tracking-[-2px] max-md:text-[36px] max-md:tracking-[-1.2px]">
        Everything here is free. Take what you need.
      </h1>
      <p className="max-w-[640px] text-[16px] leading-[1.7] text-muted">
        Hand-picked links and copy-paste prompts for people starting out with AI. No sign-up, no email, no upsell.
      </p>
      <ul className="mt-10 grid list-none grid-cols-3 gap-4 p-0 max-xl:grid-cols-2 max-md:grid-cols-1">
        {cards.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="flex h-full flex-col rounded-[11px] border border-line bg-[#fffef9] p-6 transition-[border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-ink"
            >
              <span className="text-[11px] font-extrabold tracking-[1.2px] text-muted uppercase">{c.kicker}</span>
              <span className="mt-3 font-serif text-[26px] leading-[1.15] font-semibold tracking-[-0.8px]">{c.title}</span>
              <span className="mt-2 text-[14px] leading-[1.6] text-muted">{c.text}</span>
              <span className="mt-auto flex items-center gap-2 pt-5 text-[13px] font-bold">
                Open <ArrowRight size={15} aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-[13px] text-muted">
        Know a great free resource for beginners?{" "}
        <a
          href="https://github.com/krutikkkkkkkkk/zero-to-0/issues/new?title=Resource%20suggestion%3A%20"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-ink text-ink"
        >
          Suggest it on GitHub
        </a>
        .
      </p>
    </>
  );
}
