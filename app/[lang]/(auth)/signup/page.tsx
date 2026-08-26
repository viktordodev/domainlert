import { AuthForm } from "../AuthForm";
import { signUp } from "../actions";
import { getRequestContext } from "@/dictionaries/request";
import { buildPageMetadata } from "@/utils/seo";

type SignupPageProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

// See app/[lang]/(auth)/login/page.tsx for why this is noindexed.
export const generateMetadata = () =>
  buildPageMetadata((dict) => ({
    path: "/signup",
    title: dict.auth.signup.meta.title,
    description: dict.auth.signup.meta.description,
    index: false,
  }));

// See app/[lang]/(auth)/login/page.tsx for why this opts out of static-shell prerendering.
export const instant = false;

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const { locale, dict } = await getRequestContext();
  const params = await searchParams;

  return (
    <AuthForm
      action={signUp}
      mode="signup"
      locale={locale}
      auth={dict.auth}
      error={params.error}
      message={params.message}
    />
  );
}
