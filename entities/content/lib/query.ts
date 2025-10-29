import { client } from "@/shared/api/contentful";
import type { EntrySkeletonType } from "contentful";
import type { ContentTypes, Fields, SYSFields } from "../model/types";

export const getEntry = async <T>(id: string) => {
  return client.getEntry<EntrySkeletonType<Partial<T>>>(id).then((entry) => {
    const sys: SYSFields = {
      createdAt: entry.sys.createdAt
        ? new Date(entry.sys.createdAt).getTime()
        : null,
      updatedAt: entry.sys.updatedAt
        ? new Date(entry.sys.updatedAt).getTime()
        : null,
      id: entry.sys.id,
    };
    const meta = {
      tags: entry.metadata.tags.map((e) => e.sys.id),
    };
    return { sys, meta };
  });
};

export const getPost = () => {};

type EntriesFilter<K extends ContentTypes> = {
  content_type: ContentTypes;
  limit: number;
  "metadata.tags.sys.id[in]"?: string[];
  select: ("sys" | Fields[K] | "metadata.tags")[];
  order: ["sys.createdAt"];
};

export const getEntries = async <T extends ContentTypes>(
  type: T,
  fields: Fields[T][],
  tags: string[] = [],
  limit: number = 10
) => {
  const filter: EntriesFilter<T> = {
    content_type: type,
    limit,
    select: ["sys", "metadata.tags", ...fields],
    order: ["sys.createdAt"],
  };
  if (tags.length) {
    filter["metadata.tags.sys.id[in]"] = tags;
  }
  return client.getEntries(filter)
};

export const getTags = async () => {
  return client.getTags().then((response) => {
    response.items.map((e) => e.sys.id);
  });
};
