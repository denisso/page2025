/**
 * универсальные интерфейсы функций для поставщиков контента
 * чтобы приложение не было завязано на конкретном поставщике 
 * и максимально безболезнено можно было перейти на другого поставщика контента
 */
import type { Types, EntryResult, TypesMap } from "@/shared/types";

/**
 * интерфейсфункции получения сущности по Id
 */
export interface GetEntryById {
  <S extends readonly string[], M extends Record<S[number], Types>>(
    id: string,
    select: S,
    types: M
  ): Promise<EntryResult<S, M>>;
}

/**
 * результат выполнения функции запроса сущностей
 */
export type GetEntriesResult<
  S extends readonly string[],
  M extends Record<S[number], Types>
> = {
  // массив получаенных сущностей
  entries: EntryResult<S, M>[];
  // максимальное число сущностей в ответе
  limit: number;
  // максимальное число пропущенных сущностей
  skip: number;
  // количество сущностей в базе 
  total: number;
};

/**
 * SQL like синтаксис параметров для функции выборки сущностей
 * @typeParam S - Имена выбираемых полей (например: ['title', 'slug', 'image'])
 * @typeParam M - Типы этих полей (например: {title: 'string', slug: 'string', image: 'image'})
 */
export type GetEntriesProps<
  S extends readonly string[],
  M extends Record<S[number], Types>
> = {
  // список полей сущности, которые будут в результате
  select: S;
  // это не SQL like но без него неикак
  types: M;
  // параметры фильтра 
  where: {
    // тип - единственный обязательный параметр фильтре
    type: string;
    // теги
    tags?: string[];
    // систематизация
    taxonomies?: string[];
    // поиск по значению в конкретном поле
    fields?: { [K in S[number]]: TypesMap[M[K]] };
  };
  // количество сущностей, которые будут в ответе
  limit: number;
  // количество сущностей, которые будут пропущены
  skip?: number;
};

/**
 * интерфейс функции получения сущностей
 */
export interface GetEntries {
  <S extends readonly string[], M extends Record<S[number], Types>>(
    props: GetEntriesProps<S, M>
  ): Promise<GetEntriesResult<S, M>>;
}
