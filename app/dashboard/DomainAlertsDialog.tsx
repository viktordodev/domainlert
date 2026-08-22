"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import styles from "./DeleteDomainDialog.module.css";

type DomainAlertsDialogProps = {
  action: (formData: FormData) => Promise<void>;
  domainId: string;
  domainName: string;
  customThresholds: number[] | null;
  defaultThresholds: number[];
};

function AlertsActions({ closeDialog }: { closeDialog: () => void }) {
  const { pending } = useFormStatus();

  return (
    <>
      <button type="button" className={styles.cancelButton} onClick={closeDialog} disabled={pending}>Cancel</button>
      <button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? "Saving..." : "Save"}
      </button>
    </>
  );
}

export function DomainAlertsDialog({ action, domainId, domainName, customThresholds, defaultThresholds }: DomainAlertsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `domain-alerts-${domainId}`;

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button type="button" className={styles.trigger} onClick={openDialog}>Alerts</button>
      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={titleId}>
        <div className={styles.content}>
          <p className={styles.kicker}>Expiry alerts</p>
          <h2 id={titleId}>{domainName}</h2>
          <p>
            Days before expiry to email you, separated by commas. Leave blank to use your default ({defaultThresholds.join(", ")}).
          </p>
          <form action={action} className={`${styles.actions} ${styles.actionsWrap}`}>
            <input type="hidden" name="domainId" value={domainId} />
            <input
              type="text"
              name="alertThresholds"
              defaultValue={customThresholds?.join(", ") ?? ""}
              placeholder={defaultThresholds.join(", ")}
              className={styles.thresholdsInput}
            />
            <AlertsActions closeDialog={closeDialog} />
          </form>
        </div>
      </dialog>
    </>
  );
}
