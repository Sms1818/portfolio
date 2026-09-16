import { WorkspaceApp } from "@/components/workspace/shell";
import { getWork, person } from "@/lib/brain";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const slug = (await params).slug ?? [];
  const id = slug[1];
  const item = id ? getWork(id) : undefined;
  if (item) {
    return { title: item.name, description: item.summary };
  }
  if (slug[0] === "ask") return { title: "Ask Sahil" };
  if (slug[0] === "match") return { title: "Match Role" };
  if (slug[0] === "resume") return { title: "Resume" };
  return {
    title: "Engineering workspace",
    description: `${person.name}'s personal engineering workspace.`,
  };
}

export default async function ExplorePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ about?: string }>;
}) {
  const { slug } = await params;
  const { about } = await searchParams;
  return <WorkspaceApp slug={slug ?? []} about={about} />;
}

