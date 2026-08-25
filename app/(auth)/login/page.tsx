import { AuthForm } from "../AuthForm";
import { signIn } from "../actions";

type LoginPageProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

// A per-submission form driven by query-string state (?error=, ?message=) — nothing here
// benefits from a static shell, so this opts out of Cache Components' prerender validation
// rather than adding a Suspense boundary around the whole form for no real gain.
export const instant = false;

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  return <AuthForm action={signIn} mode="login" error={params.error} message={params.message} />;
}