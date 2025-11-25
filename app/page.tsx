import type { Metadata } from "next";
import { getPage } from "@/entities/page";
import { getEnv } from "@/shared/lib";
import { ListPosts } from "@/entities/post/ui/ListPosts";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPage(getEnv("PAGE_ABOUTME_ID"));
  return {
    title: pageData.fields.title,
  };
}

export default async function Home() {
  const pageData = await getPage(getEnv("PAGE_ABOUTME_ID"));

  return (
    <>
      <div>{pageData.fields.title}</div>
      <ListPosts />
    </>
  );
}
