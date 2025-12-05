import type {
  GetEntries,
  GetEntriesProps,
  GetEntriesResult,
} from "@/shared/api/types";
import type { Types, EntryResult } from "@/shared/types";
import { transformFields } from "./helpers";
import { client } from "./client";

/**
 * Фильтр сущностей
 */
type EntriesFilter = Partial<{
  // тип сущности
  content_type: string;
  // максимальное количество сущностей в ответе
  limit: number;
  skip?: number;
  // запросить несколько сущностей по массиву tags
  "metadata.tags.sys.id[in]": string[];
  // запросить несколько сущностей по массиву taxonomy
  "metadata.concepts.sys.id[in]": string[];
  // запросить несколько сущностей по массиву типов
  "sys.contentType.sys.id[in]": string[];
  select: ("sys" | "metadata.tags" | "fields")[];
  // порядок
  order: ("sys.createdAt" | "-sys.createdAt")[];
  // фильтр
  where: { [key: string]: string };
}>;

/**
 * получить сущности по фильтру
 * @param {
 *  select - свойства сущности которые запрашиваем
 *  where - фильтр
 *  order - порядок
 *  limit - максимальное количество сущностей в ответе
 *  skip - количество сущностей которые пропускаем
 * }
 * @returns
 */
export const getEntries: GetEntries = async <
  S extends readonly string[],
  M extends Record<S[number], Types>
>({
  select,
  types,
  where,
  limit,
  skip = 0,
}: GetEntriesProps<S, M>): Promise<GetEntriesResult<S, M>> => {
  const { type, tags, taxonomies } = where;
  const filter: EntriesFilter = {
    content_type: type,
    limit,
    order: ["-sys.createdAt"],
    skip,
  };
  if (Array.isArray(select) && select.length) {
    filter["select"] = [
      "sys",
      "metadata.tags",
      ...(select.map((field) => "fields." + field) as "fields"[]),
    ];
  }
  // if (types) {
  //   filter["sys.contentType.sys.id[in]"] = types;
  // }
  if (tags && tags.length) {
    filter["metadata.tags.sys.id[in]"] = tags;
  }
  if (taxonomies && taxonomies.length) {
    filter["metadata.concepts.sys.id[in]"] = taxonomies;
  }
  return client.getEntries(filter).then((data) => {
    const { total, skip, limit } = data;
    const entries: EntryResult<S, M>[] = [];
    const items = data.items;
    for (const item of items) {
      const result = transformFields(select, types, item);
      entries.push(result);
    }
    return { total, skip, limit, entries };
  });
};
