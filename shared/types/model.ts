/**
 * типы данных модели контента в приложении и CMS
 */

/**
 * системные поля сущности из CMS
 */
export type SYSFields = {
  createdAt: Date;
  updatedAt?: Date;
  id: string;
};

/**
 * мета поля сущности из CMS
 */
export type MetaFields = { tags: string[]; taxonomies: string[] };

/**
 * тип для картинки
 */
export type ContentImage = {
  src: string;
  format: string;
  height: number;
  width: number;
};

/**
 * тип для json
 */
// export type JSON<S extends readonly string[]> = { [K in S[number]]: string };

/**
 * типы которые используются в приложении
 */
export type Types = "number" | "string" | "date" | "image" | "json";

/**
 * для преобразования в типы ts
 */
export type TypesMap = {
  [K in Types]: K extends "number"
    ? number
    : K extends "string"
    ? string
    : K extends "date"
    ? Date
    : K extends "image"
    ? ContentImage
    // : K extends "json"
    // ? JSON
    : never;
};

/**
 * сущность со свойствами metadata и sys
 */
export type EntryResult<
  S extends readonly string[],
  M extends Record<S[number], Types>
> = {
  sys: SYSFields;
  metadata: MetaFields;
  fields: { [K in S[number]]: TypesMap[M[K]] };
};
