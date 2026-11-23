import type { Metadata } from "next";
import { FreeCourse } from "@/components/course/free-course";
import { JsonLd } from "@/components/json-ld";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { courseModules, reviewedOn, totalLessons } from "@/lib/course";
import { COURSE_URL, SITE_URL } from "@/lib/share";

export const metadata: Metadata = {
  alternates: { canonical: "/zerotoinfinity" },
  title: "The free AI course — Zero to ₹0",
  description: `${totalLessons} free lessons from Anthropic, OpenAI, Google, n8n and more, arranged into ${courseModules.length} modules with progress tracking. No account, no fee.`,
  openGraph: {
    title: "The free AI course",
    description: `Everything a paid AI course teaches, from free lessons, in ${courseModules.length} ordered modules.`,
  },
};

/** Describes the course for search engines (schema.org Course). */
const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "The free AI course",
  description: `${totalLessons} free lessons from Anthropic, OpenAI, Google, n8n and more, in ${courseModules.length} ordered modules, each ending in a hands-on project. No account, no fee.`,
  url: COURSE_URL,
  inLanguage: "en",
  isAccessibleForFree: true,
  educationalLevel: "Beginner",
  teaches: courseModules.map((m) => m.outcome),
  provider: { "@type": "Organization", name: "Zero to ₹0", sameAs: SITE_URL },
  offers: [{ "@type": "Offer", category: "Free", price: 0, priceCurrency: "INR" }],
  hasCourseInstance: [{ "@type": "CourseInstance", courseMode: "Online" }],
  syllabusSections: courseModules.map((m) => ({
    "@type": "Syllabus",
    name: `Module ${m.number}: ${m.title}`,
    description: m.outcome,
  })),
};

export default function FreeCoursePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <JsonLd data={courseJsonLd} />
      {/* Not sticky here: the course's own progress and filter bar sticks to the top instead. */}
      <SiteHeader sticky={false} />
      <main id="top">
        <FreeCourse />
      </main>
      <SiteFooter note={`Lesson links last reviewed ${reviewedOn}.`} />
    </div>
  );
}
