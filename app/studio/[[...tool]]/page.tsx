export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Sanity Studio</h1>
      <p>
        The Studio is not available in this static build. Run it locally with
        <code> npx sanity dev</code> or deploy Studio separately.
      </p>
    </main>
  );
}
