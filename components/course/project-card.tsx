import type { ModuleProject } from "@/lib/course";
import { cx } from "../ui";

export function ProjectCard({
  id,
  moduleNumber,
  project,
  done,
  onToggle,
}: {
  id: string;
  moduleNumber: number;
  project: ModuleProject;
  done: boolean;
  onToggle: () => void;
}) {
  const checkboxId = `done-${id}`;
  return (
    <div
      className={cx(
        "mt-8 rounded-[11px] border p-6 max-md:p-5",
        done ? "border-[#728966] bg-[#eef3ea]" : "border-ink bg-[#fffef9] shadow-[4px_4px_0_#1c1917]",
      )}
    >
      <span className="block text-[10px] font-extrabold tracking-[1.6px]">MODULE {moduleNumber} PROJECT</span>
      <h3 className="mt-2 font-serif text-[24px] font-semibold tracking-[-0.8px] max-md:text-[21px]">{project.title}</h3>
      <p className="mt-2 mb-0 text-[14px] leading-[1.7] text-muted">{project.brief}</p>
      <ol className="mt-4 mb-0 grid gap-2 pl-0">
        {project.steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-[14px] leading-[1.6]">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-ink text-[10px] font-extrabold">
              {i + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <p className="mt-5 mb-0 text-[14px] leading-[1.6]">
        <strong className="bg-marker px-1">Done when:</strong> {project.doneWhen}
      </p>
      <div className="mt-5 flex items-center gap-3 border-t border-dashed border-[#b9b0a5] pt-4">
        <input
          id={checkboxId}
          type="checkbox"
          checked={done}
          onChange={onToggle}
          className="size-5 shrink-0 cursor-pointer accent-[#938221]"
        />
        <label htmlFor={checkboxId} className="cursor-pointer text-[13px] font-bold">
          {done ? "Project done" : "I've done this project"}
        </label>
      </div>
    </div>
  );
}
