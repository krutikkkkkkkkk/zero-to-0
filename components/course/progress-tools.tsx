"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Download, Link2, Share2, X } from "lucide-react";
import { allLessonIds, allProgressIds, allProjectIds, courseModules } from "@/lib/course";
import { type PathAnswers, parseAnswers, serializeAnswers } from "@/lib/paths";
import { decodeProgress, encodeProgress } from "@/lib/progress-code";
import { COURSE_URL, SITE_URL, progressCardPath, progressSentence, progressSlug } from "@/lib/share";
import { ShareButtons } from "../share-buttons";

/* ---------- Progress links: #progress=<codes>&path=<answers> ---------- */

const hashListeners = new Set<() => void>();
function subscribeHash(cb: () => void) {
  hashListeners.add(cb);
  window.addEventListener("hashchange", cb);
  return () => {
    hashListeners.delete(cb);
    window.removeEventListener("hashchange", cb);
  };
}
function clearHash() {
  history.replaceState(null, "", window.location.pathname + window.location.search);
  hashListeners.forEach((l) => l());
}

/** Shown when the page is opened from a progress link. Nothing changes until the learner agrees. */
export function ProgressImport({ onAccept }: { onAccept: (ids: string[], answers: PathAnswers | null) => void }) {
  const hash = useSyncExternalStore(
    subscribeHash,
    () => window.location.hash,
    () => "",
  );
  const params = new URLSearchParams(hash.slice(1));
  if (!params.has("progress")) return null;

  const ids = decodeProgress(params.get("progress") ?? "", allProgressIds);
  const answers = parseAnswers(params.get("path"));
  const lessons = ids.filter((id) => allLessonIds.has(id)).length;
  const projects = ids.length - lessons;

  return (
    <div className="wrap pt-6">
      <div
        role="region"
        aria-label="Progress from a link"
        className="flex items-center gap-5 rounded-[11px] border border-[#e9d774] bg-[#fff3b0] p-5 text-[#1c1917] max-md:flex-col max-md:items-start"
      >
        <p className="m-0 flex-1 text-[14px] leading-[1.6]">
          <strong>This link carries saved progress:</strong> {lessons} {lessons === 1 ? "lesson" : "lessons"}
          {projects > 0 && ` and ${projects} ${projects === 1 ? "project" : "projects"}`}
          {answers && ", plus a personal path"}. Add it to this device? Anything already ticked here stays ticked.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => {
              onAccept(ids, answers);
              clearHash();
            }}
            className="rounded-[9px] border border-ink bg-ink px-4 py-2.5 text-[13px] font-bold text-paper"
          >
            Add to this device
          </button>
          <button type="button" onClick={clearHash} className="px-2 text-[13px] font-semibold">
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Copy link + progress card ---------- */

export function ProgressTools({ done, answers }: { done: ReadonlySet<string>; answers: PathAnswers | null }) {
  const [status, setStatus] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const [canShareFiles, setCanShareFiles] = useState(false);

  const lessonsDone = [...done].filter((id) => allLessonIds.has(id)).length;
  const projectsDone = allProjectIds.filter((id) => done.has(id)).length;
  const lastFinishedModule = [...courseModules].reverse().find((m) => m.lessons.every((l) => done.has(l.id)));
  const stats = { lessons: lessonsDone, projects: projectsDone, module: lastFinishedModule?.number ?? 0 };
  // Shared on LinkedIn / X, this page shows the progress card as the post's preview image.
  const sharePageUrl = `${SITE_URL}/progress/${progressSlug(stats)}`;
  const shareText = `${progressSentence(stats)} Free lessons, in order. Spent: ₹0.`;

  if (done.size === 0) {
    return (
      <p className="wrap -mt-6 pb-10 text-[12px] text-muted">
        Tick lessons as you finish them. You can then copy a link to carry your progress to another device, or share a
        progress card.
      </p>
    );
  }

  const copyLink = async () => {
    const link = `${window.location.origin}${window.location.pathname}#progress=${encodeProgress(done)}${
      answers ? `&path=${serializeAnswers(answers)}` : ""
    }`;
    try {
      await navigator.clipboard.writeText(link);
      setStatus("Link copied. Open it on your other device to bring your progress across.");
    } catch {
      window.prompt("Copy this link and open it on your other device:", link);
    }
  };

  const openCard = () => {
    setCardUrl(progressCardPath(stats));
    setCanShareFiles(typeof navigator.canShare === "function");
    dialogRef.current?.showModal();
  };

  const shareCard = async () => {
    if (!cardUrl) return;
    try {
      const blob = await (await fetch(cardUrl)).blob();
      const file = new File([blob], "zero-to-0-progress.png", { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: `${shareText} ${COURSE_URL}` });
      } else {
        setCanShareFiles(false);
      }
    } catch {
      /* share sheet closed or not supported; the download link still works */
    }
  };

  return (
    <div className="wrap -mt-6 pb-10">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-2 rounded-[8px] border border-line px-3.5 py-2 text-[13px] font-semibold transition-colors hover:border-ink"
        >
          <Link2 size={15} aria-hidden /> Copy my progress link
        </button>
        <button
          type="button"
          onClick={openCard}
          className="inline-flex items-center gap-2 rounded-[8px] border border-line px-3.5 py-2 text-[13px] font-semibold transition-colors hover:border-ink"
        >
          <Share2 size={15} aria-hidden /> Share a progress card
        </button>
        <span className="text-[12px] text-muted" aria-live="polite">
          {status}
        </span>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="card-title"
        onClose={() => setCardUrl(null)}
        className="m-auto w-[min(640px,calc(100%-32px))] rounded-[14px] border border-ink bg-paper p-0 text-ink backdrop:bg-[#1c191799]"
      >
        <div className="p-6 max-md:p-4">
          <div className="flex items-start justify-between gap-4">
            <h2 id="card-title" className="text-[24px] tracking-[-0.8px]">
              Your progress card
            </h2>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="rounded-[6px] p-1 hover:bg-line"
            >
              <X size={20} />
            </button>
          </div>
          <p className="mt-1 mb-4 text-[13px] text-muted">
            Post it on LinkedIn or X, or download the image. It shows what you ticked off; it isn&apos;t a certificate.
          </p>
          {cardUrl && (
            // eslint-disable-next-line @next/next/no-img-element -- generated on request, no optimisation needed
            <img
              src={cardUrl}
              alt={`Progress card: ${lessonsDone} lessons and ${projectsDone} projects done`}
              width={1200}
              height={630}
              className="h-auto w-full rounded-[8px] border border-line"
            />
          )}
          <ShareButtons url={sharePageUrl} text={shareText} className="mt-5" />
          <div className="mt-3 flex flex-wrap gap-3">
            {cardUrl && (
              <a
                href={cardUrl}
                download="zero-to-0-progress.png"
                className="inline-flex items-center gap-2 rounded-[9px] border border-ink bg-ink px-4 py-2.5 text-[13px] font-bold text-paper"
              >
                <Download size={16} aria-hidden /> Download image
              </a>
            )}
            {canShareFiles && (
              <button
                type="button"
                onClick={shareCard}
                className="inline-flex items-center gap-2 rounded-[9px] border border-ink px-4 py-2.5 text-[13px] font-bold"
              >
                <Share2 size={16} aria-hidden /> Share image
              </button>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
