import type { EntrySkeletonType } from "contentful";
import { client } from "./client";
import type { EntryResult, Types } from "@/shared/types";
import { transformFields } from "./helpers";
import type { GetEntryById } from "../types";

export const getEntryById: GetEntryById = async <
  S extends readonly string[],
  M extends Record<S[number], Types>
>(
  id: string,
  select: S,
  types: M
): Promise<EntryResult<S, M>> => {
  return client
    .getEntry<EntrySkeletonType<EntryResult<S, M>>>(id)
    .then((entry) => {
      const result = transformFields(select, types, entry);
      return result;
    });
};
