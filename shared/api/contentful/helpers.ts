import type {
  SYSFields,
  MetaFields,
  ContentImage,
  EntryResult,
  Fields,
  FieldsTypes,
} from "@/shared/types";
import type { Entry, AssetFields } from "contentful";

export function getSYS(entry: Entry): SYSFields {
  const sys: SYSFields = {
    createdAt: getDate(entry.sys.createdAt) as number,
    updatedAt: getDate(entry.sys.updatedAt),
    id: entry.sys.id,
  };
  return sys;
}

export function getMetadata(entry: Entry): MetaFields {
  const metadata = {
    tags: entry.metadata.tags.map((e) => e.sys.id),
  };
  return metadata;
}

export function getDate(data: string): number | undefined {
  if (!data) return;
  return new Date(data as string).getTime() as number;
}

export function getImage(image: Array<AssetFields>): ContentImage | null {
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

/**
 * получаем данные из ответа Contentful
 * @param entity - сущность из ответа функций getEntry и getEntries
 * @param fields - набор полей которые есть в этой сущности, не обязательно что они там есть
 * @returns
 */
export function transformFields<T extends readonly Fields[]>(
  entity: Entry,
  fields: T
): EntryResult<T>["fields"] {
  const fieldsResult: Partial<EntryResult<T>["fields"]> = {};
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
        rawFields[field] ?? ""
      ) as FieldsTypes[typeof field];
    }
  }

  return fieldsResult as EntryResult<T>["fields"];
}
