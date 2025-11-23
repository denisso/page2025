import type { EntryResult } from "@/shared/types";

export type Post = EntryResult<
  ["slug", "title", "image", "body", "description"]
>;
