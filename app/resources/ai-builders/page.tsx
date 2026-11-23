import type { Metadata } from "next";
import { ArrowUpRight, Check, TriangleAlert } from "lucide-react";
import { BrandLogo, logos } from "@/components/brand-logo";
import { PromptCard } from "@/components/resources/prompt-card";
import { builderPicker, builderPromptGroups, builders, buildersCheckedOn, vercelResources } from "@/lib/builders";

export const metadata: Metadata = {
  alternates: { canonical: "/resources/ai-builders" },
  title: "AI app builders: v0, Lovable, Bolt, Figma Make — Zero to ₹0",
  description:
    "Build websites and apps by describing them. What v0, Lovable, Bolt and Figma Make do, what their free plans include, and free Vercel hosting and courses.",
};

export default function AiBuildersPage() {
  return (
    <>
      <span className="block text-[10px] font-extrabold tracking-[1.6px]">FREE RESOURCES · AI APP BUILDERS</span>
      <h1 className="mt-4 max-w-[800px] text-[52px] leading-[1.05] tracking-[-2px] max-md:text-[36px] max-md:tracking-[-1.2px]">
        Describe an app. Get a working one.
      </h1>
      <p className="max-w-[660px] text-[16px] leading-[1.7] text-muted">
        AI app builders turn a written description into a real website or app you can click through, share and keep
        improving. These four all have free plans. Each runs on limited credits, so the prompts further down are written to
        make every message count.
      </p>

      {/* Picker */}
      <section aria-labelledby="picker-title" className="mt-10 rounded-[11px] border border-ink bg-[#fffef9] p-6 max-md:p-5">
        <h2 id="picker-title" className="text-[24px] tracking-[-0.8px]">
          Which one should I use?
        </h2>
        <ul className="mt-4 mb-0 grid list-none gap-2 p-0">
          {builderPicker.map(([want, pick]) => (
            <li key={pick} className="flex items-baseline justify-between gap-4 border-b border-dashed border-[#b9b0a5] pb-2 text-[14px] last:border-0 last:pb-0">
              <span>{want}</span>
              <a href={`#${builders.find((b) => b.name === pick)?.id}`} className="shrink-0 font-bold underline-offset-4 hover:underline">
                {pick} →
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Builders */}
      <ul className="mt-10 grid list-none grid-cols-2 gap-4 p-0 max-xl:grid-cols-1">
        {builders.map((b) => (
          <li key={b.id} id={b.id} className="flex scroll-mt-28 flex-col rounded-[11px] border border-line bg-[#fffef9] p-6 max-md:p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-[10px] border border-line bg-paper">
                <BrandLogo logo={logos[b.logo]} size={24} />
              </span>
              <div>
                <h2 className="text-[26px] leading-none tracking-[-0.8px]">{b.name}</h2>
                <span className="text-[12px] text-muted">by {b.maker}</span>
              </div>
            </div>
            <p className="mt-4 mb-0 text-[14px] font-semibold leading-[1.55]">{b.bestFor}</p>
            <p className="mt-2 mb-0 text-[14px] leading-[1.6] text-muted">{b.whatItDoes}</p>

            <h3 className="mt-5 text-[11px] font-extrabold tracking-[1.2px] uppercase">Free plan</h3>
            <ul className="mt-2 mb-0 grid list-none gap-1.5 p-0">
              {b.freePlan.map((f) => (
                <li key={f} className="flex gap-2 text-[13px] leading-[1.5]">
                  <Check size={15} className="mt-0.5 shrink-0 text-[#728966]" aria-hidden /> {f}
                </li>
              ))}
            </ul>
            <p className="mt-4 mb-0 flex gap-2 rounded-[8px] bg-paper p-3 text-[13px] leading-[1.55]">
              <TriangleAlert size={15} className="mt-0.5 shrink-0 text-[#a46714]" aria-hidden />
              <span>{b.watchOut}</span>
            </p>

            <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5 text-[13px] font-bold">
              <a href={b.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-[8px] bg-ink px-3.5 py-2 text-paper">
                Open {b.name} <ArrowUpRight size={14} aria-hidden />
              </a>
              <a href={b.docsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 py-2 underline-offset-4 hover:underline">
                Getting started <ArrowUpRight size={14} aria-hidden />
              </a>
              <a href={b.pricingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 py-2 font-semibold text-muted underline-offset-4 hover:underline">
                Current pricing <ArrowUpRight size={14} aria-hidden />
              </a>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[12px] text-muted">
        Free plans checked on each official pricing page on {buildersCheckedOn}. They change often, so check before you rely on
        one.
      </p>

      {/* Prompts */}
      {builderPromptGroups.map((g) => (
        <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-28 pt-14">
          <h2 id={`${g.id}-title`} className="text-[30px] tracking-[-1px] max-md:text-[26px]">
            {g.title}
          </h2>
          <p className="mt-2 mb-0 max-w-[640px] text-[14px] text-muted">
            Work with any of the four. Fill in the highlighted blanks before you send.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 max-xl:grid-cols-1">
            {g.prompts.map((p) => (
              <PromptCard key={p.id} prompt={p} />
            ))}
          </div>
        </section>
      ))}

      {/* Vercel */}
      <section id="vercel" aria-labelledby="vercel-title" className="scroll-mt-28 pt-14">
        <div className="flex items-center gap-3">
          <BrandLogo logo={logos.vercel} size={22} />
          <h2 id="vercel-title" className="text-[30px] tracking-[-1px] max-md:text-[26px]">
            Free from Vercel
          </h2>
        </div>
        <p className="mt-2 mb-0 max-w-[660px] text-[14px] text-muted">
          Vercel makes v0 and Next.js. Here&apos;s how to put what you build online for free, and its own courses on doing it
          well.
        </p>
        <ul className="mt-6 grid list-none grid-cols-3 gap-4 p-0 max-xl:grid-cols-2 max-md:grid-cols-1">
          {vercelResources.map((r) => (
            <li key={r.url}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col rounded-[11px] border border-line bg-[#fffef9] p-5 transition-[border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-ink"
              >
                <span className="flex items-center gap-2 text-[11px] font-extrabold tracking-[1px] text-muted uppercase">
                  <BrandLogo logo={logos[r.logo]} size={13} /> {r.kind}
                </span>
                <span className="mt-3 flex items-start gap-1.5 text-[16px] leading-[1.35] font-bold">
                  {r.title} <ArrowUpRight size={15} className="mt-0.5 shrink-0" aria-hidden />
                </span>
                <span className="mt-2 text-[13px] leading-[1.6] text-muted">{r.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
