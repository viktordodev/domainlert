"use client";

import { FormEvent, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import styles from "./DeleteDomainDialog.module.css";

type DomainAlertsDialogProps = {
  action: (formData: FormData) => Promise<void>;
  domainId: string;
  domainName: string;
  customThresholds: number[] | null;
  customRecipients: string[] | null;
  defaultThresholds: number[];
};

function AlertsActions({ closeDialog }: { closeDialog: () => void }) {
  const { pending } = useFormStatus();

  return (
    <>
      <button type="button" className={styles.cancelButton} onClick={closeDialog} disabled={pending}>Cancel</button>
      <button type="submit" className={styles.saveButton} disabled={pending} aria-disabled={pending}>
        {pending ? "Saving..." : "Save"}
      </button>
    </>
  );
}

export function DomainAlertsDialog({ action, domainId, domainName, customThresholds, customRecipients, defaultThresholds }: DomainAlertsDialogProps) {
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
    const thresholdCount = typeof value === "string"
      ? value.split(",").map((threshold) => threshold.trim()).filter(Boolean).length
      : 0;

    if (thresholdCount > 5) {
      event.preventDefault();
      setThresholdError("Use 5 or fewer custom thresholds.");
      return;
    }

    setThresholdError("");
  }

  return (
    <>
      <button type="button" className={styles.trigger} onClick={openDialog}>Alerts</button>
      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={titleId}>
        <div className={styles.content}>
          <p className={styles.kicker}>Expiry alerts</p>
          <h2 id={titleId}>{domainName}</h2>
          <p>
            Add up to 5 custom thresholds, separated by commas. Leave blank to use your default ({defaultThresholds.join(", ")}).
          </p>
          <p className={styles.recipientHint}>Add up to 3 custom email recipients for this domain, separated by commas. Leave blank to alert your account email.</p>
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
            {thresholdError && <p id="threshold-error" className={styles.formError} role="alert">{thresholdError}</p>}
            <input
              type="text"
              name="alertRecipients"
              defaultValue={customRecipients?.join(", ") ?? ""}
              placeholder="Email recipients (up to 3)"
              className={styles.thresholdsInput}
            />
            <AlertsActions closeDialog={closeDialog} />
          </form>
        </div>
      </dialog>
    </>
  );
}
