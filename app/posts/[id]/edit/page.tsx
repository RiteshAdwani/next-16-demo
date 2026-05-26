import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { getPost, getPosts } from "@/lib/db";
import PostForm from "@/components/PostForm";
import PostFormSkeleton from "@/components/PostFormSkeleton";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<PostFormSkeleton />}>
      <EditPostContent params={params} />
    </Suspense>
  );
}

async function EditPostContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!id || Number.isNaN(id)) {
    notFound();
  }

  const post = await getPost(id);
  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/posts/${id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors mb-8 group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to post
        </Link>
        <PostForm
          postId={id}
          initialTitle={post.title}
          initialContent={post.content}
          submitLabel="Update Post"
        />
      </div>
    </main>
  );
}
