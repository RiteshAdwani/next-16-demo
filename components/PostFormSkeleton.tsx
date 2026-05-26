export default function PostFormSkeleton() {
  return (
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
  );
}
