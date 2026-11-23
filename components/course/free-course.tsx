"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, RotateCcw, Search, X } from "lucide-react";
import {
  type Lesson,
  type LessonType,
  allLessonIds,
  allProgressIds,
  allProjectIds,
  courseModules,
  lessonTypes,
  projectId,
  starterLessons,
  totalLessons,
  totalProjects,
} from "@/lib/course";
import { type LearningPath, type PathAnswers, buildPath, parseAnswers, serializeAnswers } from "@/lib/paths";
import { lessonMatches, searchTerms } from "@/lib/search";
import { BrandLogo, logoForPublisher } from "../brand-logo";
import { Eyebrow, cx } from "../ui";
import { useLocalValue, writeLocal } from "./local-store";
import { PathQuiz } from "./path-quiz";
import { useCourseProgress } from "./progress-store";
import { ProgressImport, ProgressTools } from "./progress-tools";
import { ProjectCard } from "./project-card";

type Filter = "all" | "path" | "starter" | LessonType;

const filterLabel: Record<Filter, string> = {
  all: "All lessons",
  path: "My path",
  starter: "Starter path",
  Course: "Courses",
  Video: "Videos",
  Reading: "Reading",
  Tool: "Tools",
  Community: "Communities",
};

const PATH_KEY = "zero-path";

const matchesFilter = (lesson: Lesson, filter: Filter, path: LearningPath | null) =>
  filter === "all"
    ? true
    : filter === "path"
      ? Boolean(path?.lessonIds.has(lesson.id))
      : filter === "starter"
        ? Boolean(lesson.starter)
        : lesson.type === filter;

const scrollToModules = () => document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" });

