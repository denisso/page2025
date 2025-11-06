/**
 * адаптер запросов Contentful
 */
import { cache } from "react";
import { client } from "@/shared/api/contentful";
import type { EntrySkeletonType, Entry, AssetFields } from "contentful";
import type {
  ContentTypes,
  SYSFields,
  ContentImage,
  SharedFields,
  ContentFieldsNames,
  FieldsTypes,
  Fields,
  MetaFields,
} from "../model/types";

// Имена полей для типов blog pages posts projects pages
const sharedFields = [
  "slug",
  "title",
  "subtitle",
  "image",
  "body",
  // "refs",
] as const satisfies readonly SharedFields[];

const contentFieldsNames = {
  blog: sharedFields,
  career: [
    "position",
    "job",
    "description",
    "responsibilities",
    "dateFrom",
    "dateTo",
  ] as const,
  // pages: ["json", ...sharedFields] as const,
  pages: sharedFields,
  posts: sharedFields,
  projects: sharedFields,
} satisfies ContentFieldsNames;

type EntryResult<T extends Fields[]> = {
  sys: SYSFields;
  metadata: MetaFields;
  fields: {
    [K in T[number]]: K extends keyof FieldsTypes
      ? FieldsTypes[K] | undefined
      : never;
  };
};

/**
 * Получить элемент по ID
 * @param id
 * @returns
 */
const _getEntry = async <T extends Fields[]>(
  id: string,
  fields?: T
): Promise<EntryResult<T>> => {
  let _fields: T;
  console.log("_getEntry");
  return client
    .getEntry<EntrySkeletonType<EntryResult<T>>>(id)
    .then((entry) => {
      const sys: SYSFields = getSYS(entry);
      const metadata = getMetadata(entry);
      if (!fields) {
        const type =
          entry.sys.contentType.sys.id.toLocaleLowerCase() as ContentTypes;
        _fields = contentFieldsNames[type] as unknown as T;
      } else {
        _fields = fields;
      }
      const fieldsResult = transformFields<T>(entry, _fields);

      return { sys, fields: fieldsResult, metadata };
    });
};

export const getEntry = cache(_getEntry);

type FieldsResult<T extends Fields[]> = {
  [K in T[number]]: FieldsTypes[K];
};

// Функция для преобразования полей Contentful в ваши типы
function transformFields<T extends Fields[]>(
  entity: Entry,
  fields: T
): EntryResult<T>["fields"] {
  const fieldsResult: Partial<FieldsResult<T>> = {};
  const rawFields = entity.fields;

  for (const fieldName of fields) {
    const field = fieldName as T[number];
    const rawValue = rawFields[field];
    if (rawValue === undefined || rawValue === null) continue;

    if (field === "dateFrom" || field === "dateTo") {
      const data = rawFields[field];

      (fieldsResult[field] as FieldsTypes["dateFrom"]) =
        typeof data === "string"
          ? (new Date(data as string).getTime() as number)
          : null;
    } else if (field === "image") {
      const data = rawFields[field] as Array<AssetFields>;

      (fieldsResult[field] as FieldsTypes["image"]) = getImage(data);
    } else {
      fieldsResult[field] = String(
        rawFields[field]
      ) as FieldsTypes[typeof field];
    }
  }

  return fieldsResult as EntryResult<T>["fields"];
}

function getSYS(entry: Entry): SYSFields {
  const sys: SYSFields = {
    createdAt: getDate(entry.sys.createdAt) as number,
    updatedAt: getDate(entry.sys.updatedAt),
    id: entry.sys.id,
  };
  return sys;
}

function getMetadata(entry: Entry): MetaFields {
  const metadata = {
    tags: entry.metadata.tags.map((e) => e.sys.id),
  };
  return metadata;
}

function getDate(data: string): number | undefined {
  if (!data) return;
  return new Date(data as string).getTime() as number;
}

function getImage(image: Array<AssetFields>): ContentImage | null {
  if (!Array.isArray(image) || !image.length) return null;
  const asset = image[0];
  if (!asset.file) return null;
  return {
    src: asset.file.url,
    format: asset.file.contentType,
    height: asset.file.details?.image?.height ?? -1,
    width: asset.file.details?.image?.width ?? -1,
  };
}

type EntriesFilter = Partial<{
  content_type: ContentTypes;
  limit: number;
  skip?: number;
  "metadata.tags.sys.id[in]": string[];
  "metadata.concepts.sys.id[in]": string[];
  select: ("sys" | "metadata.tags" | "fields")[];
  order: ("sys.createdAt" | "-sys.createdAt")[];
}>;

type GetEntriesProps<T extends Fields[]> = {
  type?: ContentTypes;
  fields: T;
  tags?: string[];
  taxonomies?: string[];
  limit: number;
  skip?: number;
};

export const _getEntries = async <T extends Fields[]>({
  fields,
  tags,
  taxonomies,
  limit,
  skip = 0,
}: GetEntriesProps<T>): Promise<EntryResult<T>[]> => {
  const filter: EntriesFilter = {
    limit,
    select: ["sys", "metadata.tags", "fields"],
    order: ["-sys.createdAt"],
    skip,
  };
  if (Array.isArray(filter["select"])) {
    filter["select"] = ["sys", ...filter["select"]];
  }

  if (tags && tags.length) {
    filter["metadata.tags.sys.id[in]"] = tags;
  }
  if (taxonomies && taxonomies.length) {
    filter["metadata.concepts.sys.id[in]"] = taxonomies;
  }
  return client.getEntries(filter).then((data) => {
    const result: EntryResult<T>[] = [];
    const items = data.items;
    for (const item of items) {
      const sys: SYSFields = getSYS(item);
      const metadata = getMetadata(item);
      const fieldsResult = transformFields<T>(item, fields);
      result.push({
        sys,
        fields: fieldsResult as EntryResult<T>["fields"],
        metadata,
      });
    }
    return result;
  });
};
export const getEntries = cache(_getEntries);

export const getTags = async () => {
  return client.getTags().then((response) => {
    response.items.map((e) => e.sys.id);
  });
};
