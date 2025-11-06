import type { Metadata } from "next";
import { getEntry, getEntries } from "@/entities/contentEntry";
import { getEnv } from "@/shared/lib";
import { NamesFields } from "@/entities/contentEntry";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getEntry<NamesFields["pages"][]>(
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
    taxonomies: ["preview1"],
  });
  return (
    <>
      <div>{pageData.fields.title}</div>
      <div>
        {posts.map((e) => (
          <div key={e.sys.id}>{e.fields.title}</div>
        ))}
      </div>
    </>
  );
}
