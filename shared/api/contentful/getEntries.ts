import type {
  GetEntries,
  GetEntriesProps,
  GetEntriesResult,
} from "@/shared/api/types";
import type { Types, EntryResult } from "@/shared/types";
import { transformFields } from "./helpers";
import { client } from "./client";

/**
 * Фильтр сущностей в контекте Contentful
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
 * Получает сущности по указанным параметрам.
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
    // пока сделано что самы последние посты будут сначала
    order: ["-sys.createdAt"],
    skip,
  };
  // выборка свойств сущности которые нужно получить в результате
  if (Array.isArray(select) && select.length) {
    filter["select"] = [
      "sys",
      "metadata.tags",
      ...(select.map((field) => "fields." + field) as "fields"[]),
    ];
  }
  // фильтр сущностей по нескольким типам 
  // но я пришел к выводу что лучше выбирать один тип 
  // и систематизировать сущности в контекте одно типа используя taxonomy
  // это логичнее как мне кажется 
  // поэтому выбирать несколько типов не требуется, но это возможно
  // if (types) {
  //   filter["sys.contentType.sys.id[in]"] = types;
  // }

  // фильтр по тегам
  if (tags && tags.length) {
    filter["metadata.tags.sys.id[in]"] = tags;
  }

  // фильтр по taxonomy 
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
