/**
 * Страница с пагинацией
 */
import { getPosts } from "@/entities/post";
import Link from "next/link";

interface Props {
  params: {
    page: string;
  };
}

export default async function PostsPage({ params }: Props) {
  const pageNumber = parseInt((await params).page);

  if (isNaN(pageNumber)) {
    return <Link href={"/posts"}>Goto posts</Link>;
  }
  const posts = await getPosts(null, null, pageNumber, 2);

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
      <div className="buttons">
        <button className="prev">Prev page {Prev}</button>
        <div className="page">Страница #{pageNumber}</div>
        <button className="next">Next page {Next}</button>
      </div>
    </div>
  );
}
