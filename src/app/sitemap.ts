import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];

  const routes = ["", "/academy", "/resources", "/media", "/community", "/about"];
  return routes.map((route, index) => ({
    url: `${siteUrl.replace(/\/$/, "")}${route}`,
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.7,
  }));
}
