"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, RotateCcw } from "lucide-react";
import {
  type Lesson,
  type LessonType,
  allLessonIds,
  courseModules,
  lessonTypes,
  reviewedOn,
  starterLessons,
  totalLessons,
} from "@/lib/course";
import { Eyebrow, cx } from "../ui";
import { useCourseProgress } from "./progress-store";

type Filter = "all" | "starter" | LessonType;

const filterLabel: Record<Filter, string> = {
  all: "All lessons",
  starter: "Starter path",
  Course: "Courses",
  Video: "Videos",
  Reading: "Reading",
  Tool: "Tools",
  Community: "Communities",
};

const filters: Filter[] = ["all", "starter", ...lessonTypes];

const matches = (lesson: Lesson, filter: Filter) =>
  filter === "all" ? true : filter === "starter" ? Boolean(lesson.starter) : lesson.type === filter;

export function FreeCourse() {
  const [filter, setFilter] = useState<Filter>("all");
  const { done, toggle, clear } = useCourseProgress(allLessonIds);
  const pct = Math.round((done.size / totalLessons) * 100);
  const firstLesson = starterLessons[0];

  const showStarter = () => {
    setFilter("starter");
    document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Intro */}
      <section className="wrap pt-14 pb-12 max-md:pt-10 max-md:pb-8">
        <Eyebrow>THE FREE AI COURSE</Eyebrow>
        <h1 className="max-w-[820px] text-[64px] leading-[1.04] tracking-[-2.5px] max-md:text-[40px] max-md:tracking-[-1.4px]">
          Everything a paid AI course teaches. <em className="relative z-[1] inline-block before:absolute before:inset-[8px_-6px_2px_-4px] before:-z-[1] before:-rotate-1 before:bg-marker dark:text-[#1c1917]">Free, and in order.</em>
        </h1>
        <p className="max-w-[620px] text-[16px] leading-[1.7] text-muted max-md:text-[15px]">
          {totalLessons} free lessons from Anthropic, OpenAI, Google, n8n, freeCodeCamp and independent creators,
          arranged into {courseModules.length} modules. No account. Tick lessons off as you go; your progress stays in
          this browser.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={firstLesson.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 rounded-[9px] border border-ink bg-ink px-6 py-4 text-[14px] font-bold text-paper transition-[translate] duration-200 hover:-translate-y-0.5"
          >
            Start lesson 1: {firstLesson.title} <ArrowUpRight size={18} />
          </a>
          <button
            type="button"
            onClick={showStarter}
            className="inline-flex items-center gap-2.5 border-b border-ink pb-1 text-[13px] font-bold"
          >
            See the {starterLessons.length}-lesson starter path <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Overview */}
      <section aria-labelledby="overview-title" className="wrap pb-14">
        <h2 id="overview-title" className="sr-only">
          Course overview
        </h2>
        <ol className="grid list-none grid-cols-4 gap-3 p-0 max-xl:grid-cols-2 max-xs:grid-cols-1">
          {courseModules.map((m) => {
            const finished = m.lessons.filter((l) => done.has(l.id)).length;
            const complete = finished === m.lessons.length;
            return (
              <li key={m.id}>
                <a
                  href={`#${m.id}`}
                  className={cx(
                    "flex h-full flex-col rounded-[11px] border p-4 transition-colors hover:border-ink",
                    complete ? "border-[#728966] bg-[#e4ebdf] text-[#1c1917]" : "border-line bg-paper",
                  )}
                >
                  <span className="font-serif text-[22px] leading-none text-[#9f917b]">
                    {complete ? <Check aria-label="Module complete" /> : String(m.number).padStart(2, "0")}
                  </span>
                  <span className="mt-3 text-[15px] font-bold leading-[1.3]">{m.title}</span>
                  <span className={cx("mt-auto pt-3 text-[12px]", complete ? "" : "text-muted")}>
                    {finished}/{m.lessons.length} lessons done
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Sticky progress + filter bar */}
      <div className="sticky top-0 z-20 border-y border-line bg-paper/95 backdrop-blur-[12px]">
        <div className="wrap flex items-center gap-6 py-3 max-md:flex-col max-md:items-stretch max-md:gap-3">
          <div className="flex min-w-[220px] items-center gap-3">
            <div
              className="h-2 flex-1 overflow-hidden rounded-full bg-line"
              role="progressbar"
              aria-label="Course progress"
              aria-valuemin={0}
              aria-valuemax={totalLessons}
              aria-valuenow={done.size}
            >
              <div className="h-full bg-[#938221] transition-[width] duration-300" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-[12px] font-semibold whitespace-nowrap" aria-live="polite">
              {done.size}/{totalLessons} done
            </span>
            {done.size > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Clear all progress on this device?")) clear();
                }}
                className="flex items-center gap-1 text-[11px] text-muted hover:text-ink"
              >
                <RotateCcw size={13} /> Clear
              </button>
            )}
          </div>
          <div
            className="ml-auto flex gap-1 max-md:-mx-5 max-md:ml-0 max-md:overflow-x-auto max-md:px-5 max-md:pb-1"
            role="group"
            aria-label="Filter lessons"
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={cx(
                  "shrink-0 rounded-[6px] border px-3 py-1.5 text-[12px] whitespace-nowrap",
                  filter === f ? "border-ink bg-ink text-paper" : "border-transparent text-muted hover:border-line",
                )}
              >
                {filterLabel[f]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modules */}
      <div id="modules" className="wrap scroll-mt-24">
        {courseModules.map((m) => {
          const visible = m.lessons.filter((l) => matches(l, filter));
          const finished = m.lessons.filter((l) => done.has(l.id)).length;
          return (
            <section
              key={m.id}
              id={m.id}
              aria-labelledby={`${m.id}-title`}
              className="grid scroll-mt-24 grid-cols-[260px_1fr] gap-12 border-b border-line py-14 max-xl:grid-cols-1 max-xl:gap-6 max-md:py-10"
            >
              <header>
                <span className="font-serif text-[40px] leading-none text-[#9f917b]">
                  {String(m.number).padStart(2, "0")}
                </span>
                <h2 id={`${m.id}-title`} className="mt-3 text-[30px] max-md:text-[26px] max-md:tracking-[-1px]">
                  {m.title}
                </h2>
                <p className="mt-3 mb-0 text-[14px] leading-[1.7] text-muted">{m.outcome}</p>
                <p className="mt-4 mb-0 text-[12px] font-semibold">
                  {finished}/{m.lessons.length} done
                </p>
              </header>

              <div>
                {visible.length === 0 ? (
                  <div className="rounded-[11px] border border-dashed border-line p-6 text-[14px] text-muted">
                    No {filter === "starter" ? "starter lessons" : filterLabel[filter].toLowerCase()} in this module.{" "}
                    <button type="button" className="font-bold text-ink underline underline-offset-4" onClick={() => setFilter("all")}>
                      Show all lessons
                    </button>
                  </div>
                ) : (
                  <ol className="m-0 list-none border-t border-line p-0">
                    {visible.map((lesson) => (
                      <LessonRow key={lesson.id} lesson={lesson} done={done.has(lesson.id)} onToggle={() => toggle(lesson.id)} />
                    ))}
                  </ol>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <footer className="wrap flex justify-between gap-8 py-10 text-[12px] leading-[1.8] text-muted max-md:flex-col max-md:gap-3">
        <p className="m-0 max-w-[560px]">
          Every lesson belongs to its publisher and opens on their site. This page only chooses and orders them. Naming
          a publisher doesn&apos;t mean they endorse this course. Not affiliated with Zero to Infinity with AI.
        </p>
        <p className="m-0 text-right max-md:text-left">
          Links last reviewed {reviewedOn}.
          <br />
          <Link href="/" className="border-b border-line text-ink">
            Zero to ₹0 home
          </Link>
        </p>
      </footer>
    </>
  );
}

function LessonRow({ lesson, done, onToggle }: { lesson: Lesson; done: boolean; onToggle: () => void }) {
  const checkboxId = `done-${lesson.id}`;
  return (
    <li className="flex gap-4 border-b border-line py-5 max-md:gap-3">
      <input
        id={checkboxId}
        type="checkbox"
        checked={done}
        onChange={onToggle}
        className="mt-1 size-5 shrink-0 cursor-pointer accent-[#938221]"
      />
      <label htmlFor={checkboxId} className="sr-only">
        Mark “{lesson.title}” as done
      </label>
      <div className={cx("min-w-0 flex-1", done && "opacity-60")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <a
            href={lesson.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-baseline gap-1.5 text-[16px] font-semibold leading-[1.4] underline decoration-line decoration-1 underline-offset-[5px] hover:decoration-ink"
          >
            {lesson.title}
            <ArrowUpRight size={14} className="shrink-0 translate-y-0.5" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          {lesson.starter && (
            <span className="rounded-[4px] border border-[#e9d774] bg-[#fff3b0] px-1.5 py-0.5 text-[10px] font-extrabold tracking-[0.8px] text-[#1c1917]">
              STARTER
            </span>
          )}
        </div>
        <p className="mt-1.5 mb-0 text-[14px] leading-[1.6] text-muted">{lesson.description}</p>
        <p className="mt-2 mb-0 text-[12px] text-muted">
          {[lesson.publisher, lesson.type, lesson.duration].filter(Boolean).join(" · ")}
        </p>
      </div>
    </li>
  );
}
