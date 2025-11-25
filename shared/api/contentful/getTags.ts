import { client } from "./client";

/**
 *
 * @returns
 */
export const getTags = async () => {
  return client.getTags().then((response) => {
    response.items.map((e) => e.sys.id);
  });
};
