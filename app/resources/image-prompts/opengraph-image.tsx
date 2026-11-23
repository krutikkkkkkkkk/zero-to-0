import { ImageResponse } from "next/og";
import { SectionCard, ogFonts, ogSize } from "@/lib/og";

export const alt = "Prompts for AI images";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <SectionCard eyebrow="IMAGE PROMPTS" lead="Prompts for images that" mark="look intentional." chips={["Product photos", "Social posts", "Thumbnails", "Posters"]} path="/resources/image-prompts" />,
    { ...size, fonts: await ogFonts() },
  );
}
