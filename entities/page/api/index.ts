import { getEntryById } from "@/shared/api";
import { fields, fieldsTypes } from "../model";

export const getPage = (id: string) => {
  return getEntryById(id, fields, fieldsTypes);
};
