import type { Fields, EntryResult, ContentTypes } from "@/shared/types";

import * as client from "./contentful";

export const getEntry = async <T extends Fields[]>(
  id: string,
  fields?: T
): Promise<EntryResult<T>> => client.getEntry<T>(id, fields);

export type GetEntriesResult<T extends Fields[]> = {
  entries: EntryResult<T>[];
  limit: number;
  skip: number;
  total: number;
};

export type GetEntriesProps<T extends Fields[]> = {
  types?: ContentTypes[];
  fields: T;
  tags?: string[];
  taxonomies?: string[];
  limit: number;
  skip?: number;
};

export const getEntries = async <T extends Fields[]>(
  filter: GetEntriesProps<T>
): Promise<GetEntriesResult<T>> => client.getEntries<T>(filter);
