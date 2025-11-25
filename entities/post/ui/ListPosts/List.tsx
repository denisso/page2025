import { formatDate } from "@/shared/lib/formatDate";
import style from "./List.module.css";
import type { EntryResult } from "@/shared/types";
import { fields } from "../../model";

type ListPostsProps = { posts: EntryResult<typeof fields>[] };

export const ListPosts = ({ posts }: ListPostsProps) => {
  return (
    <div className={style["list-posts"]}>
      {posts.map((e) => (
        <div key={e.sys.id}>
          <div>Date: {formatDate(e.sys.createdAt)}</div>
          <div>{e.fields.title}</div>
        </div>
      ))}
    </div>
  );
};
