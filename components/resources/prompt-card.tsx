"use client";

import { useId, useMemo, useState } from "react";
import { ArrowUpRight, Check, Copy, PencilLine } from "lucide-react";
import type { Prompt } from "@/lib/resources";
import { cx } from "../ui";

export type PromptTarget = "chatgpt" | "claude";

/**
 * "Open in" links. Both sites fill in the message box from `?q=` and wait for you to press
 * send; neither documents this officially, so the prompt is also copied in case the box is empty.
 */
const targets: Record<PromptTarget, { label: string; url: (q: string) => string }> = {
  chatgpt: { label: "ChatGPT", url: (q) => `https://chatgpt.com/?q=${encodeURIComponent(q)}` },
  claude: { label: "Claude", url: (q) => `https://claude.ai/new?q=${encodeURIComponent(q)}` },
};

const BLANK = /\[[^\]]+\]/g;

/** Split a prompt into text and numbered blanks, so each blank can be filled separately. */
function parse(text: string) {
  const parts: ({ kind: "text"; text: string } | { kind: "blank"; index: number; label: string })[] = [];
  let last = 0;
  let index = 0;
  for (const m of text.matchAll(BLANK)) {
    if (m.index > last) parts.push({ kind: "text", text: text.slice(last, m.index) });
    parts.push({ kind: "blank", index: index++, label: m[0] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ kind: "text", text: text.slice(last) });
  return { parts, blanks: parts.filter((p) => p.kind === "blank") };
}

export function PromptCard({ prompt, open = ["chatgpt", "claude"] }: { prompt: Prompt; open?: PromptTarget[] }) {
  const baseId = useId();
  const { parts, blanks } = useMemo(() => parse(prompt.prompt), [prompt.prompt]);
  const [values, setValues] = useState<Record<number, string>>({});
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState("");

  const filledCount = blanks.filter((b) => values[b.index]?.trim()).length;
  const finalText = parts
    .map((p) => (p.kind === "text" ? p.text : values[p.index]?.trim() || p.label))
    .join("");

  const copy = async (message: string) => {
    try {
      await navigator.clipboard.writeText(finalText);
      setStatus(message);
      setTimeout(() => setStatus(""), 4000);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <article id={prompt.id} className="scroll-mt-28 rounded-[11px] border border-line bg-[#fffef9] p-5">
      <h3 className="text-[18px]">{prompt.title}</h3>
      <p className="mt-1 mb-0 text-[13px] text-muted">{prompt.useFor}</p>

      {blanks.length > 0 && (
        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          aria-expanded={editing}
          className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold underline-offset-4 hover:underline"
        >
          <PencilLine size={14} aria-hidden />
          {editing ? "Hide the blanks" : "Fill in the blanks"}{" "}
          <span className="font-normal text-muted">
            ({filledCount}/{blanks.length} filled)
          </span>
        </button>
      )}

      {editing && (
        <div className="mt-3 grid gap-3 rounded-[8px] border border-line bg-paper p-4">
          {blanks.map((b) => {
            const id = `${baseId}-blank-${b.index}`;
            const label = b.label.slice(1, -1);
            const long = /^paste|^\w+ the|html|menu|content/i.test(label);
            const common = {
              id,
              value: values[b.index] ?? "",
              placeholder: label,
              onChange: (e: { target: { value: string } }) => setValues((v) => ({ ...v, [b.index]: e.target.value })),
              className:
                "w-full rounded-[6px] border border-line bg-[#fffef9] px-2.5 py-1.5 text-[13px] placeholder:text-[#a8a094] focus:border-ink focus-visible:outline-none",
            };
            return (
              <div key={b.index}>
                <label htmlFor={id} className="mb-1 block text-[11px] font-semibold text-muted">
                  {label}
                </label>
                {long ? <textarea rows={3} {...common} /> : <input type="text" {...common} />}
              </div>
            );
          })}
          <p className="m-0 text-[11px] text-muted">Your answers stay on this page; nothing is saved or sent anywhere.</p>
        </div>
      )}

      <pre className="mt-4 mb-0 max-h-[360px] overflow-auto rounded-[8px] border border-line bg-paper p-4 font-mono text-[12.5px] leading-[1.65] whitespace-pre-wrap">
        {parts.map((p, i) => {
          if (p.kind === "text") return p.text;
          const v = values[p.index]?.trim();
          return (
            <mark
              key={i}
              className={cx("rounded-[3px] px-0.5 text-[#1c1917]", v ? "bg-[#e4ebdf]" : "bg-[#fff3b0]")}
            >
              {v || p.label}
            </mark>
          );
        })}
      </pre>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={async () => {
            if (!(await copy("Copied."))) window.prompt("Copy this prompt:", finalText);
          }}
          className="inline-flex items-center gap-1.5 rounded-[7px] border border-ink bg-ink px-3 py-1.5 text-[12px] font-bold text-paper"
          aria-label={`Copy the "${prompt.title}" prompt`}
        >
          {status === "Copied." ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />} Copy
        </button>
        {open.map((t) => (
          <a
            key={t}
            href={targets[t].url(finalText)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => void copy(`Opened ${targets[t].label}. The prompt is copied too, in case the box is empty.`)}
            className="inline-flex items-center gap-1 rounded-[7px] border border-ink px-3 py-1.5 text-[12px] font-bold transition-colors hover:bg-ink hover:text-paper"
          >
            Open in {targets[t].label} <ArrowUpRight size={13} aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ))}
        <span className="text-[12px] text-muted" aria-live="polite">
          {status}
        </span>
      </div>
      {filledCount < blanks.length && blanks.length > 0 && (
        <p className="mt-2 mb-0 text-[11px] text-muted">
          Fill the yellow blanks first, or replace them after pasting.
        </p>
      )}

      {prompt.tip && (
        <p className="mt-3 mb-0 border-t border-dashed border-[#b9b0a5] pt-3 text-[13px] leading-[1.6]">
          <strong>Tip:</strong> {prompt.tip}
        </p>
      )}
    </article>
  );
}
