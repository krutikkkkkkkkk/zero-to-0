import { ImageResponse } from "next/og";
import { SectionCard, ogFonts, ogSize } from "@/lib/og";

export const alt = "Free AI resources for beginners";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <SectionCard eyebrow="FREE RESOURCES" lead="Everything here is" mark="free." chips={["AI app builders", "GitHub repos", "Website prompts", "Image prompts"]} path="/resources" />,
    { ...size, fonts: await ogFonts() },
  );
}
