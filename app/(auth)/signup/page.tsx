import { AuthForm } from "../AuthForm";
import { signUp } from "../actions";

type SignupPageProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

// See app/(auth)/login/page.tsx for why this opts out of static-shell prerendering.
export const instant = false;

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;
  return <AuthForm action={signUp} mode="signup" error={params.error} message={params.message} />;
}