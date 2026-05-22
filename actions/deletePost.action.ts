"use server";

import { redirect } from "next/navigation";
import { revalidateTag, updateTag } from "next/cache";

import { deletePost } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { MESSAGES } from "@/constants/messages.constants";
import { CACHE_TAGS } from "@/constants/cacheTags.constants";
import { ROUTES } from "@/constants/routes.constants";

/**
 * @description Handles the deletion of a post. 
 * Validates the input and ensures the user is authenticated before deleting the post. 
 * After successful deletion, it revalidates the relevant cache tags and redirects to the home page.
 */
export async function deletePostAction(formData: FormData) {
  // Ensure the user is authenticated before allowing post deletion
  const user = await getCurrentUser();
  if (!user) {
    return { error: MESSAGES.LOGIN_REQUIRED };
  }

  const rawId = formData.get("id");
  const id = typeof rawId === "string" ? Number(rawId) : NaN;

  if (!id || Number.isNaN(id)) {
    return { error: MESSAGES.INVALID_POST_ID };
  }

  // Delete the post with the specified ID
  await deletePost(id);

  revalidateTag(CACHE_TAGS.POSTS, "max");
  updateTag(CACHE_TAGS.postById(id));

  redirect(ROUTES.HOME);
}
