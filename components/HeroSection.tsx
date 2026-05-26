import { cacheLife } from "next/cache";

/**
 * Cached hero section component
 * This static content rarely changes, so we cache it for a week
 */
export default async function HeroSection() {
  "use cache";
  cacheLife("weeks"); // Static content, cache for a long time

  return (
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
  );
}
