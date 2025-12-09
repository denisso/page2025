import { getPostById } from "@/entities/post";
import { notFound } from "next/navigation";
import type { Post } from "@/entities/post";
import Link from "next/link";
import { Root } from "hast";
import { transformMarkdownToAST } from "@/shared/lib/markdown";
import { MarkdownPrivew } from "@/shared/ui/Markdown/Preview";
import { Suspense } from "react";

interface PageProps {
  params: {
    slug: string;
  };
}
const testAWiwatPromise = async () => new Promise(resolve=>{
  setTimeout(resolve, 10000)
})
const Post = async ({ slug }: { slug: string }) => {
  await testAWiwatPromise()
  const post: null | Post = await getPostById(slug).catch(() => null);

  if (!post) {
    return notFound();
  }

  const ast: Root = await transformMarkdownToAST(post.fields.body);
  return (
    <article className="post">
      <header>
        <h1>{post.fields.title}</h1>
      </header>
      <div className="post-content">{post.fields.description}</div>
      <MarkdownPrivew ast={ast} />
    </article>
  );
};

export default async function PostPage({ params }: PageProps) {
  return (
    <div className="container">
      <Link href="/posts/1" className="back-link">
        ← Назад к постам
      </Link>
      <Suspense fallback={<div className="loading">Loading post...</div>}>
        <Post slug={(await params).slug} />
      </Suspense>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getPostById((await params).slug);

  if (!post) {
    return {
      title: "Пост не найден",
    };
  }

  return {
    title: post.fields.title,
    description: post.fields.description,
  };
}
