/**
 * экспортируем методы обертки для выбранного поставщика контента
 * сейчас CMS Contentful
 */
import type { EntryResult, Types } from "@/shared/types";
import type { GetEntriesProps, GetEntriesResult } from "./types";
import * as client from "./contentful";

/**
 * Получить сущность по id
 * @param id 
 * @param select 
 * @param types 
 * @returns 
 */
export const getEntryById = async <
  S extends readonly string[],
  M extends Record<S[number], Types>
>(
  id: string,
  select: S,
  types: M
): Promise<EntryResult<S, M>> => client.getEntryById(id, select, types);

export const getEntries = async <
  S extends readonly string[],
  M extends Record<S[number], Types>
>(
  props: GetEntriesProps<S, M>
): Promise<GetEntriesResult<S, M>> => client.getEntries(props);
