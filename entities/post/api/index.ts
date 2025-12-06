import * as api from "@/shared/api";
import { fields, fieldsTypes } from "../model";
import type { GetEntriesProps } from "@/shared/api/types";

/**
 * Получить псот по id
 * @param id поста
 * @returns
 */

export const getPostById = async <
  T extends readonly (typeof fields)[number][] = typeof fields
>(
  id: string,
  _select?: T
) => {
  const select =  (!_select ? fields : _select) as T
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
