"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/login.action";
import { callActionWithToast } from "../lib/callActionWithToast";
import { AuthFormFields } from "@/constants/formFields.constants";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleAction(formData: FormData) {
    const result = await callActionWithToast(loginAction, formData);
    if (!result) {
      return;
    }
    router.refresh();
  }

  return (
    <form
      action={(formData) => startTransition(() => handleAction(formData))}
      className="space-y-5 mt-6"
    >
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-slate-700 dark:text-zinc-300"
        >
          Email
        </label>
        <input
          id="email"
          name={AuthFormFields.EMAIL}
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
          placeholder="you@example.com"
        />
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-slate-700 dark:text-zinc-300"
        >
          Password
        </label>
        <input
          id="password"
          name={AuthFormFields.PASSWORD}
          type="password"
          autoComplete="current-password"
          required
          minLength={6}
          className="w-full rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
          placeholder="••••••••"
        />
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-sm transition-colors mt-2"
      >
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
