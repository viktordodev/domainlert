"use client";

// Renders a raw inline <script> that runs synchronously during HTML parsing (before first paint).
//
// On the server it emits `type="text/javascript"` so the browser executes it on the initial load.
// On the client it emits `type="text/plain"`, which React treats as an inert data block — this is
// what stops React's dev-only "Encountered a script tag while rendering React component" warning
// when the surrounding layout re-renders (e.g. on a locale switch, when <html lang> changes).
// `suppressHydrationWarning` absorbs the resulting type attribute mismatch.
export function InlineScript({ id, html }: { id: string; html: string }) {
  return (
    <script
      id={id}
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
