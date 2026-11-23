import type { Metadata } from "next";
import { PromptLibrary } from "@/components/resources/prompt-library";
import { websitePromptGroups, websiteTools } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Website prompts — Zero to ₹0",
  description: "Copy-paste prompts to build, improve and publish a website with free AI tools. No coding experience needed.",
};

export default function WebsitePromptsPage() {
  return (
    <PromptLibrary
      eyebrow="FREE RESOURCES · WEBSITE PROMPTS"
      title="Prompts to build a website with AI."
      intro="From a one-page portfolio to a shop menu with a WhatsApp button. Each prompt asks for a single HTML file you can preview straight away and publish for free."
      tools={websiteTools}
      groups={websitePromptGroups}
    />
  );
}
