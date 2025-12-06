/**
 * Contentful client
 */
import * as contentful from "contentful";
import { getEnv } from "@/shared/lib";

export const client = contentful.createClient({
  space: getEnv("CONTENTFUL_SPACE_ID"),
  accessToken: getEnv("CONTENTFUL_ACCESS_TOKEN"),
  environment: getEnv("CONTENTFUL_ENVIRONMENT"),
});