import { client } from "./client";
import type { Fields, EntryResult, SYSFields } from "@/shared/types";

import type { EntrySkeletonType } from "contentful";
import { getSYS, getMetadata, transformFields } from "./helpers";


export const getEntry = async <T extends readonly Fields[]>(
  id: string,
  fields: T
): Promise<EntryResult<T>> => {
  return client
    .getEntry<EntrySkeletonType<EntryResult<T>>>(id)
    .then((entry) => {
      const sys: SYSFields = getSYS(entry);
      const metadata = getMetadata(entry);

      const fieldsResult = transformFields<T>(entry, fields);

      return { sys, fields: fieldsResult, metadata };
    });
};


