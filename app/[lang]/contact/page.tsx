import { ProsePage } from "../components/ProsePage";
import { getRequestContext } from "@/dictionaries/request";
import { buildPageMetadata } from "@/utils/seo";

export const generateMetadata = () =>
  buildPageMetadata((dict) => ({
    path: "/contact",
    title: dict.contact.meta.title,
    description: dict.contact.meta.description,
  }));

export default async function ContactPage() {
  const { dict } = await getRequestContext();

  return (
    <ProsePage
      eyebrow={dict.contact.eyebrow}
      title={dict.contact.title}
      sections={dict.contact.sections}
      returnHomeLabel={dict.common.returnHome}
    />
  );
}
