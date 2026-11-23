import type { Metadata } from "next";
import { FreeCourse } from "@/components/course/free-course";
import { Brand } from "@/components/ui";
import { SiteFooter } from "@/components/site-footer";
import { courseModules, reviewedOn, totalLessons } from "@/lib/course";

export const metadata: Metadata = {
  title: "The free AI course — Zero to ₹0",
  description: `${totalLessons} free lessons from Anthropic, OpenAI, Google, n8n and more, arranged into ${courseModules.length} modules with progress tracking. No account, no fee.`,
  openGraph: {
    title: "The free AI course",
    description: `Everything a paid AI course teaches, from free lessons, in ${courseModules.length} ordered modules.`,
  },
};

export default function FreeCoursePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="border-b border-line">
        <div className="wrap flex h-[72px] items-center justify-between">
          <Brand />
          <span className="text-[11px] font-semibold text-muted">The free AI course</span>
        </div>
      </div>
      <main id="top">
        <FreeCourse />
      </main>
      <SiteFooter note={`Lesson links last reviewed ${reviewedOn}.`} />
    </div>
  );
}
