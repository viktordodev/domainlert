import Link from "next/link";
import { getCurrentUser } from "@/utils/supabase/server";

type AuthCtaProps = {
  className?: string;
  signedInLabel: string;
  signedOutLabel: string;
};

function ctaLink(className: string | undefined, href: string, label: string) {
  return (
    <Link className={className} href={href}>
      {label} <span aria-hidden="true">↗</span>
    </Link>
  );
}

// Reads auth state in its own Suspense boundary (see AuthCtaFallback below), so pages that use
// this — like the marketing homepage — can still prerender to a static shell instead of the
// whole page being forced dynamic just for this one link's destination/label.
export async function AuthCta({ className, signedInLabel, signedOutLabel }: AuthCtaProps) {
  const user = await getCurrentUser();

  return user
    ? ctaLink(className, "/dashboard", signedInLabel)
    : ctaLink(className, "/signup", signedOutLabel);
}

// The signed-out variant, rendered as the Suspense fallback for AuthCta above. Signed-out is
// the common case for a marketing page visitor, so this doubles as the static shell's content.
export function AuthCtaFallback({ className, signedOutLabel }: Pick<AuthCtaProps, "className" | "signedOutLabel">) {
  return ctaLink(className, "/signup", signedOutLabel);
}
