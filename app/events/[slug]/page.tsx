import { client } from "@/sanity/lib/sanity";
import EventPageClient from "./EventPageClient";

export async function generateStaticParams() {
  const query = `*[_type == "event"]{ "slug": slug.current }`;
  const slugs = await client.fetch(query);

  return slugs.map((item: { slug: string }) => ({
    slug: item.slug,
  }));
}

interface EventPageProps {
  params: {
    slug: string;
  };
}

export default function EventPage({ params }: EventPageProps) {
  return <EventPageClient slug={params.slug} />;
}
