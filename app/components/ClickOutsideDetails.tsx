"use client";

import { useEffect, useRef } from "react";

type ClickOutsideDetailsProps = {
  className: string;
  children: React.ReactNode;
};

export function ClickOutsideDetails({ className, children }: ClickOutsideDetailsProps) {
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

  return <details ref={detailsRef} className={className}>{children}</details>;
}