import type { Metadata } from "next";
import { getEntry } from "@/entities/contentEntry";
import { getEnv } from "@/shared/lib";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getEntry<"pages">(getEnv("PAGE_ABOUTME_ID"));
  return {
    title: pageData.fields.title,
  };
}

export default async function Home() {
  const pageData = await getEntry<"pages">(getEnv("PAGE_ABOUTME_ID"));

  return <>{pageData.fields.body}</>;
}
