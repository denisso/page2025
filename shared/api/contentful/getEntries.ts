import type {
  GetEntries,
  GetEntriesProps,
  GetEntriesResult,
} from "@/shared/api/types";
import type { Fields, EntryResult, SYSFields } from "@/shared/types";
import { getSYS, getMetadata, transformFields } from "./helpers";
import { client } from "./client";


/**
 * Фильтр сущностей
 */
type EntriesFilter = Partial<{
  // тип сущности
  content_type: string;
  // лимит запрошенных сущностей
  limit: number;
  skip?: number;
  "metadata.tags.sys.id[in]": string[];
  "metadata.concepts.sys.id[in]": string[];
  "sys.contentType.sys.id[in]": string[];
  select: ("sys" | "metadata.tags" | "fields")[];
  order: ("sys.createdAt" | "-sys.createdAt")[];
}>;

/**
 * получить сущности по фильтру
 * @param param0
 * @returns
 */
export const getEntries: GetEntries = async <T extends readonly Fields[]>({
  type,
  fields,
  tags,
  taxonomies,
  limit,
  skip = 0,
}: GetEntriesProps<T>): Promise<GetEntriesResult<T>> => {
  const filter: EntriesFilter = {
    content_type: type,
    limit,
    select: ["sys", "metadata.tags"].concat(
      fields.map((field) => "fields." + field) 
    ) as EntriesFilter["select"],
    order: ["-sys.createdAt"],
    skip,
  };
  if (Array.isArray(filter["select"])) {
    filter["select"] = ["sys", ...filter["select"]];
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
    const entries: EntryResult<T>[] = [];
    const items = data.items;
    for (const item of items) {
      const sys: SYSFields = getSYS(item);
      const metadata = getMetadata(item);
      const fieldsResult = transformFields<T>(item, fields);
      entries.push({
        sys,
        fields: fieldsResult as EntryResult<T>["fields"],
        metadata,
      });
    }
    return { total, skip, limit, entries };
  });
};

