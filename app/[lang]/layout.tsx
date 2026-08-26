import type { Metadata } from "next";
import { DM_Mono, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { InlineScript } from "./components/InlineScript";
import { JsonLd } from "./components/JsonLd";
import { getRequestContext } from "@/dictionaries/request";
import { htmlLang, ogLocale } from "@/utils/i18n";
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

const THEME_SCRIPT = `(() => {
  const storageKey = "domainlert-theme";
  const root = document.documentElement;
  const saved = localStorage.getItem(storageKey);
  const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const theme = saved === "dark" || saved === "light" ? saved : system;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
})();`;

export function generateStaticParams() {
  return [{ lang: "sv" }, { lang: "en" }];
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getRequestContext();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.defaultTitle,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.defaultDescription,
    alternates: {
      canonical: locale === "sv" ? "/" : "/en",
      languages: { "sv-SE": "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: "DomainLert",
      locale: ogLocale(locale),
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
      url: locale === "sv" ? siteUrl : `${siteUrl}/en`,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const { locale, dict } = await getRequestContext();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DomainLert",
    url: siteUrl,
    description: dict.meta.defaultDescription,
  };

  return (
    <html
      lang={htmlLang(locale)}
      className={`${manrope.variable} ${playfair.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={organizationJsonLd} />
        <InlineScript id="theme-init" html={THEME_SCRIPT} />
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
