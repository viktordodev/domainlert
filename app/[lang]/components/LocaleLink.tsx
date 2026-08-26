import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { getRequestLocale } from "@/dictionaries/request";
import { localizePath } from "@/utils/i18n";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  children: ReactNode;
};

const ABSOLUTE = /^(https?:|mailto:|tel:|#)/;

/**
 * Like next/link, but rewrites app-relative hrefs to the current locale's visible path
 * (Swedish stays bare, English gets an /en prefix). External, mailto, tel and pure-hash
 * hrefs are passed through untouched. Server Component only.
 */
export async function LocaleLink({ href, children, ...rest }: LocaleLinkProps) {
  const locale = await getRequestLocale();
  const resolved = ABSOLUTE.test(href) ? href : localizePath(locale, href);
  return (
    <Link href={resolved} {...rest}>
      {children}
    </Link>
  );
}
