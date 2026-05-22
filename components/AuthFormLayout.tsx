import React from "react";
import Link from "next/link";

interface AuthFormLayoutProps {
  title: string;
  children: React.ReactNode;
  description?: string;
  footer?: React.ReactNode;
}

export default function AuthFormLayout({ title, children, description, footer }: AuthFormLayoutProps) {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 dark:bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand mark */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white hover:text-violet-600 transition-colors">
            <span>✍️</span><span>Blogify</span>
          </Link>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-slate-200 dark:border-zinc-800 p-8">
          <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{title}</h1>
          {description && <p className="mb-6 text-sm text-slate-500 dark:text-zinc-400">{description}</p>}
          {children}
        </div>
        {footer && (
          <p className="mt-5 text-center text-sm text-slate-500 dark:text-zinc-400">{footer}</p>
        )}
      </div>
    </main>
  );
}
