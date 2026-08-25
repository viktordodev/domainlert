import { AuthForm } from "../AuthForm";
import { signIn } from "../actions";
import { pageMetadata } from "@/utils/seo";

type LoginPageProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

// Thin, duplicate-ish form content with no unique search intent of its own — the marketing
// pages (/, /pricing, /features) are what should rank; this is just the conversion endpoint.
export const metadata = pageMetadata({
  path: "/login",
  title: "Log in",
  description: "Log in to your DomainLert account to see your managed domains and upcoming expiry alerts.",
  index: false,
});

// A per-submission form driven by query-string state (?error=, ?message=) — nothing here
// benefits from a static shell, so this opts out of Cache Components' prerender validation
// rather than adding a Suspense boundary around the whole form for no real gain.
export const instant = false;

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  return <AuthForm action={signIn} mode="login" error={params.error} message={params.message} />;
}