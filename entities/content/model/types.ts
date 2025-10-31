/**
 * типы данных модели Contentful
 * у contentful нет openapi типы из админки прописаны вручную
 */

/**
 * набор системных полей
 */
export type SYSFields = {
  createdAt: number | null;
  updatedAt: number | null;
  id: string;
};

/**
 * набор мета полей
 */
export type MetaFields = { tags: string[] };

/**
 * типы данных которые есть в модели Contentful
 */
export type ContentTypes = "blog" | "career" | "Pages" | "posts" | "projects";

/**
 * общие поля для типов blog Pages posts
 */
export type SharedFields =
  | "slug"
  | "title"
  | "subtitle"
  | "image"
  | "body"
  | "refs";

export type ContentFieldsNames = {
  blog: readonly SharedFields[];
  career: readonly (
    | "position"
    | "job"
    | "description"
    | "responsibilities"
    | "dateFrom"
    | "dateTo"
  )[];
  Pages: readonly (SharedFields | "json")[];
  posts: readonly SharedFields[];
  projects: readonly SharedFields[];
};

export type NamesFields = {
  [K in ContentTypes]: ContentFieldsNames[K][number];
};

export type ContentImage = {
  src: string;
  format: string;
  height: number;
  width: number;
};

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

export type ContentFields = {
  [K in ContentTypes]: Pick<FieldsTypes, NamesFields[K]>;
};

export type ContentEntity<T extends ContentTypes> = {
  sys: SYSFields;
  metadata: MetaFields;
  fields: ContentFields[T];
};
