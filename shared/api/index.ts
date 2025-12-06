/**
 * экспортируем независимые от поставщика контента функции, 
 * которые будут использоваться во всем приложении 
 * "независмые" функции означает что
 *  их синатыры (параметры и результаты) 
 * соответствуют типам описанным в ./types
 */
import type { EntryResult, Types } from "@/shared/types";
import type { GetEntriesProps, GetEntriesResult } from "./types";
import * as client from "./contentful";

/**
 * Получить сущность по id
 */
export const getEntryById = async <
  S extends readonly string[],
  M extends Record<S[number], Types>
>(
  id: string,
  select: S,
  types: M
): Promise<EntryResult<S, M>> => client.getEntryById(id, select, types);

/**
 *  Получить сущности по фильтру
 */
export const getEntries = async <
  S extends readonly string[],
  M extends Record<S[number], Types>
>(
  props: GetEntriesProps<S, M>
): Promise<GetEntriesResult<S, M>> => client.getEntries(props);
