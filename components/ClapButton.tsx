"use client";

import { useOptimistic, useTransition } from "react";
import { clapPostAction } from "@/actions/clapPost.action";
import { motion } from "framer-motion";
import { callActionWithToast } from "../lib/callActionWithToast";

type ClapButtonProps = {
  postId: number;
  initialClaps?: number;
  maxClaps?: number;
};

export default function ClapButton(props: ClapButtonProps) {
  const { postId, initialClaps = 0, maxClaps = 10 } = props;
  const [optimisticClaps, setOptimisticClaps] = useOptimistic(initialClaps);
  const [isPending, startTransition] = useTransition();

  const handleClapClick = () => {
    if (optimisticClaps < maxClaps && !isPending) {
      startTransition(async () => {
        setOptimisticClaps(optimisticClaps + 1);
        const result = await callActionWithToast(clapPostAction, postId, 1);
        if (!result) {
          setOptimisticClaps((prev: number) => prev - 1);
        }
      });
    }
  };

  return (
    <button
      onClick={handleClapClick}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all text-sm font-medium select-none focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Clap"
      disabled={optimisticClaps >= maxClaps || isPending}
    >
      <motion.span
        animate={isPending ? { scale: 1.4, rotate: -10 } : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 12 }}
        className="text-lg leading-none"
      >
        👏
      </motion.span>
      <span className="text-slate-700 dark:text-zinc-200 tabular-nums">{optimisticClaps}</span>
    </button>
  );
}
