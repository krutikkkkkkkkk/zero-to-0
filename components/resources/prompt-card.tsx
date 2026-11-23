"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Prompt } from "@/lib/resources";

/** Shows [blanks] highlighted so readers see what to replace. */
function PromptText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/g).map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <mark key={i} className="rounded-[3px] bg-[#fff3b0] px-0.5 text-[#1c1917]">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function PromptCard({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this prompt:", prompt.prompt);
    }
  };

  return (
    <article id={prompt.id} className="scroll-mt-28 rounded-[11px] border border-line bg-[#fffef9] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[18px]">{prompt.title}</h3>
          <p className="mt-1 mb-0 text-[13px] text-muted">{prompt.useFor}</p>
        </div>
        <button
          type="button"
          onClick={copy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-[7px] border border-ink px-3 py-1.5 text-[12px] font-bold transition-colors hover:bg-ink hover:text-paper"
          aria-label={`Copy the "${prompt.title}" prompt`}
        >
          {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="mt-4 mb-0 max-h-[360px] overflow-auto rounded-[8px] border border-line bg-paper p-4 font-mono text-[12.5px] leading-[1.65] whitespace-pre-wrap">
        <PromptText text={prompt.prompt} />
      </pre>
      {prompt.tip && (
        <p className="mt-3 mb-0 text-[13px] leading-[1.6]">
          <strong>Tip:</strong> {prompt.tip}
        </p>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Prompt copied" : ""}
      </span>
    </article>
  );
}
