"use client";

import { FormEvent, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import type { Dictionary } from "@/dictionaries";
import { format } from "@/utils/i18n";
import styles from "./DeleteDomainDialog.module.css";

type AlertsCopy = Dictionary["dashboard"]["alertsDialog"];

type DomainAlertsDialogProps = {
  action: (formData: FormData) => Promise<void>;
  domainId: string;
  domainName: string;
  customThresholds: number[] | null;
  customRecipients: string[] | null;
  defaultThresholds: number[];
  copy: AlertsCopy;
};

function AlertsActions({ closeDialog, copy }: { closeDialog: () => void; copy: AlertsCopy }) {
  const { pending } = useFormStatus();

  return (
    <>
      <button type="button" className={styles.cancelButton} onClick={closeDialog} disabled={pending}>
        {copy.cancel}
      </button>
      <button type="submit" className={styles.saveButton} disabled={pending} aria-disabled={pending}>
        {pending ? copy.pending : copy.save}
      </button>
    </>
  );
}

export function DomainAlertsDialog({
  action,
  domainId,
  domainName,
  customThresholds,
  customRecipients,
  defaultThresholds,
  copy,
}: DomainAlertsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [thresholdError, setThresholdError] = useState("");
  const titleId = `domain-alerts-${domainId}`;

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function validateThresholds(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const value = new FormData(form).get("alertThresholds");
    const thresholdCount =
      typeof value === "string"
        ? value.split(",").map((threshold) => threshold.trim()).filter(Boolean).length
        : 0;

    if (thresholdCount > 5) {
      event.preventDefault();
      setThresholdError(copy.thresholdError);
      return;
    }

    setThresholdError("");
  }

  return (
    <>
      <button type="button" className={styles.trigger} onClick={openDialog}>
        {copy.trigger}
      </button>
      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={titleId}>
        <div className={styles.content}>
          <p className={styles.kicker}>{copy.kicker}</p>
          <h2 id={titleId}>{domainName}</h2>
          <p>{format(copy.thresholdsHelp, { defaults: defaultThresholds.join(", ") })}</p>
          <p className={styles.recipientHint}>{copy.recipientHint}</p>
          <form action={action} onSubmit={validateThresholds} className={`${styles.actions} ${styles.actionsWrap}`}>
            <input type="hidden" name="domainId" value={domainId} />
            <input
              type="text"
              name="alertThresholds"
              defaultValue={customThresholds?.join(", ") ?? ""}
              placeholder={defaultThresholds.join(", ")}
              className={styles.thresholdsInput}
              aria-invalid={Boolean(thresholdError)}
              aria-describedby={thresholdError ? "threshold-error" : undefined}
            />
            {thresholdError && (
              <p id="threshold-error" className={styles.formError} role="alert">
                {thresholdError}
              </p>
            )}
            <input
              type="text"
              name="alertRecipients"
              defaultValue={customRecipients?.join(", ") ?? ""}
              placeholder={copy.recipientPlaceholder}
              className={styles.thresholdsInput}
            />
            <AlertsActions closeDialog={closeDialog} copy={copy} />
          </form>
        </div>
      </dialog>
    </>
  );
}
