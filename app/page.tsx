
import { getPosts } from "@/lib/db";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClapButton from "@/components/ClapButton";
import PostDate from "@/components/PostDate";

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      {/* Hero section */}
      <section className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
            Ideas worth{" "}
            <span className="bg-linear-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
              sharing
            </span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-zinc-400 max-w-xl mx-auto">
            Discover stories, thoughts, and ideas from writers on any topic.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        {posts.length === 0 ? (
          <div className="text-center text-slate-500 dark:text-zinc-400 text-xl py-20">
            No posts yet. Be the first to{" "}
            <Link href="/posts/new" className="text-violet-600 dark:text-violet-400 underline underline-offset-2 font-semibold">
              write one
            </Link>
            .
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: (typeof posts)[number]) => (
              <Card
                key={post.id}
                className="group flex flex-col justify-between h-full shadow-sm border border-slate-200 dark:border-zinc-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden"
              >
                <Link href={`/posts/${post.id}`} className="flex-1 flex flex-col no-underline">
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
                  <ClapButton initialClaps={post.totalClaps} postId={post.id} />
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

