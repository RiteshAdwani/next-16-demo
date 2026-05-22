import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { getPost } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import ClapButton from "@/components/ClapButton";
import PostDate from "@/components/PostDate";
import { Button } from "@/components/ui/button";
import { deletePostAction } from "@/actions/deletePost.action";
import { ROUTES } from "@/constants/routes.constants";

export default function ViewPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="h-5 w-32 rounded-full bg-slate-200 dark:bg-zinc-800 animate-pulse mb-8" />
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-slate-200 dark:border-zinc-800 p-8 space-y-4">
              <div className="h-8 w-3/4 rounded-lg bg-slate-200 dark:bg-zinc-800 animate-pulse" />
              <div className="h-4 w-1/3 rounded bg-slate-100 dark:bg-zinc-700 animate-pulse" />
              <div className="space-y-2 pt-4">
                <div className="h-4 w-full rounded bg-slate-100 dark:bg-zinc-700 animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-slate-100 dark:bg-zinc-700 animate-pulse" />
                <div className="h-4 w-4/6 rounded bg-slate-100 dark:bg-zinc-700 animate-pulse" />
              </div>
            </div>
          </div>
        </main>
      }
    >
      <PostContent params={params} />
    </Suspense>
  );
}

async function PostContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!id || Number.isNaN(id)) {
    notFound();
  }

  const [post, user] = await Promise.all([getPost(id), getCurrentUser()]);
  if (!post) {
    notFound();
  }

  const isAuthor = user?.id === post.authorId;

  async function handleDeletePost(formData: FormData) {
    "use server";

    await deletePostAction(formData);
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <Link
          href={ROUTES.HOME}
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
          Back to posts
        </Link>

        {/* Post card */}
        <article className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-slate-200 dark:border-zinc-800 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-slate-100 dark:border-zinc-800">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Author avatar placeholder */}
                <div className="w-9 h-9 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-violet-600 dark:text-violet-400 font-bold text-sm shrink-0">
                  {post.author?.name?.charAt(0).toUpperCase() ?? "?"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-zinc-200">
                    {post.author?.name ?? "Anonymous"}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-zinc-500">
                    <PostDate date={post.createdAt.toString()} />
                  </p>
                </div>
              </div>

              {/* Author actions */}
              {isAuthor && (
                <div className="flex items-center gap-2">
                  <Link href={`/posts/${post.id}/edit`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400"
                    >
                      ✏️ Edit
                    </Button>
                  </Link>
                  <form action={handleDeletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <Button
                      type="submit"
                      size="sm"
                      variant="ghost"
                      className="rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      🗑 Delete
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            <p className="post-content">{post.content}</p>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
            <ClapButton
              initialClaps={post.totalClaps}
              postId={post.id}
            />
            <span className="text-xs text-slate-400 dark:text-zinc-600">
              {post.totalClaps === 1 ? "1 clap" : `${post.totalClaps} claps`}
            </span>
          </div>
        </article>
      </div>
    </main>
  );
}

