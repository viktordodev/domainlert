"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import styles from "./DeleteDomainDialog.module.css";

type DeleteDomainDialogProps = {
  action: (formData: FormData) => Promise<void>;
  domainId: string;
  domainName: string;
};

function DeleteActions({ closeDialog }: { closeDialog: () => void }) {
  const { pending } = useFormStatus();

  return (
    <>
      <button type="button" className={styles.cancelButton} onClick={closeDialog} disabled={pending} autoFocus>Cancel</button>
      <button type="submit" className={styles.deleteButton} disabled={pending} aria-disabled={pending}>
        {pending ? "Deleting..." : "Delete domain"}
      </button>
    </>
  );
}

export function DeleteDomainDialog({ action, domainId, domainName }: DeleteDomainDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `delete-domain-${domainId}`;

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button type="button" className={styles.trigger} onClick={openDialog}>Delete</button>
      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={titleId}>
        <div className={styles.content}>
          <p className={styles.kicker}>Remove domain</p>
          <h2 id={titleId}>Delete {domainName}?</h2>
          <p>This will remove the domain and its monitoring history from your account.</p>
          <form action={action} className={styles.actions}>
            <input type="hidden" name="domainId" value={domainId} />
            <DeleteActions closeDialog={closeDialog} />
          </form>
        </div>
      </dialog>
    </>
  );
}