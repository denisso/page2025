/**
 * модель для Поста
 */
import type { EntryResult, Types } from "@/shared/types";

/**
 * свойства
 */
export const fields = [
  "slug",
  "title",
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

export type Post = EntryResult<typeof fields, typeof fieldsTypes>;

/**
 * систематизация
 */
export const taxonomies = ["post", "project", "jobs"];
