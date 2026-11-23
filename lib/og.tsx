import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactNode } from "react";

/** Shared pieces for generated images (social previews and progress cards). 1200×630 everywhere. */
export const ogSize = { width: 1200, height: 630 };

export const colors = {
  paper: "#fffaf0",
  receipt: "#fffef9",
  ink: "#1c1917",
  muted: "#716a60",
  marker: "#fde047",
  line: "#e8e0d2",
  olive: "#938221",
};

const fontDir = join(process.cwd(), "assets/fonts");
const font = (file: string) => readFile(join(fontDir, file));

export async function ogFonts() {
  const [serif, serifItalic, sans, sansBold, sansHeavy] = await Promise.all([
    font("Fraunces-SemiBold.woff"),
    font("Fraunces-SemiBoldItalic.woff"),
    font("PublicSans-Medium.woff"),
    font("PublicSans-Bold.woff"),
    font("PublicSans-ExtraBold.woff"),
  ]);
  return [
    { name: "Fraunces", data: serif, weight: 600 as const, style: "normal" as const },
    { name: "Fraunces", data: serifItalic, weight: 600 as const, style: "italic" as const },
    { name: "Public Sans", data: sans, weight: 500 as const, style: "normal" as const },
    { name: "Public Sans", data: sansBold, weight: 700 as const, style: "normal" as const },
    { name: "Public Sans", data: sansHeavy, weight: 800 as const, style: "normal" as const },
  ];
}

/** "Zero to ₹0" wordmark, matching the site header. */
export function OgBrand({ scale = 1 }: { scale?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", fontFamily: "Fraunces", fontSize: 38 * scale, letterSpacing: -1.5 }}>
      <span>Zero to</span>
      <span
        style={{
          marginLeft: 10 * scale,
          padding: `${2 * scale}px ${8 * scale}px`,
          background: colors.marker,
          borderRadius: 6 * scale,
          transform: "rotate(-2deg)",
        }}
      >
        ₹0
      </span>
    </div>
  );
}

/** Text with the yellow marker highlight used on the site. */
export function Marker({ children }: { children: ReactNode }) {
  return (
    <span style={{ display: "flex", position: "relative", padding: "0 8px" }}>
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "34%",
          bottom: "4%",
          background: colors.marker,
          transform: "rotate(-1deg)",
        }}
      />
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  );
}

export function OgFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: colors.paper,
        color: colors.ink,
        fontFamily: "Public Sans",
        padding: "56px 72px",
      }}
    >
      {children}
    </div>
  );
}

/** Card used for section pages (Resources): eyebrow, a headline with a marked phrase, chips, URL. */
export function SectionCard({
  eyebrow,
  lead,
  mark,
  chips,
  path,
}: {
  eyebrow: string;
  lead: string;
  mark: string;
  chips: string[];
  path: string;
}) {
  return (
    <OgFrame>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <OgBrand />
        <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: 2.4 }}>{eyebrow}</span>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: 54,
          width: 1040,
          fontFamily: "Fraunces",
          fontSize: 78,
          lineHeight: 1.05,
          letterSpacing: -3,
        }}
      >
        <span>{lead}&nbsp;</span>
        <Marker>
          <span style={{ fontStyle: "italic" }}>{mark}</span>
        </Marker>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: "auto" }}>
        {chips.map((t) => (
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
        <span>Free for beginners. No sign-up, no upsell.</span>
        <span style={{ fontWeight: 700, color: colors.ink }}>zeroto.infinitylinkage.com{path}</span>
      </div>
    </OgFrame>
  );
}
