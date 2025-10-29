import * as contentful from "contentful";

export const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,       
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT!,
});

// export const getEntityById

