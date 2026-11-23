import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { courseModules, totalLessons, totalProjects } from "@/lib/course";
import { Marker, OgBrand, OgFrame, colors, ogFonts, ogSize } from "@/lib/og";

/**
 * Shareable progress card. Takes only numbers (lessons done, projects done, last finished
 * module), clamps them, and stores nothing: the image is drawn from these on request.
 */
const clampInt = (value: string | null, min: number, max: number) => {
  const n = Number.parseInt(value ?? "", 10);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min;
};

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams;
  const lessons = clampInt(q.get("l"), 0, totalLessons);
  const projects = clampInt(q.get("p"), 0, totalProjects);
  const moduleNumber = clampInt(q.get("m"), 0, courseModules.length);
  const finishedModule = courseModules.find((m) => m.number === moduleNumber);
  const allDone = lessons === totalLessons;
  const pct = Math.round((lessons / totalLessons) * 100);

  const headline = allDone
    ? { lead: "I finished", mark: "the whole free AI course." }
    : finishedModule
      ? { lead: `I finished module ${finishedModule.number}:`, mark: `${finishedModule.title}.` }
      : { lead: "I'm learning AI", mark: "for ₹0." };

  return new ImageResponse(
    (
      <OgFrame>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <OgBrand />
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: 2.4 }}>MY PROGRESS</span>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: 64,
            width: 1050,
            fontFamily: "Fraunces",
            fontSize: 78,
            lineHeight: 1.06,
            letterSpacing: -3,
          }}
        >
          <span>{headline.lead}&nbsp;</span>
          <Marker>
            <span style={{ fontStyle: "italic" }}>{headline.mark}</span>
          </Marker>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 700 }}>
            <span>
              {lessons} of {totalLessons} lessons · {projects} of {totalProjects} projects
            </span>
            <span>Spent: ₹0</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              height: 18,
              borderRadius: 9,
              background: colors.line,
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", width: `${Math.max(pct, 2)}%`, height: "100%", background: colors.olive }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, fontSize: 20, color: colors.muted }}>
            <span>Free lessons, in order: zeroto.infinitylinkage.com/zerotoinfinity</span>
            <span>Self-reported. Not a certificate.</span>
          </div>
        </div>
      </OgFrame>
    ),
    {
      ...ogSize,
      fonts: await ogFonts(),
      headers: { "Cache-Control": "public, max-age=31536000, immutable" },
    },
  );
}
