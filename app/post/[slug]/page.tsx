import { getPostById } from "@/entities/post";
import { notFound } from "next/navigation";
import type { Post } from "@/entities/post";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PageProps) {
  let post: null | Post = null;
  try {
    post = await getPostById((await params).slug);
  } catch {}

  if (!post) {
    return notFound();
  }

  return (
    <article className="post">
      <Link href="/posts/1" className="back-link">
        ← Назад к постам
      </Link>
      <header>
        <h1>{post.fields.title}</h1>
      </header>
      <div className="post-content">{post.fields.description}</div>
    </article>
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
