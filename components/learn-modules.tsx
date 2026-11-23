"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, ShieldCheck } from "lucide-react";
import { channelSearchUrl, channels, moduleHomeCopy } from "@/lib/content";
import {
  allLessonIds,
  allProgressIds,
  courseModules,
  projectId,
  totalLessons,
  totalProjects,
} from "@/lib/course";
import { BrandLogo, logoForPublisher } from "./brand-logo";
import { useCourseProgress } from "./course/progress-store";
import { COURSE_HREF as COURSE_URL_PATH, Eyebrow, cx } from "./ui";

/** How many lessons to preview per module before "and N more". */
const PREVIEW = 4;

/**
 * "What you'll learn" on the home page. Driven by the real course (lib/course.ts), and it
 * shares progress with it: marking a project done here ticks it on the course page too.
 */
export function LearnModules() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { done, toggle } = useCourseProgress(allProgressIds);
  const projectsDone = courseModules.filter((m) => done.has(projectId(m.id))).length;
  const lessonsDone = [...done].filter((id) => allLessonIds.has(id)).length;

  return (
    <section id="learn" className="section-y wrap">
      <div className="mb-[35px] flex items-end justify-between gap-[30px] max-md:flex-col max-md:items-start max-md:gap-[22px]">
        <div>
          <Eyebrow>WHAT YOU&apos;LL LEARN</Eyebrow>
          <h2 className="text-[40px] max-md:text-[34px] max-md:tracking-[-1.2px]">
            {numberWord(courseModules.length)} modules.
            <br />
            <em>Zero course fee.</em> Real projects.
          </h2>
          <p className="mt-3 mb-0 max-w-[560px] text-[13px] text-muted">
            {totalLessons} free lessons from the people who make the tools, in order. Each module ends with something you
            make, not a quiz.
          </p>
        </div>
        <div className="min-w-[225px] pb-[5px] text-right text-[10px] font-semibold max-md:w-full max-md:text-left">
          <span>
            {projectsDone}/{totalProjects} projects · {lessonsDone}/{totalLessons} lessons done
          </span>
          <div className="my-2.5 h-1 overflow-hidden rounded-[10px] bg-line">
            <div
              className="h-full bg-[#938221] transition-[width] duration-300"
              style={{ width: `${Math.round((projectsDone / totalProjects) * 100)}%` }}
            />
          </div>
          <small className="text-[9px] font-normal text-muted">Same progress as the course page. No account needed.</small>
        </div>
      </div>

      <div className="border-t border-line">
        {courseModules.map((m, i) => {
          const copy = moduleHomeCopy[m.id];
          const isOpen = expanded === i;
          const pid = projectId(m.id);
          const isDone = done.has(pid);
          const lessonsInModuleDone = m.lessons.filter((l) => done.has(l.id)).length;
          const moduleChannels = channels.filter((c) => copy?.handles.includes(c.handle));
          const panelId = `learn-panel-${m.id}`;
          return (
            <article key={m.id} className="border-b border-line">
              <button
                type="button"
                className="flex w-full items-center gap-[25px] border-0 bg-transparent px-[7px] py-[25px] text-left text-ink hover:bg-[#f9f2e5] max-md:gap-[13px] max-md:px-0 max-md:py-[23px]"
                onClick={() => setExpanded(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="w-10 shrink-0 font-serif text-[26px] leading-[normal] font-normal text-[#9f917b] max-md:w-[27px] max-md:text-[22px]">
                  {isDone ? <Check aria-label="Project done" /> : String(m.number).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[19px] max-md:text-[17px]">{m.title}</h3>
                  <p className="mt-1.5 mb-0 text-[12px] leading-[1.6] text-muted max-md:text-[10px]">
                    {copy?.tagline ?? m.outcome}
                  </p>
                </div>
                <span className="ml-auto shrink-0 text-[10px] whitespace-nowrap text-muted max-md:hidden">
                  {m.lessons.length} lessons
                </span>
                {copy && (
                  <span
                    className={cx(
                      "rounded-[4px] border px-2 py-[5px] text-[8px] tracking-[1px] whitespace-nowrap max-md:hidden",
                      i === 0 ? "border-[#e9d774] bg-[#fff3b0]" : "border-line",
                    )}
                  >
                    {copy.label}
                  </span>
                )}
                <ChevronDown size={21} className={cx("ml-[13px] shrink-0 max-md:ml-auto", isOpen && "rotate-180")} />
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  className="grid grid-cols-[1.3fr_1fr] gap-[55px] pt-[15px] pr-12 pb-[30px] pl-[72px] max-md:grid-cols-1 max-md:gap-[25px] max-md:pt-[7px] max-md:pr-0 max-md:pb-[25px] max-md:pl-10"
                >
                  <div>
                    <p className="mt-0 mb-4 text-[13px] font-semibold">You&apos;ll be able to: {m.outcome}</p>
                    <Eyebrow size="text-[9px] mb-3">YOUR PROJECT · {m.project.title.toUpperCase()}</Eyebrow>
                    <p className="mt-0 mb-2 text-[13px]">{m.project.brief}</p>
                    <p className="mt-0 mb-[18px] text-[13px]">
                      <strong className="bg-marker px-1 text-[#1c1917]">Done when:</strong> {m.project.doneWhen}
                    </p>
                    {copy && (
                      <div className="flex items-start gap-2 text-[10px] text-muted">
                        <ShieldCheck size={16} className="shrink-0" aria-hidden />
                        <span>{copy.note}</span>
                      </div>
                    )}
                    <div className="mt-[18px] flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        className={cx(
                          "flex items-center gap-2 rounded-[5px] border px-[13px] py-[9px] text-[10px]",
                          isDone ? "border-[#728966] bg-[#e4ebdf] text-[#1c1917]" : "border-[#9c9284] bg-transparent",
                        )}
                        onClick={() => toggle(pid)}
                        aria-pressed={isDone}
                      >
                        <Check size={16} aria-hidden />
                        {isDone ? "Project done · undo" : "Mark project done"}
                      </button>
                      <Link
                        href={`${COURSE_URL_PATH}#${m.id}`}
                        className="inline-flex items-center gap-1.5 border-b border-ink pb-0.5 text-[11px] font-bold"
                      >
                        See the full project steps <ArrowRight size={13} aria-hidden />
                      </Link>
                    </div>
                  </div>

                  <div>
                    <Eyebrow size="text-[9px] mb-3">
                      LESSONS · {lessonsInModuleDone}/{m.lessons.length} DONE
                    </Eyebrow>
                    <ul className="m-0 mb-3 flex list-none flex-col gap-2 p-0">
                      {m.lessons.slice(0, PREVIEW).map((l) => {
                        const logo = logoForPublisher(l.publisher);
                        return (
                          <li key={l.id}>
                            <a
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 border-b border-line pb-[7px] text-[12px]"
                            >
                              {logo ? <BrandLogo logo={logo} size={14} /> : <span className="w-3.5" />}
                              <span className={cx("flex-1", done.has(l.id) && "text-muted line-through")}>{l.title}</span>
                              <ArrowUpRight size={14} className="shrink-0" aria-hidden />
                              <span className="sr-only">(opens in a new tab)</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                    <Link
                      href={`${COURSE_URL_PATH}#${m.id}`}
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold underline-offset-4 hover:underline"
                    >
                      {m.lessons.length > PREVIEW
                        ? `See all ${m.lessons.length} lessons in the course`
                        : "Open this module in the course"}{" "}
                      <ArrowRight size={13} aria-hidden />
                    </Link>

                    {moduleChannels.length > 0 && (
                      <>
                        <Eyebrow size="text-[9px] mt-6 mb-3">ALSO ON YOUTUBE</Eyebrow>
                        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                          {moduleChannels.map((c) => (
                            <a
                              key={c.handle}
                              href={channelSearchUrl(c)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-muted hover:text-ink"
                            >
                              {c.name} <ArrowUpRight size={12} aria-hidden />
                            </a>
                          ))}
                        </div>
                      </>
                    )}
                    {copy && <small className="mt-4 block text-muted">{copy.tags}</small>}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
      <div className="mt-[22px] flex flex-wrap items-center justify-between gap-4">
        <p className="m-0 max-w-[620px] text-[10px] leading-[1.6] text-muted">
          Self-reported progress, not a qualification. Every lesson is free to open; where a tool needs a paid plan, the
          lesson says so.
        </p>
        <Link href={COURSE_URL_PATH} className="inline-flex items-center gap-2 border-b border-ink pb-1 text-[12px] font-bold">
          Open the full course <ArrowRight size={15} aria-hidden />
        </Link>
      </div>
    </section>
  );
}

function numberWord(n: number) {
  return ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"][n] ?? String(n);
}
