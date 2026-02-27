import site from "@/content/site.json";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.siteUrl;

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
