import Link from "next/link";
import style from "./List.module.css";
import { Post } from "../../model";
import { Badge } from "@/shared/ui/Badge";
import { formatDate } from "@/shared/lib/formatDate";
import { Image } from "@/shared/ui/Image";
import styles from "./List.module.css";

const PostEntity = ({ post }: { post: Post }) => {
  const { fields, metadata, sys } = post;
  return (
    <Link href={`/post/${sys.id}`}>
      <article className={styles["post"]}>
        <header className={styles["header"]}>
          <div className={styles["date"]}>{formatDate(sys.createdAt)}</div>
          <div className={styles["title"]}>{fields.title}</div>
        </header>
        <section className={styles["content"]}>
          <div className={styles["image"]}>
            <Image image={fields.image} alt="poster" />
          </div>
          <div className={styles["text"]}>
            <div className={styles["description"]}>{fields.description}</div>
            <div className={styles["tags"]}>Tags:
              {metadata.tags.map((tag) => (
                <Badge key={tag} text={tag} />
              ))}
            </div>
            <div className={styles["taxonomies"]}>
              {metadata.taxonomies.map((taxonomy) => (
                <Badge key={taxonomy} text={taxonomy} />
              ))}
            </div>
          </div>
        </section>
      </article>
    </Link>
  );
};

type PostsListProps = { posts: Post[] };

export const PostsList = ({ posts }: PostsListProps) => {
  return (
    <div className={style["list-posts"]}>
      {posts.map((post) => (
        <PostEntity post={post} key={post.sys.id} />
      ))}
    </div>
  );
};
