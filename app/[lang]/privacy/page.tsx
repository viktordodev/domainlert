import { ProsePage } from "../components/ProsePage";
import { getRequestContext } from "@/dictionaries/request";
import { buildPageMetadata } from "@/utils/seo";

export const generateMetadata = () =>
  buildPageMetadata((dict) => ({
    path: "/privacy",
    title: dict.privacy.meta.title,
    description: dict.privacy.meta.description,
  }));

export default async function PrivacyPage() {
  const { dict } = await getRequestContext();

  return (
    <ProsePage
      eyebrow={dict.privacy.eyebrow}
      title={dict.privacy.title}
      updated={dict.privacy.updated}
      sections={dict.privacy.sections}
      returnHomeLabel={dict.common.returnHome}
    />
  );
}
