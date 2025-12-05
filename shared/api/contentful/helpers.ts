/**
 * функции для работы с api contentful 
 * и преобразования данных к интерфейсу приложения
 */
import type {
  SYSFields,
  MetaFields,
  ContentImage,
  Types,
  TypesMap,
  EntryResult,
} from "@/shared/types";
import type { Entry, AssetFields } from "contentful";

// конверт из ISO8601 (example: 2011-10-05T14:48:00.000Z) в миллисекунды
// export function getDateFromISO8601ToMilliseconds(
//   data: string
// ): number | undefined {
//   if (!data) return;
//   return new Date(data as string).getTime() as number;
// }
/**
 * получить системные поля
 * @param entry 
 * @returns 
 */
export function getSYS(entry: Entry): SYSFields {
  const sys: SYSFields = {
    createdAt: new Date(entry.sys.createdAt),
    updatedAt: entry.sys.updatedAt
      ? new Date(entry.sys.updatedAt)
      : entry.sys.updatedAt,
    id: entry.sys.id,
  };
  return sys;
}

/**
 * 
 * @param entry 
 * @returns 
 */
export function getMetadata(entry: Entry): MetaFields {
  const taxonomies: string[] = [];
  if (Array.isArray(entry.metadata.concepts)) {
    for (const taxonomy of entry.metadata.concepts) {
      taxonomies.push(taxonomy.sys.id);
    }
  }
  const metadata = {
    tags: entry.metadata.tags.map((e) => e.sys.id),
    taxonomies,
  };
  return metadata;
}

/**
 * обработка медиа файла изображения 
 * @param image тип данных из ответа Contentful
 * @returns 
 */
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
 * @param select - список полей которые обрабатываем
 * @param types - типы для полей, чтобы знать как их обрабатовать
 * @param entity - сущность из ответа функций getEntry и getEntries
 * @returns
 */
export const transformFields = <
  S extends readonly string[],
  M extends Record<S[number], Types>
>(
  select: S,
  types: M,
  entry: Entry
): EntryResult<S, M> => {
  const data = entry.fields as { [K in S[number]]: unknown };
  const sys: SYSFields = getSYS(entry);
  const metadata: MetaFields = getMetadata(entry);
  const fields = {} as { [K in S[number]]: TypesMap[M[K]] };
  for (let i = 0; i < select.length; i++) {
    const field = select[i];
    const fieldType = types[field as keyof M];
    const value = data[field as keyof typeof data] as string;
    switch (fieldType) {
      case "number": {
        fields[field as keyof typeof fields] = Number(
          value
        ) as TypesMap[M[typeof field]];
      }
      case "string": {
        fields[field as keyof typeof fields] =
          value as TypesMap[M[typeof field]];
      }
      case "date": {
        fields[field as keyof typeof fields] = new Date(
          value
        ) as TypesMap[M[typeof field]];
      }
      default:
    }
  }

  return { fields, sys, metadata };
};
