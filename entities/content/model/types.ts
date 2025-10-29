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
type SharedFields = "slug" | "title" | "subtitle" | "image" | "body" | "refs";

// type AllFieldsMap = {
//   "slug": string; "title": string; "subtitle": | "image" | "body" | "refs";
// } 


type ContentFieldsNames = {
  blog: SharedFields;
  career:
    | "position"
    | "job"
    | "description"
    | "responsibilities"
    | "dateFrom"
    | "dateTo";
  Pages: SharedFields & { json?: string };
  posts: SharedFields;
  projects: SharedFields;
};

export type Fields = {
  [K in ContentTypes]: ContentFieldsNames[K];
};

export type Image = {
  src: string;
  format: string;
  heigth: number;
  width: number;
};
