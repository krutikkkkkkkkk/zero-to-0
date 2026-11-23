import { ImageResponse } from "next/og";
import { SectionCard, ogFonts, ogSize } from "@/lib/og";

export const alt = "AI app builders: v0, Lovable, Bolt and Figma Make";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <SectionCard eyebrow="AI APP BUILDERS" lead="Describe an app." mark="Get a working one." chips={["v0", "Lovable", "Bolt", "Figma Make", "Free Vercel hosting"]} path="/resources/ai-builders" />,
    { ...size, fonts: await ogFonts() },
  );
}
