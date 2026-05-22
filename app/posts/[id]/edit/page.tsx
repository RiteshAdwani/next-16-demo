import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { getPost } from "@/lib/db";
import PostForm from "@/components/PostForm";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="h-5 w-28 rounded-full bg-slate-200 dark:bg-zinc-800 animate-pulse mb-8" />
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 space-y-4">
              <div className="h-7 w-48 rounded bg-slate-200 dark:bg-zinc-800 animate-pulse" />
              <div className="h-12 w-full rounded-xl bg-slate-100 dark:bg-zinc-700 animate-pulse" />
              <div className="h-48 w-full rounded-xl bg-slate-100 dark:bg-zinc-700 animate-pulse" />
            </div>
          </div>
        </main>
      }
    >
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
