import type { Metadata } from "next";
import type { Dictionary } from "@/dictionaries";
import { getRequestContext } from "@/dictionaries/request";
import { localizePath, ogLocale, type Locale } from "@/utils/i18n";
import { siteUrl } from "@/utils/site";

type PageMetadataInput = {
  locale: Locale;
  /** App-relative path starting with "/", e.g. "/pricing". Use "/" for the homepage. */
  path: string;
  title: string;
  description: string;
  /** Set false for thin/transactional pages (auth forms) that shouldn't be indexed. */
  index?: boolean;
};

// Next's `title` field supports a template (see app/[lang]/layout.tsx) that appends
// "| DomainLert" to the <title> tag, but openGraph.title/twitter.title get no such treatment —
// and only the root layout defines `openGraph`, so a page that sets its own `title` without its
// own `openGraph` silently keeps the root's OG title/description/url. This helper builds all
// three consistently from one source, and wires up per-locale canonical + hreflang alternates.
export function pageMetadata({
  locale,
  path,
  title,
  description,
  index = true,
}: PageMetadataInput): Metadata {
  const canonical = localizePath(locale, path);
  const svPath = localizePath("sv", path);
  const enPath = localizePath("en", path);
  const fullTitle = path === "/" ? title : `${title} | DomainLert`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { "sv-SE": svPath, en: enPath, "x-default": svPath },
    },
    ...(index ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      title: fullTitle,
      description,
      url: `${siteUrl}${canonical}`,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

type MetadataSelection = {
  path: string;
  title: string;
  description: string;
  index?: boolean;
};

/**
 * Builds a page's Metadata from the active locale plus a selector that pulls the right strings
 * out of the resolved dictionary. Reads the locale through the cached `getRequestContext()` so
 * `generateMetadata` stays prerenderable per locale (see dictionaries/request.ts).
 */
export async function buildPageMetadata(
  select: (dict: Dictionary, locale: Locale) => MetadataSelection,
): Promise<Metadata> {
  const { locale, dict } = await getRequestContext();
  return pageMetadata({ locale, ...select(dict, locale) });
}
