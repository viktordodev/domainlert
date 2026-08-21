import { AuthForm } from "../AuthForm";
import { signUp } from "../actions";

type SignupPageProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;
  return <AuthForm action={signUp} mode="signup" error={params.error} message={params.message} />;
}