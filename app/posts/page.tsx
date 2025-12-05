/**
 * Страница с пагинацией
 */
import { getPosts } from "@/entities/post";
import Link from "next/link";

export default async function PostsPage() {
  const pageNumber = 0;

  if (isNaN(pageNumber)) {
    return <Link href={"/posts"}>Goto posts</Link>;
  }
  const posts = await getPosts({ skip: pageNumber, limit: 2 });
  console.log(posts);
  const Prev =
    pageNumber > 0 ? (
      <Link href={"/posts/" + (pageNumber - 1)}>
        Goto page {pageNumber - 1}
      </Link>
    ) : null;

  const Next =
    pageNumber < posts.total - 1 ? (
      <Link href={"/posts/" + (pageNumber + 1)}>
        Goto page {pageNumber + 1}
      </Link>
    ) : null;

  return (
    <div>
      <h1>Страница #{pageNumber}</h1>
      <div>
        <div>Posts:</div>
        <div>
          {posts.entries.map((post) => (
            <article key={post.sys.id}>
              <h2>{post.fields.title}</h2>
              <section>
                {post.fields.description}
                <Link href={`/post/${post.fields.slug}`}>Read more...</Link>
              </section>
            </article>
          ))}
        </div>
      </div>
      <div>Prev page {Prev}</div>
      <div>Next page {Next}</div>
    </div>
  );
}
