"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Compass } from "lucide-react";
import {
  type GoalId,
  type LearningPath,
  type PaceId,
  type PathAnswers,
  type RoleId,
  goals,
  paces,
  roles,
} from "@/lib/paths";
import { cx } from "../ui";

type Option<T extends string> = { id: T; label: string };

function Choice<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: readonly Option<T>[];
  value: T | undefined;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="mb-3 p-0 text-[14px] font-bold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.id}
            className="cursor-pointer rounded-[8px] border border-line bg-paper px-3.5 py-2 text-[13px] transition-colors hover:border-ink has-checked:border-ink has-checked:bg-ink has-checked:text-paper has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-[#a46714]"
          >
            <input
              type="radio"
              name={name}
              value={o.id}
              checked={value === o.id}
              onChange={() => onChange(o.id)}
              className="sr-only"
            />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function PathQuiz({
  answers,
  path,
  done,
  onSave,
  onRemove,
  onShowPath,
}: {
  answers: PathAnswers | null;
  path: LearningPath | null;
  done: ReadonlySet<string>;
  onSave: (a: PathAnswers) => void;
  onRemove: () => void;
  onShowPath: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [role, setRole] = useState<RoleId | undefined>(answers?.role);
  const [goal, setGoal] = useState<GoalId | undefined>(answers?.goal);
  const [pace, setPace] = useState<PaceId | undefined>(answers?.pace);

  const startEditing = () => {
    setRole(answers?.role);
    setGoal(answers?.goal);
    setPace(answers?.pace);
    setEditing(true);
  };

  if (editing) {
    const ready = role && goal && pace;
    return (
      <section aria-labelledby="quiz-title" className="wrap pb-10">
        <form
          className="rounded-[11px] border border-ink bg-[#fffef9] p-7 max-md:p-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!ready) return;
            onSave({ role, goal, pace });
            setEditing(false);
          }}
        >
          <h2 id="quiz-title" className="text-[28px] tracking-[-1px] max-md:text-[24px]">
            Find your path
          </h2>
          <p className="mt-2 text-[14px] text-muted">Three questions. Your answers stay in this browser.</p>
          <div className="mt-6 grid gap-6">
            <Choice legend="1. What kind of work do you do?" name="role" options={roles} value={role} onChange={setRole} />
            <Choice legend="2. What do you want from AI first?" name="goal" options={goals} value={goal} onChange={setGoal} />
            <Choice legend="3. How much time can you give it?" name="pace" options={paces} value={pace} onChange={setPace} />
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={!ready}
              className="inline-flex items-center gap-3 rounded-[9px] border border-ink bg-ink px-5 py-3 text-[13px] font-bold text-paper disabled:cursor-not-allowed disabled:opacity-40"
            >
              Show my path <ArrowRight size={16} />
            </button>
            <button type="button" onClick={() => setEditing(false)} className="text-[13px] text-muted hover:text-ink">
              Cancel
            </button>
          </div>
        </form>
      </section>
    );
  }

  if (!path) {
    return (
      <section aria-label="Find your path" className="wrap pb-10">
        <div className="flex items-center gap-5 rounded-[11px] border border-dashed border-[#b9b0a5] p-5 max-md:flex-col max-md:items-start">
          <Compass size={28} className="shrink-0 text-[#938221]" aria-hidden />
          <p className="m-0 flex-1 text-[14px] leading-[1.6]">
            <strong>Not sure where to start?</strong> Answer three questions and get a shorter path through the course,
            picked for your work, your goal and your time.
          </p>
          <button
            type="button"
            onClick={startEditing}
            className="inline-flex shrink-0 items-center gap-2.5 rounded-[9px] border border-ink px-4 py-2.5 text-[13px] font-bold transition-colors hover:bg-ink hover:text-paper"
          >
            Find my path <ArrowRight size={16} />
          </button>
        </div>
      </section>
    );
  }

  const finished = path.lessons.filter((l) => done.has(l.id)).length;
  const next = path.lessons.find((l) => !done.has(l.id));
  const projects = path.projectModuleIds.size;

  return (
    <section aria-labelledby="path-title" className="wrap pb-10">
      <div className="rounded-[11px] border border-ink bg-[#fffef9] p-6 max-md:p-5">
        <span className="block text-[10px] font-extrabold tracking-[1.6px]">YOUR PATH</span>
        <h2 id="path-title" className="mt-2 text-[28px] tracking-[-1px] max-md:text-[24px]">
          {path.name}:{" "}
          <span className="text-muted">{path.goalLabel.charAt(0).toLowerCase() + path.goalLabel.slice(1)}</span>
        </h2>
        <p className="mt-2 mb-0 text-[14px] text-muted">
          {path.lessons.length} lessons and {projects} {projects === 1 ? "project" : "projects"}. About {path.weeks}{" "}
          {path.weeks === 1 ? "week" : "weeks"} at {path.perWeek} a week. {finished}/{path.lessons.length} lessons done.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          {next ? (
            <a
              href={next.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-[9px] border border-ink bg-ink px-5 py-3 text-[13px] font-bold text-paper transition-[translate] hover:-translate-y-0.5"
            >
              Next up: {next.title} <ArrowUpRight size={16} />
            </a>
          ) : (
            <span className="rounded-[9px] bg-[#e4ebdf] px-4 py-3 text-[13px] font-bold text-[#1c1917]">
              Every lesson on your path is done.
            </span>
          )}
          <button type="button" onClick={onShowPath} className="border-b border-ink pb-1 text-[13px] font-bold">
            Show only my path
          </button>
          <button
            type="button"
            onClick={startEditing}
            className={cx("text-[13px] text-muted hover:text-ink")}
          >
            Change answers
          </button>
          <button type="button" onClick={onRemove} className="text-[13px] text-muted hover:text-ink">
            Remove path
          </button>
        </div>
      </div>
    </section>
  );
}
