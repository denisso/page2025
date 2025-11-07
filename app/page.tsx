import type { Metadata } from "next";
import { getEntry, getEntries } from "@/entities/contentEntry";
import { getEnv } from "@/shared/lib";
import { formatDate } from "@/shared/lib/formatDate";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getEntry<["title"]>(
    getEnv("PAGE_ABOUTME_ID")
  );
  return {
    title: pageData.fields.title,
  };
}

export default async function Home() {
  const pageData = await getEntry<["title"]>(getEnv("PAGE_ABOUTME_ID"));
  const posts = await getEntries({
    fields: ["title"],
    limit: 10,
    taxonomies: [getEnv("PREVIEW_TAXONOMY")],
  });
  return (
    <>
      <div>{pageData.fields.title}</div>
      <div>
        {posts.entries.map((e) => (
          <div key={e.sys.id}>
            <div>Date: {formatDate(e.sys.createdAt)}</div>
            <div>{e.fields.title}</div>
          </div>
        ))}
      </div>
    </>
  );
}
