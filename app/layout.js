import "./globals.css";
import Script from "next/script";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import profile from "@/content/profile.json";
import site from "@/content/site.json";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap"
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.siteUrl;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: site.siteName,
  description:
    "Frontend Software Engineer portfolio featuring projects, experience, and design-forward web work.",
  openGraph: {
    title: site.siteName,
    description:
      "Frontend Software Engineer portfolio featuring projects, experience, and design-forward web work.",
    url: siteUrl,
    siteName: site.siteName,
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: site.siteName,
    description:
      "Frontend Software Engineer portfolio featuring projects, experience, and design-forward web work."
  }
};

export default function RootLayout({ children }) {
  const cloudflareToken = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: profile.email,
    sameAs: profile.socials
      .map((social) => social.url)
      .filter((url) => url.startsWith("http")),
    address: {
      "@type": "PostalAddress",
      addressLocality: "New York",
      addressRegion: "NY",
      addressCountry: "US"
    },
    url: siteUrl
  };

  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>
        {children}

        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {cloudflareToken ? (
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: cloudflareToken })}
          />
        ) : null}
      </body>
    </html>
  );
}
