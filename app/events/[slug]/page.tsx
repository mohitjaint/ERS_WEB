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
  params: Promise<{
    slug: string;
  }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  return <EventPageClient slug={slug} />;
}
