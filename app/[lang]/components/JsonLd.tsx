// `data` is always a schema.org object we construct ourselves from static/known values (including
// dictionary copy) — never raw user input. The `<` → `<` escape is defence-in-depth against
// a stray "</script>" in the payload, per the Next.js JSON-LD guide. `type="application/ld+json"`
// is an inert data block, so this does not trigger React's client-render <script> warning.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
