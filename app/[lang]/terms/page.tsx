import { ProsePage } from "../components/ProsePage";
import { getRequestContext } from "@/dictionaries/request";
import { buildPageMetadata } from "@/utils/seo";

export const generateMetadata = () =>
  buildPageMetadata((dict) => ({
    path: "/terms",
    title: dict.terms.meta.title,
    description: dict.terms.meta.description,
  }));

export default async function TermsPage() {
  const { dict } = await getRequestContext();

  return (
    <ProsePage
      eyebrow={dict.terms.eyebrow}
      title={dict.terms.title}
      updated={dict.terms.updated}
      sections={dict.terms.sections}
      returnHomeLabel={dict.common.returnHome}
    />
  );
}
