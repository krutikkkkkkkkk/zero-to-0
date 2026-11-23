import { ImageResponse } from "next/og";
import { SectionCard, ogFonts, ogSize } from "@/lib/og";

export const alt = "Prompts to build a website with AI";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <SectionCard eyebrow="WEBSITE PROMPTS" lead="Prompts to build a" mark="website with AI." chips={["Portfolio", "Shop page", "Launch page", "Publish free"]} path="/resources/website-prompts" />,
    { ...size, fonts: await ogFonts() },
  );
}
