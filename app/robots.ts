import type { MetadataRoute } from "next";
import { siteUrl } from "@/utils/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Authenticated app surface and internal endpoints have nothing for a crawler to index.
      disallow: ["/dashboard", "/profile", "/en/dashboard", "/en/profile", "/api/", "/auth/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
