"use client";

import { useFormStatus } from "react-dom";
import styles from "./auth.module.css";

type SubmitButtonProps = {
  label: string;
  pendingMessage: string;
  pendingLabel: string;
};

export function SubmitButton({ label, pendingMessage, pendingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending && (
        <p className={styles.pending} role="status" aria-live="polite">
          {pendingMessage}
        </p>
      )}
      <button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? pendingLabel : label}
        <span aria-hidden="true">↗</span>
      </button>
    </>
  );
}
