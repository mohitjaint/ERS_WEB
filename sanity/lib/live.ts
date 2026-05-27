import { client } from "./client";

type SanityFetchArgs = {
  query: string;
  params?: Record<string, unknown>;
};

export async function sanityFetch({ query, params }: SanityFetchArgs) {
  const data = await client.fetch(query, params);
  return { data };
}

export function SanityLive() {
  return null;
}
