"use client";

import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, ShieldCheck } from "lucide-react";
import { channelSearchUrl, channels, modules } from "@/lib/content";
import { usePractice } from "./practice-store";
import { Eyebrow, cx } from "./ui";

const tagFor = (i: number) => (i === 0 ? "START HERE" : i > 2 ? "BUILD SOMETHING" : "GET PRACTICAL");

export function LearnModules() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { completed, toggle } = usePractice(modules.length);

  return (
    <section id="learn" className="section-y wrap">
      <div className="mb-[35px] flex items-end justify-between gap-[30px] max-md:flex-col max-md:items-start max-md:gap-[22px]">
        <div>
          <Eyebrow>WHAT YOU&apos;LL LEARN</Eyebrow>
          <h2 className="text-[40px] max-md:text-[34px] max-md:tracking-[-1.2px]">
            Five modules.
            <br />
            <em>Zero course fee.</em> Actual homework.
          </h2>
        </div>
        <div className="min-w-[225px] pb-[5px] text-right text-[10px] font-semibold max-md:w-full max-md:text-left">
          <span>{completed.length}/5 practice tasks complete</span>
          <div className="my-2.5 h-1 overflow-hidden rounded-[10px] bg-line">
            <div
              className="h-full bg-[#938221] transition-[width] duration-300"
              style={{ width: `${completed.length * 20}%` }}
            />
          </div>
          <small className="text-[9px] font-normal text-muted">Saved in this browser. No account needed.</small>
        </div>
      </div>

      <div className="border-t border-line">
        {modules.map((m, i) => {
          const isOpen = expanded === i;
          const isDone = completed.includes(i);
          return (
            <article key={m.title} className="border-b border-line">
              <button
                type="button"
                className="flex w-full items-center gap-[25px] border-0 bg-transparent px-[7px] py-[25px] text-left text-ink hover:bg-[#f9f2e5] max-md:gap-[13px] max-md:px-0 max-md:py-[23px]"
                onClick={() => setExpanded(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="w-10 shrink-0 font-serif text-[26px] leading-[normal] font-normal text-[#9f917b] max-md:w-[27px] max-md:text-[22px]">
                  {isDone ? <Check /> : `0${i + 1}`}
                </span>
                <div>
                  <h3 className="text-[19px] max-md:text-[17px]">{m.title}</h3>
                  <p className="mt-1.5 mb-0 text-[12px] leading-[1.6] text-muted max-md:text-[10px]">{m.description}</p>
                </div>
                <span
                  className={cx(
                    "ml-auto rounded-[4px] border px-2 py-[5px] text-[8px] tracking-[1px] whitespace-nowrap max-md:hidden",
                    i === 0 ? "border-[#e9d774] bg-[#fff3b0]" : "border-line",
                  )}
                >
                  {tagFor(i)}
                </span>
                <ChevronDown size={21} className={cx("ml-[13px] shrink-0 max-md:ml-auto", isOpen && "rotate-180")} />
              </button>

              {isOpen && (
                <div className="grid grid-cols-[1.4fr_1fr] gap-[65px] pt-[15px] pr-12 pb-[30px] pl-[72px] max-md:grid-cols-1 max-md:gap-[25px] max-md:pt-[7px] max-md:pr-0 max-md:pb-[25px] max-md:pl-10">
                  <div>
                    <Eyebrow size="text-[9px] mb-3">YOUR PRACTICE TASK</Eyebrow>
                    <p className="mt-0 mb-[18px] text-[13px]">{m.exercise}</p>
                    <div className="flex items-start gap-2 text-[10px] text-muted">
                      <ShieldCheck size={16} className="shrink-0" />
                      <span>{m.note}</span>
                    </div>
                    <button
                      type="button"
                      className={cx(
                        "mt-[18px] flex items-center gap-2 rounded-[5px] border px-[13px] py-[9px] text-[10px]",
                        isDone ? "border-[#728966] bg-[#e4ebdf]" : "border-[#9c9284] bg-transparent",
                      )}
                      onClick={() => toggle(i)}
                    >
                      <Check size={16} />
                      {isDone ? "Practice complete · undo" : "Mark practice complete"}
                    </button>
                  </div>
                  <div>
                    <Eyebrow size="text-[9px] mb-3">LEARN FROM</Eyebrow>
                    <div className="mb-[15px] flex flex-col gap-2">
                      {channels
                        .filter((c) => m.handles.includes(c.handle))
                        .map((c) => (
                          <a
                            key={c.handle}
                            href={channelSearchUrl(c)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex justify-between border-b border-line pb-[7px] text-[12px]"
                          >
                            {c.name}
                            <ArrowUpRight size={15} />
                          </a>
                        ))}
                    </div>
                    <small className="text-muted">{m.tags}</small>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
      <p className="mt-[19px] mb-0 text-[10px] leading-[1.6] text-muted">
        Self-reported practice, not a qualification. Advanced projects may require coding, hosting, or API fees.
      </p>
    </section>
  );
}
