import type { Fields, EntryResult } from "@/shared/types";

export type GetEntryResult<T extends readonly Fields[]> = EntryResult<T>;

export interface GetEntry {
  <T extends readonly Fields[]>(id: string, fields: T): Promise<EntryResult<T>>;
}

export type GetEntriesResult<T extends readonly Fields[]> = {
  entries: EntryResult<T>[];
  limit: number;
  skip: number;
  total: number;
};

export type GetEntriesProps<T extends readonly Fields[]> = {
  type: string;
  fields: T;
  tags?: string[];
  taxonomies?: string[];
  limit: number;
  skip?: number;
};

export interface GetEntries {
  <T extends readonly Fields[]>(props: GetEntriesProps<T>): Promise<
    GetEntriesResult<T>
  >;
}
