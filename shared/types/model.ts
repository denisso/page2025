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
 * типы сущностей которые есть в модели, у каждого типа свой набор свойств
 * "career" - опыт работы в компаниях
 * "pages" - страницы сайта
 * "posts" - посты, статьи, руководства и т.д.
 * "blog" - блог
 * "projects" - проекты
 */
export type ContentTypes = "career" | "pages" | "posts" | "projects";

/**
 * все свойства сущностей которые есть в модели
 */
export type Fields =
  | "slug"
  | "title"
  | "subtitle"
  | "description"
  | "image"
  | "body"
  | "position"
  | "job"
  | "description"
  | "responsibilities"
  | "dateFrom"
  | "dateTo";

type FieldsObject = {
  [K in Fields]: K;
};

/**
 * свойства для типов blog Pages posts
 */
export type SharedFields = keyof Pick<
  FieldsObject,
  "slug" | "title" | "subtitle" | "image" | "body" | "description"
>;

/**
 * свойства сущности career
 */
type CareerFields = keyof Pick<
  FieldsObject,
  | "position"
  | "job"
  | "description"
  | "responsibilities"
  | "dateFrom"
  | "dateTo"
>;

/**
 * набор свойств для каждой сущности
 */
export type NamesFields = {
  blog: readonly SharedFields[];
  career: readonly CareerFields[];
  pages: readonly SharedFields[];
  posts: readonly SharedFields[];
  projects: readonly SharedFields[];
};

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
  subtitle: string;
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

/**
 * создаем для каждого типа набор свойств
 */
export type ContentFields = {
  [K in ContentTypes]: Pick<FieldsTypes, NamesFields[K][number]>;
};

/**
 * сущность со всеми свойствами
 */
export type EntryResult<T extends Fields[]> = {
  sys: SYSFields;
  metadata: MetaFields;
  fields: {
    [K in T[number]]: K extends keyof FieldsTypes
      ? FieldsTypes[K] | undefined
      : never;
  };
};