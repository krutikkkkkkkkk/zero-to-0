"use client";

import { useState } from "react";
import { ArrowUpRight, Search, ShieldCheck, X } from "lucide-react";
import { type CategoryFilter, categories, channelUrl, channels } from "@/lib/content";
import { Eyebrow, buttonBase, buttonSize, cx } from "./ui";

export function ResourceDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All resources");

  const q = query.toLowerCase();
  const results = channels.filter(
    (c) =>
      (category === "All resources" || c.category === category) &&
      `${c.name} ${c.description} ${c.topics}`.toLowerCase().includes(q),
  );

  return (
    <section id="resources" className="section-y border-y border-line bg-[#f5f0e6]">
      <div className="wrap">
        <div className="mb-[15px] flex items-end justify-between gap-[30px] max-md:flex-col max-md:items-start max-md:gap-[22px]">
          <div>
            <Eyebrow>YOUR TEACHERS</Eyebrow>
            <h2 className="text-[38px] max-md:text-[34px] max-md:tracking-[-1.2px]">
              The people who made the videos.
              <br />
              <em>Not the person collecting the links.</em>
            </h2>
          </div>
          <span className="text-right text-[11px] whitespace-nowrap max-md:text-left">
            12 channels
            <br />
            <b className="text-[9px] font-normal text-muted">₹0 to watch public videos</b>
          </span>
        </div>

        <p className="mt-[18px] mb-[30px] max-w-[660px] text-[13px] text-muted">
          Give creators the views and credit. Start with one channel, one tutorial, and one deliverable. Their optional
          paid offers are separate.
        </p>

        <div className="mb-[25px] flex items-center justify-between gap-5 max-xl:flex-wrap max-md:gap-[15px]">
          <div className="flex flex-wrap gap-1" aria-label="Filter resources">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cx(
                  "rounded-[5px] border border-transparent px-[11px] py-2 text-[10px] hover:border-[#9c9284] max-md:px-[9px] max-md:py-[7px] max-md:text-[9px]",
                  category === c ? "bg-ink text-paper" : "bg-transparent text-muted",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="flex min-w-[235px] items-center gap-2 rounded-[6px] border border-[#d5cdbc] bg-paper px-3 py-[9px] max-xl:w-full">
            <Search size={17} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a tool or creator..."
              aria-label="Search resources"
              className="w-full min-w-0 border-0 bg-transparent text-[10px] text-ink outline-none"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="flex border-0 bg-transparent">
                <X size={15} />
              </button>
            )}
          </label>
        </div>

        <div className="grid grid-cols-3 gap-[17px] max-md:grid-cols-2 max-md:gap-3 max-xs:grid-cols-1">
          {results.map((c) => (
            <article
              key={c.handle}
              className="flex flex-col rounded-[11px] border border-[#e1d9ca] bg-paper p-[23px] transition-[translate,border-color] duration-200 hover:-translate-y-[3px] hover:border-[#b9ac91] max-xl:p-[19px] max-md:px-[14px] max-md:py-[17px]"
            >
              <div className="mb-[18px] flex items-center justify-between max-md:mb-[13px] max-md:flex-wrap max-md:gap-2.5 max-xs:flex-nowrap">
                <span
                  className="flex size-[43px] items-center justify-center rounded-full font-serif text-[20px] tracking-[-1px]"
                  style={{ background: c.color }}
                >
                  {c.initials}
                </span>
                <span className="rounded-[20px] border border-line px-2 py-[3px] text-[8px] text-muted max-md:text-[7px]">
                  {c.level}
                </span>
              </div>
              <h3 className="text-[17px] max-md:text-[15px] max-xs:text-[18px]">{c.name}</h3>
              <p className="mt-2.5 mb-[17px] flex-1 text-[11px] leading-[1.8] text-muted max-md:text-[10px] max-xs:text-[12px]">
                {c.description}
              </p>
              <span className="mb-[18px] text-[8px] leading-[1.8] font-semibold text-[#736854] max-md:text-[7px] max-xs:text-[9px]">
                {c.topics}
              </span>
              <a
                href={channelUrl(c)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border-t border-line pt-[13px] text-[10px] font-bold max-md:gap-2 max-md:text-[9px] max-xs:text-[11px]"
              >
                Visit YouTube channel <ArrowUpRight size={17} />
              </a>
            </article>
          ))}
        </div>

        {results.length === 0 && (
          <div className="border border-dashed border-line p-[50px] text-center">
            <h3>No channels match that search.</h3>
            <p>Try “Claude”, “Python”, or reset the filters.</p>
            <button
              type="button"
              className={cx(buttonBase, buttonSize)}
              onClick={() => {
                setCategory("All resources");
                setQuery("");
              }}
            >
              Show all resources
            </button>
          </div>
        )}

        <div className="mt-[25px] flex items-start gap-3">
          <ShieldCheck size={18} className="mt-0.5 shrink-0" />
          <p className="m-0 text-[10px] leading-[1.8] text-muted">
            <strong className="text-ink">Free to watch ≠ free to copy.</strong> Videos belong to their creators. Link to
            originals or use permitted embeds. Tools, hosting, and APIs may cost money. Channels are not affiliated with
            this parody.
          </p>
        </div>

        <a
          className="mt-[30px] flex items-center justify-between gap-6 border-t border-[#d5cdbc] pt-7 max-md:flex-col max-md:items-start"
          href="https://www.youtube.com/watch?v=nJ25yl34Uqw"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            <Eyebrow size="text-[8px] mb-2">WANT A LONG-FORM COURSE?</Eyebrow>
            <h3 className="text-[17px]">GenAI Essentials — Full Course for Beginners</h3>
            <p className="mt-2 mb-0 text-[10px] text-muted">
              A public video candidate. Check prerequisites; more engineering-focused than everyday AI.
            </p>
          </div>
          <span className="flex items-center gap-[14px] text-[10px] font-bold whitespace-nowrap">
            Watch on YouTube <ArrowUpRight size={20} />
          </span>
        </a>
      </div>
    </section>
  );
}
