import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ShareButtons } from "@/components/share-buttons";
import { COURSE_HREF, buttonBase, buttonSize, cx } from "@/components/ui";
import { courseModules, totalLessons } from "@/lib/course";
import {
  COURSE_URL,
  SITE_URL,
  courseShareText,
  parseProgressSlug,
  progressCardPath,
  progressSentence,
} from "@/lib/share";

/**
 * The page a progress share points to, e.g. /progress/12-2-1. It exists so LinkedIn and X
 * show the learner's progress card as the post preview (they read og:image from the link).
 * Only three numbers are in the URL; nothing about the person is stored.
 */

// Cache Components needs one known value; the rest render on first request and are cached.
export function generateStaticParams() {
  return [{ stats: "0-0-0" }];
}

export async function generateMetadata({ params }: PageProps<"/progress/[stats]">): Promise<Metadata> {
  const stats = parseProgressSlug((await params).stats);
  if (!stats) return {};
  const title = progressSentence(stats);
  const image = { url: progressCardPath(stats), width: 1200, height: 630, alt: title };
  return {
    title: `${title.replace(/ on Zero to ₹0/, "")} — Zero to ₹0`,
    description: courseShareText,
    robots: { index: false, follow: true },
    openGraph: { title, description: courseShareText, images: [image], url: `${SITE_URL}/progress/${(await params).stats}` },
    twitter: { card: "summary_large_image", title, description: courseShareText, images: [image] },
  };
}

export default async function ProgressSharePage({ params }: PageProps<"/progress/[stats]">) {
  const { stats: slug } = await params;
  const stats = parseProgressSlug(slug);
  if (!stats) notFound();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader />
      <main className="wrap max-w-[860px] pt-14 pb-20 max-md:pt-10">
        <span className="block text-[10px] font-extrabold tracking-[1.6px]">SHARED PROGRESS</span>
        <h1 className="mt-4 text-[48px] leading-[1.08] tracking-[-2px] max-md:text-[34px] max-md:tracking-[-1.2px]">
          Someone is learning AI for ₹0.
        </h1>
        <p className="max-w-[620px] text-[16px] leading-[1.7] text-muted">
          They&apos;re working through a free course of {totalLessons} lessons from Anthropic, OpenAI, Google, n8n and more, in{" "}
          {courseModules.length} modules with a project in each. You can start it too. No account, no fee.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element -- generated image, served as-is */}
        <img
          src={progressCardPath(stats)}
          alt={progressSentence(stats)}
          width={1200}
          height={630}
          className="mt-8 h-auto w-full rounded-[11px] border border-line shadow-[0_15px_45px_#5e462319]"
        />
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link href={COURSE_HREF} className={cx(buttonBase, buttonSize)}>
            Start the free course <ArrowUpRight size={18} aria-hidden />
          </Link>
          <ShareButtons url={COURSE_URL} text={courseShareText} />
        </div>
        <p className="mt-6 text-[12px] text-muted">Progress is self-reported. It isn&apos;t a certificate.</p>
      </main>
      <SiteFooter />
    </div>
  );
}
