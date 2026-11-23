import { ImageResponse } from "next/og";
import { courseModules, totalLessons } from "@/lib/course";
import { Marker, OgBrand, OgFrame, colors, ogFonts, ogSize } from "@/lib/og";

export const alt = `The free AI course: ${totalLessons} free lessons in ${courseModules.length} modules, each with a project.`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgFrame>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <OgBrand />
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: 2.4 }}>THE FREE AI COURSE</span>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: 54,
            width: 1000,
            fontFamily: "Fraunces",
            fontSize: 80,
            lineHeight: 1.04,
            letterSpacing: -3,
          }}
        >
          <span>Everything a paid AI course teaches.&nbsp;</span>
          <Marker>
            <span style={{ fontStyle: "italic" }}>Free, and in order.</span>
          </Marker>
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: "auto" }}>
          {[
            `${totalLessons} lessons`,
            `${courseModules.length} modules`,
            `${courseModules.length} projects`,
            "No account",
            "₹0",
          ].map((t) => (
            <span
              key={t}
              style={{
                display: "flex",
                padding: "10px 18px",
                border: `2px solid ${colors.ink}`,
                borderRadius: 10,
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, fontSize: 20, color: colors.muted }}>
          <span>From Anthropic, OpenAI, Google, n8n, Figma, freeCodeCamp and more</span>
          <span style={{ fontWeight: 700, color: colors.ink }}>zeroto.infinitylinkage.com</span>
        </div>
      </OgFrame>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
