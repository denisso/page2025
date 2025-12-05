import * as api from "@/shared/api";
import { fields, fieldsTypes } from "../model";
import type { GetEntriesProps } from "@/shared/api/types";

/**
 * Получить псот по id
 * @param id поста
 * @returns
 */

export const getEntryById = async <
  T extends readonly (typeof fields)[number][] = typeof fields
>(
  id: string,
  select: T
) => {
  const result = await api.getEntryById(id, select, fieldsTypes);
  return result;
};

type GetPostsProps<
  T extends readonly (typeof fields)[number][] = typeof fields
> = Partial<
  {
    select: T;
    where: Omit<GetEntriesProps<T, typeof fieldsTypes>["where"], "type">;
  } & Pick<GetEntriesProps<T, typeof fieldsTypes>, "limit" | "skip">
>;

/**
 * Получить массив постов по параметрам
 * @param select список запрашиваемых свойств
 * @param where фильтр
 * @param skip - начина с какого поста в выборке, по умолчанию 0
 * @param limit - сколько постов будет в выборке по умолчанию 10
 * @returns
 */
export const getPosts = <T extends typeof fields>({
  select,
  where,
  limit = 0,
  skip,
}: GetPostsProps<T>) => {
  return api.getEntries({
    select: (!select ? fields : select) as T,
    types: fieldsTypes,
    where: { ...(where ? where : {}), type: "posts" },
    skip,
    limit,
  });
};
