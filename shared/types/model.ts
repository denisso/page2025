/**
 * типы данных модели контента на сайте
 */

/**
 * набор системных полей
 */
export type SYSFields = {
  createdAt: number;
  updatedAt?: number;
  id: string;
};

/**
 * набор мета полей
 */
export type MetaFields = { tags: string[] };

/**
 * свойства картинки
 */
export type ContentImage = {
  src: string;
  format: string;
  height: number;
  width: number;
};

/**
 * типы свойств
 */
export type FieldsTypes = {
  slug: string;
  title: string;
  image: ContentImage | null;
  body: string;
  refs: string | null;
  json: string;
  position: string;
  job: string;
  description: string;
  responsibilities: string;
  dateFrom: number | null;
  dateTo: number | null;
};

export type Fields = keyof FieldsTypes ;

/**
 * сущность со всеми свойствами
 */
export type EntryResult<T extends readonly Fields[]> = {
  sys: SYSFields;
  metadata: MetaFields;
  fields: Pick<FieldsTypes, T[number]>;
};