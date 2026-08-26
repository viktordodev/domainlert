import { Fragment, type ReactNode } from "react";
import { LocaleLink } from "./LocaleLink";

// Renders a dictionary string, turning markdown-style links "[label](/path)" into locale-aware
// links. mailto:/https:/tel:/# targets render as plain <a>; everything else as <LocaleLink>.
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const PLAIN_ANCHOR = /^(https?:|mailto:|tel:|#)/;

export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  for (const match of text.matchAll(LINK)) {
    const [full, label, href] = match;
    const start = match.index ?? 0;

    if (start > cursor) {
      nodes.push(<Fragment key={key++}>{text.slice(cursor, start)}</Fragment>);
    }

    nodes.push(
      PLAIN_ANCHOR.test(href) ? (
        <a key={key++} href={href}>
          {label}
        </a>
      ) : (
        <LocaleLink key={key++} href={href}>
          {label}
        </LocaleLink>
      ),
    );

    cursor = start + full.length;
  }

  if (cursor < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(cursor)}</Fragment>);
  }

  return <>{nodes}</>;
}
