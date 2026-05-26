import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClapButton from "@/components/ClapButton";
import PostDate from "@/components/PostDate";
import { getPosts } from "@/lib/db";
import { CACHE_TAGS } from "@/constants/cacheTags.constants";

/**
 * Cached posts list component
 * Fetches and renders all posts with intelligent caching
 */
export default async function PostsList() {
  "use cache";
  cacheLife("hours"); // List updates frequently
  cacheTag(CACHE_TAGS.POSTS);

  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="text-center text-slate-500 dark:text-zinc-400 text-xl py-20">
        No posts yet. Be the first to{" "}
        <Link
          href="/posts/new"
          className="text-violet-600 dark:text-violet-400 underline underline-offset-2 font-semibold"
        >
          write one
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="group flex flex-col justify-between h-full shadow-sm border border-slate-200 dark:border-zinc-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden"
        >
          <Link
            href={`/posts/${post.id}`}
            className="flex-1 flex flex-col no-underline"
          >
            <CardHeader className="pb-2 px-6 pt-6">
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug line-clamp-2">
                {post.title}
              </CardTitle>
              <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
                <PostDate date={post.createdAt.toString()} />
              </p>
            </CardHeader>
            <CardContent className="flex-1 px-6 pb-4">
              <p className="text-sm text-slate-600 dark:text-zinc-300 line-clamp-3 leading-relaxed">
                {post.content}
              </p>
            </CardContent>
          </Link>
          <div className="px-6 py-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
            <ClapButton postId={post.id} initialClaps={post.totalClaps} />
          </div>
        </Card>
      ))}
    </div>
  );
}
