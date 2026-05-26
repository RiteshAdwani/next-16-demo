"use client";

import { memo } from "react";

export default memo(function PostDate({ date }: { date: string }) {
  const d = new Date(date);
  const formatted = d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

  // Use suppressHydrationWarning in case of minor environment differences
  return <span suppressHydrationWarning>{formatted}</span>;
});
