import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/share";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Don't block /progress-card or the opengraph images: X and LinkedIn read robots.txt before fetching previews.
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
