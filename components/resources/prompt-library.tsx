import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { PromptGroup } from "@/lib/resources";
import { PromptCard } from "./prompt-card";

/** A prompt library page: intro, where to use the prompts, then grouped prompt cards. */
export function PromptLibrary({
  eyebrow,
  title,
  intro,
  tools,
  groups,
  before,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  tools: { name: string; url: string; note: string }[];
  groups: PromptGroup[];
  before?: ReactNode;
}) {
  const count = groups.reduce((n, g) => n + g.prompts.length, 0);
  return (
    <>
      <span className="block text-[10px] font-extrabold tracking-[1.6px]">{eyebrow}</span>
      <h1 className="mt-4 max-w-[760px] text-[52px] leading-[1.05] tracking-[-2px] max-md:text-[36px] max-md:tracking-[-1.2px]">
        {title}
      </h1>
      <p className="max-w-[640px] text-[16px] leading-[1.7] text-muted">{intro}</p>
      <p className="max-w-[640px] text-[14px] leading-[1.7]">
        {count} prompts. Copy one, replace the{" "}
        <mark className="rounded-[3px] bg-[#fff3b0] px-0.5 text-[#1c1917]">[highlighted blanks]</mark> with your own details,
        and paste it into any of these free tools:
      </p>
      <ul className="mt-4 grid list-none grid-cols-4 gap-3 p-0 max-xl:grid-cols-2 max-xs:grid-cols-1">
        {tools.map((t) => (
          <li key={t.name}>
            <a
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col rounded-[10px] border border-line p-4 transition-colors hover:border-ink"
            >
              <span className="flex items-center gap-1.5 text-[14px] font-bold">
                {t.name} <ArrowUpRight size={14} aria-hidden />
              </span>
              <span className="mt-1 text-[12px] leading-[1.5] text-muted">{t.note}</span>
            </a>
          </li>
        ))}
      </ul>

      {before}

      <nav aria-label="Prompt groups" className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-y border-line py-3 text-[13px] font-semibold">
        {groups.map((g) => (
          <a key={g.id} href={`#${g.id}`} className="underline-offset-[5px] hover:underline">
            {g.title} <span className="font-normal text-muted">({g.prompts.length})</span>
          </a>
        ))}
      </nav>

      {groups.map((g) => (
        <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-28 pt-12">
          <h2 id={`${g.id}-title`} className="text-[30px] tracking-[-1px] max-md:text-[26px]">
            {g.title}
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 max-xl:grid-cols-1">
            {g.prompts.map((p) => (
              <PromptCard key={p.id} prompt={p} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
