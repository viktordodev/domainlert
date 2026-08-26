import { ProsePage } from "../components/ProsePage";
import { getRequestContext } from "@/dictionaries/request";
import { buildPageMetadata } from "@/utils/seo";

export const generateMetadata = () =>
  buildPageMetadata((dict) => ({
    path: "/about",
    title: dict.about.meta.title,
    description: dict.about.meta.description,
  }));

export default async function AboutPage() {
  const { dict } = await getRequestContext();

  return (
    <ProsePage
      eyebrow={dict.about.eyebrow}
      title={dict.about.title}
      sections={dict.about.sections}
      returnHomeLabel={dict.common.returnHome}
    />
  );
}
