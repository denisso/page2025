import { getEntries } from "@/shared/api";
import { getEnv } from "@/shared/lib";
import { formatDate } from "@/shared/lib/formatDate";
import style from "./List.module.css";

export const ListPosts = async () => {
  const posts = await getEntries({
    fields: ["title"],
    limit: 10,
    taxonomies: [getEnv("PREVIEW_TAXONOMY")],
  });
  return (
    <div className={style["list-posts"]}>
      {posts.entries.map((e) => (
        <div key={e.sys.id}>
          <div>Date: {formatDate(e.sys.createdAt)}</div>
          <div>{e.fields.title}</div>
        </div>
      ))}
    </div>
  );
};
