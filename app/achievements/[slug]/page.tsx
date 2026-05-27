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
  params: {
    slug: string;
  };
}

export default function AchievementPage({ params }: AchievementPageProps) {
  return <AchievementPageClient slug={params.slug} />;
}
