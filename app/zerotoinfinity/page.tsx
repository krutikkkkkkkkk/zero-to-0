import type { Metadata } from "next";
import { FreeCourse } from "@/components/course/free-course";
import { SiteHeader } from "@/components/site-header";
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
      {/* Not sticky here: the course's own progress and filter bar sticks to the top instead. */}
      <SiteHeader sticky={false} />
      <main id="top">
        <FreeCourse />
      </main>
      <SiteFooter note={`Lesson links last reviewed ${reviewedOn}.`} />
    </div>
  );
}
