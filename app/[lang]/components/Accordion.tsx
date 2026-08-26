"use client";

import { useId, useState } from "react";
import styles from "./Accordion.module.css";

type AccordionProps = {
  question: string;
  answer: string;
};

// A div/button accordion instead of native <details> so open AND close can animate — <details>
// snaps the content to display:none the instant it closes, giving the close transition no time
// to play. The grid-template-rows 0fr/1fr trick below animates both directions without needing
// to measure heights in JS.
export function Accordion({ question, answer }: AccordionProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={styles.item}>
      <button type="button" className={styles.trigger} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}>
        {question}
        <span aria-hidden="true">+</span>
      </button>
      <div className={styles.panel} data-open={open}>
        <div className={styles.panelInner} id={panelId}>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}
