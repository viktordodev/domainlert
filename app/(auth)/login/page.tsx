import { AuthForm } from "../AuthForm";
import { signIn } from "../actions";

type LoginPageProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  return <AuthForm action={signIn} mode="login" error={params.error} message={params.message} />;
}