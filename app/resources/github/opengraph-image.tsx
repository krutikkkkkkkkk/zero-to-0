import { ImageResponse } from "next/og";
import { allRepos } from "@/lib/resources";
import { SectionCard, ogFonts, ogSize } from "@/lib/og";

export const alt = "Free AI GitHub repos for beginners";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <SectionCard eyebrow="GITHUB REPOS" lead="Free AI repos" mark="worth starring." chips={[`${allRepos.length} repos`, "Courses", "Prompting", "Local AI", "Automation"]} path="/resources/github" />,
    { ...size, fonts: await ogFonts() },
  );
}
