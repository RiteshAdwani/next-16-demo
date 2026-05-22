"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { updatePostAction } from "@/actions/updatePost.action";
import { createPostAction } from "@/actions/createPost.action";
import { PostFormFields } from "@/constants/formFields.constants";
import { callActionWithToast } from "../lib/callActionWithToast";

type PostFormProps = {
  postId?: number;
  initialTitle?: string;
  initialContent?: string;
  submitLabel: string;
};

export default function PostForm({
  postId,
  initialTitle = "",
  initialContent = "",
  submitLabel,
}: PostFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleAction(formData: FormData) {
    setError(null);
    if (postId) {
      formData.set(PostFormFields.ID, String(postId));
      const result = await callActionWithToast(updatePostAction, formData);
      if (!result) return;
    } else {
      const result = await callActionWithToast(createPostAction, formData);
      if (!result) return;
    }
    router.refresh();
  }

  return (
    <Card className="shadow-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/30 px-8 py-6">
        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">{submitLabel}</CardTitle>
      </CardHeader>
      <CardContent className="px-8 py-8">
        <form
          action={(formData) => startTransition(() => handleAction(formData))}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-slate-700 dark:text-zinc-300"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              defaultValue={initialTitle}
              className="w-full rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-sm text-slate-900 dark:text-zinc-100 shadow-sm placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              placeholder="An interesting headline..."
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="content"
              className="block text-sm font-semibold text-slate-700 dark:text-zinc-300"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              defaultValue={initialContent}
              className="min-h-52 w-full rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-sm text-slate-900 dark:text-zinc-100 shadow-sm placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-y transition"
              placeholder="Write your story..."
              required
            />
          </div>

          {error ? (
            <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-xl px-4 py-3">
              {error}
            </p>
          ) : null}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="px-7 py-2.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-sm transition-colors"
            >
              {isPending ? "Saving..." : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
