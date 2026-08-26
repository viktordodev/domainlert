import { LocaleLink } from "./LocaleLink";
import { RichText } from "./RichText";
import styles from "../legal.module.css";

type Section = { heading: string; body: string[] };

type ProsePageProps = {
  eyebrow: string;
  title: string;
  updated?: string;
  sections: Section[];
  returnHomeLabel: string;
};

type Block = { type: "p"; text: string } | { type: "ul"; items: string[] };

// Groups a flat body: string[] into paragraphs and lists (consecutive "- " lines).
function toBlocks(body: string[]): Block[] {
  const blocks: Block[] = [];

  for (const line of body) {
    if (line.startsWith("- ")) {
      const last = blocks[blocks.length - 1];
      if (last?.type === "ul") last.items.push(line.slice(2));
      else blocks.push({ type: "ul", items: [line.slice(2)] });
    } else {
      blocks.push({ type: "p", text: line });
    }
  }

  return blocks;
}

function Blocks({ body }: { body: string[] }) {
  return (
    <>
      {toBlocks(body).map((block, index) =>
        block.type === "ul" ? (
          <ul key={index}>
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <RichText text={item} />
              </li>
            ))}
          </ul>
        ) : (
          <p key={index}>
            <RichText text={block.text} />
          </p>
        ),
      )}
    </>
  );
}

/** Shared shell for the About / Contact / Privacy / Terms pages. */
export function ProsePage({ eyebrow, title, updated, sections, returnHomeLabel }: ProsePageProps) {
  return (
    <main className={styles.page}>
      <article className={styles.content}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        {updated ? <p className={styles.updated}>{updated}</p> : null}
        <div className={styles.body}>
          {sections.map((section, index) => (
            <section className={styles.section} key={index}>
              <h2>{section.heading}</h2>
              <Blocks body={section.body} />
              {index === sections.length - 1 ? (
                <p>
                  <LocaleLink href="/">{returnHomeLabel}</LocaleLink>
                </p>
              ) : null}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
