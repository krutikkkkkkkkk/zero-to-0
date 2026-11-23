import type { Metadata } from "next";
import { PromptLibrary } from "@/components/resources/prompt-library";
import { imagePromptFormula, imagePromptGroups, imageTools } from "@/lib/resources";

export const metadata: Metadata = {
  alternates: { canonical: "/resources/image-prompts" },
  title: "Image prompts — Zero to ₹0",
  description: "Copy-paste prompts for product photos, social posts, thumbnails, posters and more, for free AI image tools.",
};

export default function ImagePromptsPage() {
  return (
    <PromptLibrary
      eyebrow="FREE RESOURCES · IMAGE PROMPTS"
      title="Prompts for images that look intentional."
      intro="Product photos, social posts, thumbnails, posters and website graphics. Every prompt follows the same six-part formula, so you can write your own once you've used a few."
      tools={imageTools}
      groups={imagePromptGroups}
      open={["chatgpt"]}
      before={
        <section aria-labelledby="formula-title" className="mt-12 rounded-[11px] border border-ink bg-[#fffef9] p-6 max-md:p-5">
          <h2 id="formula-title" className="text-[26px] tracking-[-0.8px]">
            The six-part formula
          </h2>
          <ol className="mt-4 mb-0 grid grid-cols-3 gap-x-6 gap-y-4 pl-0 max-xl:grid-cols-2 max-xs:grid-cols-1">
            {imagePromptFormula.map(([name, text], i) => (
              <li key={name} className="flex gap-3 text-[14px] leading-[1.55]">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-marker text-[11px] font-extrabold text-[#1c1917]">
                  {i + 1}
                </span>
                <span>
                  <strong>{name}.</strong> {text}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-5 mb-0 text-[13px] text-muted">
            Use images of real people only with their permission, don&apos;t imitate living artists or brands, and check
            any text in the image letter by letter.
          </p>
        </section>
      }
    />
  );
}