export function FreeCourse() {
  const [chosenFilter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const { done, toggle, add, clear } = useCourseProgress(allProgressIds);

  const answers = parseAnswers(useLocalValue(PATH_KEY));
  const answersKey = answers ? serializeAnswers(answers) : null;
  const path = useMemo(() => (answersKey ? buildPath(parseAnswers(answersKey)!) : null), [answersKey]);
  const filter: Filter = chosenFilter === "path" && !path ? "all" : chosenFilter;

  const lessonsDone = [...done].filter((id) => allLessonIds.has(id)).length;
  const projectsDone = allProjectIds.filter((id) => done.has(id)).length;
  const pct = Math.round(((lessonsDone + projectsDone) / (totalLessons + totalProjects)) * 100);
  const firstLesson = starterLessons[0];
  const filters: Filter[] = ["all", ...(path ? (["path"] as const) : []), "starter", ...lessonTypes];

  const terms = searchTerms(query);
  const narrowed = filter !== "all" || terms.length > 0;
  const shownModules = courseModules
    .map((m) => ({ m, visible: m.lessons.filter((l) => matchesFilter(l, filter, path) && lessonMatches(l, terms)) }))
    .filter(({ visible }) => !narrowed || visible.length > 0);
  const matchCount = shownModules.reduce((n, s) => n + s.visible.length, 0);

  const savePath = (a: PathAnswers | null) => writeLocal(PATH_KEY, a ? serializeAnswers(a) : null);
  const showFilter = (f: Filter) => {
    setFilter(f);
    scrollToModules();
  };

  return (
    <>
      <ProgressImport
        onAccept={(ids, linkAnswers) => {
          add(ids);
          if (linkAnswers) savePath(linkAnswers);
        }}
      />

      {/* Intro */}
      <section className="wrap pt-14 pb-12 max-md:pt-10 max-md:pb-8">
        <Eyebrow>THE FREE AI COURSE</Eyebrow>
        <h1 className="max-w-[820px] text-[64px] leading-[1.04] tracking-[-2.5px] max-md:text-[40px] max-md:tracking-[-1.4px]">
          Everything a paid AI course teaches. <em className="relative z-[1] inline-block before:absolute before:inset-[8px_-6px_2px_-4px] before:-z-[1] before:-rotate-1 before:bg-marker">Free, and in order.</em>
        </h1>
        <p className="max-w-[620px] text-[16px] leading-[1.7] text-muted max-md:text-[15px]">
          {totalLessons} free lessons from Anthropic, OpenAI, Google, Figma, Framer, n8n, freeCodeCamp and independent creators,
          arranged into {courseModules.length} modules, each ending in a hands-on project. No account. Tick things off as you
          go; your progress stays in this browser.
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
            onClick={() => showFilter("starter")}
            className="inline-flex items-center gap-2.5 border-b border-ink pb-1 text-[13px] font-bold"
          >
            See the {starterLessons.length}-lesson starter path <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <PathQuiz
        key={answersKey ?? "none"}
        answers={answers}
        path={path}
        done={done}
        onSave={savePath}
        onRemove={() => {
          savePath(null);
          if (filter === "path") setFilter("all");
        }}
        onShowPath={() => showFilter("path")}
      />

      {/* Overview */}
      <section aria-labelledby="overview-title" className="wrap pb-14">
        <h2 id="overview-title" className="sr-only">
          Course overview
        </h2>
        <ol className="grid list-none grid-cols-3 gap-3 p-0 max-xl:grid-cols-2 max-xs:grid-cols-1">
          {courseModules.map((m) => {
            const finished = m.lessons.filter((l) => done.has(l.id)).length;
            const complete = finished === m.lessons.length;
            const projectDone = done.has(projectId(m.id));
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
                    {finished}/{m.lessons.length} lessons done{projectDone && " · project done"}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </section>

      <ProgressTools done={done} answers={answers} />

      {/* Sticky progress, search and filter bar */}
      <div className="sticky top-0 z-20 border-y border-line bg-paper/95 backdrop-blur-[12px]">
        <div className="wrap flex flex-wrap items-center gap-x-6 gap-y-3 py-3">
          <div className="flex min-w-[260px] items-center gap-3 max-md:w-full">
            <div
              className="h-2 flex-1 overflow-hidden rounded-full bg-line"
              role="progressbar"
              aria-label="Course progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
              aria-valuetext={`${lessonsDone} of ${totalLessons} lessons and ${projectsDone} of ${totalProjects} projects done`}
            >
              <div className="h-full bg-[#938221] transition-[width] duration-300" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-[12px] font-semibold whitespace-nowrap">
              {lessonsDone}/{totalLessons} lessons · {projectsDone}/{totalProjects} projects
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

          <div className="relative min-w-[220px] flex-1 max-md:w-full">
            <Search size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                // Results start at the top of the module list; jump there if the reader has scrolled past it.
                const modules = document.getElementById("modules");
                if (modules && modules.getBoundingClientRect().top < 0) modules.scrollIntoView({ block: "start" });
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") setQuery("");
              }}
              placeholder="Search lessons: agents, Excel, n8n…"
              aria-label="Search lessons"
              className="h-9 w-full rounded-[8px] border border-line bg-paper pr-9 pl-9 text-[13px] placeholder:text-muted focus:border-ink focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-muted hover:text-ink"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div
            className="flex w-full gap-1 overflow-x-auto pb-0.5 max-md:-mx-5 max-md:w-[calc(100%+40px)] max-md:px-5"
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
        <p className="sr-only" aria-live="polite">
          {narrowed ? `${matchCount} ${matchCount === 1 ? "lesson" : "lessons"} shown` : ""}
        </p>
      </div>

      {/* Modules */}
      <div id="modules" className="wrap scroll-mt-32">
        {shownModules.length === 0 && (
          <div className="my-14 rounded-[11px] border border-dashed border-line p-8 text-center text-[14px] text-muted">
            No lessons match {terms.length > 0 ? <>“{query.trim()}”</> : "this filter"}
            {filter !== "all" && terms.length > 0 && <> in {filterLabel[filter].toLowerCase()}</>}.{" "}
            <button
              type="button"
              className="font-bold text-ink underline underline-offset-4"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
            >
              Show all lessons
            </button>
          </div>
        )}
        {shownModules.map(({ m, visible }) => {
          const finished = m.lessons.filter((l) => done.has(l.id)).length;
          const showProject =
            terms.length === 0 && (filter === "all" || (filter === "path" && Boolean(path?.projectModuleIds.has(m.id))));
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
                  {narrowed && visible.length < m.lessons.length && (
                    <span className="font-normal text-muted"> · showing {visible.length}</span>
                  )}
                </p>
              </header>

              <div>
                {visible.length === 0 ? (
                  <div className="rounded-[11px] border border-dashed border-line p-6 text-[14px] text-muted">
                    No lessons in this module.
                  </div>
                ) : (
                  <ol className="m-0 list-none border-t border-line p-0">
                    {visible.map((lesson) => (
                      <LessonRow
                        key={lesson.id}
                        lesson={lesson}
                        done={done.has(lesson.id)}
                        onPath={filter !== "path" && Boolean(path?.lessonIds.has(lesson.id))}
                        onToggle={() => toggle(lesson.id)}
                      />
                    ))}
                  </ol>
                )}
                {showProject && (
                  <ProjectCard
                    id={projectId(m.id)}
                    moduleNumber={m.number}
                    project={m.project}
                    done={done.has(projectId(m.id))}
                    onToggle={() => toggle(projectId(m.id))}
                  />
                )}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

function LessonRow({
  lesson,
  done,
  onPath,
  onToggle,
}: {
  lesson: Lesson;
  done: boolean;
  onPath: boolean;
  onToggle: () => void;
}) {
  const checkboxId = `done-${lesson.id}`;
  const logo = logoForPublisher(lesson.publisher);
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
          {onPath && (
            <span className="rounded-[4px] border border-ink px-1.5 py-0.5 text-[10px] font-extrabold tracking-[0.8px]">
              ON YOUR PATH
            </span>
          )}
        </div>
        <p className="mt-1.5 mb-0 text-[14px] leading-[1.6] text-muted">{lesson.description}</p>
        <p className="mt-2 mb-0 flex items-center gap-1.5 text-[12px] text-muted">
          {logo && <BrandLogo logo={logo} size={15} />}
          <span>{[lesson.publisher, lesson.type, lesson.duration].filter(Boolean).join(" · ")}</span>
        </p>
      </div>
    </li>
  );
}
