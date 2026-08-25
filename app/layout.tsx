import type { Metadata } from "next";
import { DM_Mono, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { JsonLd } from "./components/JsonLd";
import { siteUrl } from "@/utils/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: "400",
});

const DEFAULT_TITLE = "DomainLert | Know before your domains lapse";
const DEFAULT_DESCRIPTION =
  "Domain expiry monitoring for agencies and teams that cannot afford a missed renewal. Daily checks, configurable alerts, and bulk import — for one flat monthly price.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | DomainLert",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "DomainLert",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DomainLert",
  url: siteUrl,
  description: DEFAULT_DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={organizationJsonLd} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  const storageKey = "domainlert-theme";
  const root = document.documentElement;
  const saved = localStorage.getItem(storageKey);
  const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const theme = saved === "dark" || saved === "light" ? saved : system;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
})();`,
          }}
        />
      </head>
      <body>
        <div className="siteShell">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
