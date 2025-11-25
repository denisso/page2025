import { getEntry } from "@/shared/api";
import { fields } from "../model";

export const getPage = (id: string) => {
  return getEntry(id, fields);
};