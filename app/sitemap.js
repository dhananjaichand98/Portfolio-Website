import site from "@/content/site.json";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.siteUrl;

export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
