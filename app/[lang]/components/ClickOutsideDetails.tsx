"use client";

import { useEffect, useRef } from "react";

type ClickOutsideDetailsProps = {
  className: string;
  children: React.ReactNode;
  closeOnLinkClick?: boolean;
};

export function ClickOutsideDetails({ className, children, closeOnLinkClick = false }: ClickOutsideDetailsProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function closeOnOutsidePointer(event: PointerEvent) {
      const details = detailsRef.current;

      if (details?.open && event.target instanceof Node && !details.contains(event.target)) {
        details.open = false;
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, []);

  function closeOnLinkClickHandler(event: React.MouseEvent<HTMLDetailsElement>) {
    if (closeOnLinkClick && event.target instanceof Element && event.target.closest("a")) {
      detailsRef.current?.removeAttribute("open");
    }
  }

  return <details ref={detailsRef} className={className} onClick={closeOnLinkClickHandler}>{children}</details>;
}