"use server";

import { updateTag } from "next/cache";

import { addClap } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { MESSAGES } from "@/constants/messages.constants";
import { CACHE_TAGS } from "@/constants/cacheTags.constants";

/**
 * @description Handles the action of adding claps to a post.
 * Validates the input and ensures the user is authenticated before adding claps to the post.
 * After successful addition, it updates the relevant cache tags to reflect the changes.
 */
export async function clapPostAction(postId: number, count: number = 1) {
  // Ensure the user is authenticated before allowing claps to be added to the post
  const user = await getCurrentUser();
  if (!user) {
    return { error: MESSAGES.LOGIN_REQUIRED };
  }

  const id = Number(postId);
  if (!id || Number.isNaN(id)) {
    return { error: MESSAGES.POST_NOT_FOUND };
  }

  // Add claps to the post
  const result = await addClap(id, user.id, count);

  // If addClap returns a failure, map to error property
  if (result && result.success === false && result.message) {
    return { error: result.message };
  }

  updateTag(CACHE_TAGS.postClaps(id));

  return result;
}
