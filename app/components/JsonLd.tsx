// `data` is always a schema.org object we construct ourselves from static/known values —
// never raw user input — so serializing it straight into a script tag is safe here.
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
