import type { Fields, EntryResult } from "@/shared/types";
import type { GetEntriesProps, GetEntriesResult } from "./types";
import * as client from "./contentful";

export const getEntry = async <T extends readonly Fields[]>(
  id: string,
  fields: T
): Promise<EntryResult<T>> => client.getEntry<T>(id, fields);

export const getEntries = async <T extends readonly Fields[]>(
  filter: GetEntriesProps<T>
): Promise<GetEntriesResult<T>> => client.getEntries<T>(filter);
