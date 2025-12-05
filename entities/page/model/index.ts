import type { EntryResult, Types } from "@/shared/types";

export const fields = [
  "slug",
  "title",
  // "json",
  "image",
  "body",
  "description",
] as const;

/**
 * типы свойств
 */
export const fieldsTypes = {
  slug: "string",
  title: "string",
  image: "image",
  body: "string",
  description: "string",
} satisfies Record<(typeof fields)[number], Types>;

// export const jsonDatas = {
//   home: ["f1"],
//   projects: ["f4", "f5"],
//   posts: ["f1", "f2", "f3"],
// } as const;

export type Page = EntryResult<typeof fields, typeof fieldsTypes>;
export const pageNames = ["home", "projects", "posts"] as const;
