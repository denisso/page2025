/**
 * интерфейсы доступа для различных поставщиков контента
 */
import type { Types, EntryResult, TypesMap } from "@/shared/types";

export interface GetEntryById {
  <S extends readonly string[], M extends Record<S[number], Types>>(
    id: string,
    select: S,
    types: M
  ): Promise<EntryResult<S, M>>;
}

export type GetEntriesResult<
  S extends readonly string[],
  M extends Record<S[number], Types>
> = {
  entries: EntryResult<S, M>[];
  limit: number;
  skip: number;
  total: number;
};

export type GetEntriesProps<
  S extends readonly string[],
  M extends Record<S[number], Types>
> = {
  select: S;
  types: M;
  where: {
    type: string;
    tags?: string[];
    taxonomies?: string[];
    fields?: { [K in S[number]]: TypesMap[M[K]] };
  };
  limit: number;
  skip?: number;
};

export interface GetEntries {
  <S extends readonly string[], M extends Record<S[number], Types>>(
    props: GetEntriesProps<S, M>
  ): Promise<GetEntriesResult<S, M>>;
}
