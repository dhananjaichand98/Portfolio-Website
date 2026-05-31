import site from "@/content/site.json";
import parks from "@/content/parks.json";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.siteUrl;

export default function sitemap() {
  const photoRoutes = [
    {
      url: `${siteUrl}/photography`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    ...parks.map((park) => ({
      url: `${siteUrl}/photography/${park.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7
    }))
  ];

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    },
    ...photoRoutes
  ];
}
