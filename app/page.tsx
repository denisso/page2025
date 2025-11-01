// import type { Metadata } from "next";
import { getEntry } from "@/entities/contentEntry";
import { getEnv } from "@/shared/lib";

// export async function generateMetadata(): Promise<Metadata> {
//   return;
// }

// type Page = { body: string; metadata: { title: string; description: string } };

export default async function Home() {
  const pageData = await getEntry<"pages">(getEnv("PAGE_ABOUTME_ID"));
  // const metadata = { title: pageData.fields.title };
  return <>{pageData.fields.title}</>;
}
