import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/share";

/** Every public page. Progress share pages are left out on purpose (they're noindex). */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly"][] = [
    ["/", 1, "monthly"],
    ["/zerotoinfinity", 1, "weekly"],
    ["/resources", 0.8, "weekly"],
    ["/resources/ai-builders", 0.8, "weekly"],
    ["/resources/github", 0.7, "monthly"],
    ["/resources/website-prompts", 0.7, "monthly"],
    ["/resources/image-prompts", 0.7, "monthly"],
    ["/privacy", 0.2, "yearly"],
    ["/terms", 0.2, "yearly"],
  ];
  return pages.map(([path, priority, changeFrequency]) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency,
    priority,
  }));
}
