import type { Metadata } from "next";
import { getEntry } from "@/shared/api";
import { getEnv } from "@/shared/lib";
import { ListPosts } from "@/widgets/ListPosts";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getEntry<["title"]>(getEnv("PAGE_ABOUTME_ID"));
  return {
    title: pageData.fields.title,
  };
}

export default async function Home() {
  const pageData = await getEntry<["title"]>(getEnv("PAGE_ABOUTME_ID"));

  return (
    <>
      <div>{pageData.fields.title}</div>
      <ListPosts />
    </>
  );
}
