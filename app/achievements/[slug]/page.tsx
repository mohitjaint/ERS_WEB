import { client } from "@/sanity/lib/sanity";
import AchievementPageClient from "./AchievementPageClient";

export async function generateStaticParams() {
  const query = `*[_type == "achievement"]{ "slug": slug.current }`;
  const slugs = await client.fetch(query);

  return slugs.map((item: { slug: string }) => ({
    slug: item.slug,
  }));
}

interface AchievementPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AchievementPage({ params }: AchievementPageProps) {
  const { slug } = await params;
  return <AchievementPageClient slug={slug} />;
}
