import type { EntryResult } from "@/shared/types";

export const fields = [
  "slug",
  "title",
  "json",
  "image",
  "body",
  "description",
] as const;

export type Page = EntryResult<(typeof fields)[number][]>;