import { notFound } from "next/navigation";

// Last-resort route: any path under a locale that matches nothing else lands here and renders
// the localized not-found UI (app/[lang]/not-found.tsx) inside the site shell, instead of the
// framework's bare default 404. It always 404s, so there is nothing to prerender or prefetch.
export const instant = false;

export default function CatchAllNotFound(): never {
  notFound();
}
