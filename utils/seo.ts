import type { Metadata } from "next";
import { siteUrl } from "@/utils/site";

type PageMetadataInput = {
  /** Path starting with "/", e.g. "/pricing". Use "/" for the homepage. */
  path: string;
  title: string;
  description: string;
  /** Set false for thin/transactional pages (auth forms) that shouldn't be indexed. */
  index?: boolean;
};

// Next's `title` field supports a template (see app/layout.tsx) that automatically appends
// "| DomainLert" to the <title> tag, but openGraph.title/twitter.title get no such treatment —
// and since only the root layout defines `openGraph`, a page that sets its own `title` without
// its own `openGraph` silently keeps the root's static OG title/description/url. That means a
// shared /pricing link would show the homepage's title and description instead of its own.
// This helper builds all three consistently from one source so that can't drift apart.
export function pageMetadata({ path, title, description, index = true }: PageMetadataInput): Metadata {
  const fullTitle = path === "/" ? title : `${title} | DomainLert`;

  return {
    title,
    description,
    alternates: { canonical: path },
    ...(index ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      type: "website",
      title: fullTitle,
      description,
      url: `${siteUrl}${path}`,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
