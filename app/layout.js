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
const siteDescription =
  "Dhananjai Chand is a frontend software engineer in New York building polished, accessible, and performant web experiences.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: site.siteName,
  description: siteDescription,
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/assets/apple-touch-icon.png"
  },
  openGraph: {
    title: site.siteName,
    description: siteDescription,
    url: siteUrl,
    siteName: site.siteName,
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dhananjai Chand portfolio preview"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: site.siteName,
    description: siteDescription,
    images: ["/assets/og-image.png"]
  }
};

export default function RootLayout({ children }) {
  const cloudflareToken = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: profile.name,
        alternateName: site.siteName,
        url: siteUrl
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.name,
        jobTitle: site.heroTagline,
        email: profile.email,
        image: `${siteUrl}${profile.photo}`,
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
      }
    ]
  };

  return (
    <html lang="en" data-theme="dark" className={`${headingFont.variable} ${bodyFont.variable}`}>
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
