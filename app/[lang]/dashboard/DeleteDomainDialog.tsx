"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import type { Dictionary } from "@/dictionaries";
import { format } from "@/utils/i18n";
import styles from "./DeleteDomainDialog.module.css";

type DeleteCopy = Dictionary["dashboard"]["deleteDialog"];

type DeleteDomainDialogProps = {
  action: (formData: FormData) => Promise<void>;
  domainId: string;
  domainName: string;
  copy: DeleteCopy;
};

function DeleteActions({ closeDialog, copy }: { closeDialog: () => void; copy: DeleteCopy }) {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="button"
        className={styles.cancelButton}
        onClick={closeDialog}
        disabled={pending}
        autoFocus
      >
        {copy.cancel}
      </button>
      <button type="submit" className={styles.deleteButton} disabled={pending} aria-disabled={pending}>
        {pending ? copy.pending : copy.confirm}
      </button>
    </>
  );
}

export function DeleteDomainDialog({ action, domainId, domainName, copy }: DeleteDomainDialogProps) {
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
      <button type="button" className={styles.trigger} onClick={openDialog}>
        {copy.trigger}
      </button>
      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={titleId}>
        <div className={styles.content}>
          <p className={styles.kicker}>{copy.kicker}</p>
          <h2 id={titleId}>{format(copy.title, { name: domainName })}</h2>
          <p>{copy.body}</p>
          <form action={action} className={styles.actions}>
            <input type="hidden" name="domainId" value={domainId} />
            <DeleteActions closeDialog={closeDialog} copy={copy} />
          </form>
        </div>
      </dialog>
    </>
  );
}
