import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

const lastModified = new Date("2026-08-12T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/privacidad"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terminos"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
