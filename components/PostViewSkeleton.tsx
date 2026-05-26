export default function PostViewSkeleton() {
  return (
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
  );
}
