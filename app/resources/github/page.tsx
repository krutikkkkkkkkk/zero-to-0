import type { Metadata } from "next";
import { ArrowUpRight, Star } from "lucide-react";
import { BrandLogo, logos } from "@/components/brand-logo";
import { cx } from "@/components/ui";
import { allRepos, repoGroups, resourcesCheckedOn, type RepoLevel } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Free AI GitHub repos for beginners — Zero to ₹0",
  description: `${allRepos.length} free GitHub repositories for learning AI: full courses, prompting guides, example apps, local AI and automation.`,
};

const levelStyle: Record<RepoLevel, string> = {
  Beginner: "border-[#728966] bg-[#e4ebdf]",
  Intermediate: "border-[#e9d774] bg-[#fff3b0]",
  Advanced: "border-[#c9b8a6] bg-[#f1e7dc]",
};

export default function GithubReposPage() {
  return (
    <>
      <span className="block text-[10px] font-extrabold tracking-[1.6px]">FREE RESOURCES · GITHUB REPOS</span>
      <h1 className="mt-4 max-w-[760px] text-[52px] leading-[1.05] tracking-[-2px] max-md:text-[36px] max-md:tracking-[-1.2px]">
        Free AI repos worth starring.
      </h1>
      <p className="max-w-[640px] text-[16px] leading-[1.7] text-muted">
        {allRepos.length} GitHub repositories, picked for people starting out: full courses, prompting guides, working
        examples, and tools that run AI on your own computer. Each is labelled with its level, and anything that costs money
        is called out.
      </p>
      <p className="max-w-[640px] text-[13px] text-muted">
        You don&apos;t need to know Git to use these. Most are readable right on GitHub; press <strong>Star</strong> to
        bookmark one. Star counts and activity checked {resourcesCheckedOn}.
      </p>

      <nav aria-label="Repo groups" className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-y border-line py-3 text-[13px] font-semibold">
        {repoGroups.map((g) => (
          <a key={g.id} href={`#${g.id}`} className="underline-offset-[5px] hover:underline">
            {g.title} <span className="font-normal text-muted">({g.repos.length})</span>
          </a>
        ))}
      </nav>

      {repoGroups.map((g) => (
        <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-28 pt-12">
          <h2 id={`${g.id}-title`} className="text-[30px] tracking-[-1px] max-md:text-[26px]">
            {g.title}
          </h2>
          <p className="mt-2 mb-0 max-w-[640px] text-[14px] text-muted">{g.intro}</p>
          <ul className="mt-6 grid list-none grid-cols-3 gap-4 p-0 max-xl:grid-cols-2 max-md:grid-cols-1">
            {g.repos.map((r) => (
              <li key={r.repo}>
                <a
                  href={`https://github.com/${r.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col rounded-[11px] border border-line bg-[#fffef9] p-5 transition-[border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-ink"
                >
                  <span className="flex items-center gap-2 text-[12px] text-muted">
                    <BrandLogo logo={logos.github} size={14} />
                    <span className="truncate">{r.repo}</span>
                  </span>
                  <span className="mt-3 flex items-start gap-1.5 text-[16px] leading-[1.35] font-bold">
                    {r.title} <ArrowUpRight size={15} className="mt-0.5 shrink-0" aria-hidden />
                  </span>
                  <span className="mt-2 text-[13px] leading-[1.6] text-muted">{r.description}</span>
                  {r.note && (
                    <span className="mt-3 rounded-[6px] bg-paper px-2.5 py-1.5 text-[12px] leading-[1.5]">{r.note}</span>
                  )}
                  <span className="mt-auto flex items-center gap-3 pt-4 text-[11px]">
                    <span
                      className={cx(
                        "rounded-[4px] border px-1.5 py-0.5 font-extrabold tracking-[0.6px] text-[#1c1917] uppercase",
                        levelStyle[r.level],
                      )}
                    >
                      {r.level}
                    </span>
                    <span className="flex items-center gap-1 text-muted">
                      <Star size={12} aria-hidden /> {r.stars}
                      <span className="sr-only"> stars</span>
                    </span>
                  </span>
                  <span className="sr-only">(opens GitHub in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
