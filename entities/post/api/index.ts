import type { Fields } from "@/shared/types";
import { getEntry, getEntries } from "@/shared/api";
import { fields } from "../model";
import { cache } from "react";

export const getPost = cache((id: string) => {
  return getEntry(id, fields);
});

export const getPosts = cache(<T extends readonly Fields[]>(
  taxonomies: string[],
  fields: T,
  limit: number = 10
) => {
  return getEntries({ type: "posts", taxonomies, fields, limit });
});
