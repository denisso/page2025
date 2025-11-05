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
  ContentFields,
  SharedFields,
  ContentFieldsNames,
  ContentEntity,
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

export const contentFieldsNames = {
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

/**
 * Получить элемент по ID
 * @param id
 * @returns
 */
const _getEntry = async <T extends ContentTypes>(
  id: string
): Promise<ContentEntity<T>> => {
  return client
    .getEntry<EntrySkeletonType<Partial<ContentFields[T]>>>(id)
    .then((entry) => {
      const sys: SYSFields = {
        createdAt: entry.sys.createdAt
          ? new Date(entry.sys.createdAt).getTime()
          : null,
        updatedAt: entry.sys.updatedAt
          ? new Date(entry.sys.updatedAt).getTime()
          : null,
        id: entry.sys.id,
      };
      const type = entry.sys.contentType.sys.id.toLocaleLowerCase() as T;
      const fields = transformFields<T>(entry, type);
      const metadata = {
        tags: entry.metadata.tags.map((e) => e.sys.id),
      };
      return { sys, fields, metadata };
    });
};

export const getEntry = cache(_getEntry);

// Функция для преобразования полей Contentful в ваши типы
function transformFields<T extends ContentTypes>(
  entity: Entry<
    EntrySkeletonType<Partial<ContentFields[T]>>,
    undefined,
    string
  >,
  type: T
): ContentFields[T] {
  const fields: Partial<ContentFields[T]> = {};
  const rawFields = entity.fields;

  const fieldNames = contentFieldsNames[type];

  fieldNames.forEach((fieldName) => {
    const field = fieldName as keyof ContentFields[T];

    if (Object.hasOwn(rawFields, field)) {
      // Обрабатываем специальные случаи
      if (field === "dateFrom" || field === "dateTo") {
        const data = rawFields[field];

        (fields[field] as FieldsTypes["dateFrom"]) =
          typeof data === "string"
            ? (new Date(data as string).getTime() as number)
            : null;
      } else if (field === "image") {
        const data = rawFields[field] as Array<AssetFields>;
        // Преобразуем Asset в ваш формат Image
        (fields[field] as FieldsTypes["image"]) = getImage(data);
      } else {
        // Для остальных полей просто копируем значение
        fields[field] = (rawFields[field] ??
          "") as unknown as ContentFields[T][typeof field];
      }
    }
  });

  return fields as ContentFields[T];
}

function getDate(data: string): number {
  return new Date(data as string).getTime() as number;
}

function getString(data: string): string {
  return data;
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

const getDataMethods: {
  [key in Fields]: typeof getDate | typeof getString | typeof getImage;
} = {
  slug: getString,
  title: getString,
  subtitle: getString,
  image: getImage,
  body: getString,
  // refs: getString,
  position: getString,
  job: getString,
  description: getString,
  responsibilities: getString,
  dateFrom: getDate,
  dateTo: getDate,
};
type EntriesFilter = Partial<{
  content_type: ContentTypes;
  limit: number;
  "metadata.tags.sys.id[in]": string[];
  "metadata.concepts.sys.id[in]": string[];
  select: ("sys" | "metadata.tags" | "fields")[];
  order: ["sys.createdAt"];
}>;

type GetEntriesProps<T extends Fields[]> = Partial<{
  type: ContentTypes;
  fields: T;
  tags: string[];
  taxonomies: string[];
  limit: number;
}>;

type GetEntriesResult<T extends Fields[]> = {
  sys: SYSFields;
  metadata: MetaFields;
  fields: {
    [K in T[number]]: K extends keyof FieldsTypes
      ? FieldsTypes[K] | undefined
      : never;
  };
};

export const getEntries = async <T extends Fields[]>({
  fields,
  tags,
  taxonomies,
  limit,
}: GetEntriesProps<T>): Promise<GetEntriesResult<T>[]> => {
  const filter: EntriesFilter = {
    limit,
    select: ["sys", "metadata.tags", "fields"],
    order: ["sys.createdAt"],
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
    const result: GetEntriesResult<T>[] = [];
    const items = data.items;
    for (const item of items) {
      const sys: SYSFields = {
        createdAt: item.sys.createdAt
          ? new Date(item.sys.createdAt).getTime()
          : null,
        updatedAt: item.sys.updatedAt
          ? new Date(item.sys.updatedAt).getTime()
          : null,
        id: item.sys.id,
      };
      const metadata = {
        tags: item.metadata.tags.map((e) => e.sys.id),
      };
      const fieldsResult: Partial<{ [key in Fields]: FieldsTypes[key] }> = {};
      for (const field of fields ?? []) {
        if (!getDataMethods[field]) continue;
        fieldsResult[field as T[number]] = getDataMethods[field](
          item.fields[field] as string & AssetFields[]
        ) as FieldsTypes[T[number]];
      }
      result.push({
        sys,
        fields: fieldsResult as GetEntriesResult<T>["fields"],
        metadata,
      });
    }
    return result;
  });
};

export const getTags = async () => {
  return client.getTags().then((response) => {
    response.items.map((e) => e.sys.id);
  });
};
