import { AuthForm } from "../AuthForm";
import { signUp } from "../actions";
import { pageMetadata } from "@/utils/seo";

type SignupPageProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

// See app/(auth)/login/page.tsx for why this is noindexed.
export const metadata = pageMetadata({
  path: "/signup",
  title: "Sign up",
  description: "Create a DomainLert account and start monitoring your domains for $8/month.",
  index: false,
});

// See app/(auth)/login/page.tsx for why this opts out of static-shell prerendering.
export const instant = false;

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;
  return <AuthForm action={signUp} mode="signup" error={params.error} message={params.message} />;
}