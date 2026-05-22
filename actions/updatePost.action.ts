"use server";

import { redirect } from "next/navigation";
import { revalidateTag, updateTag } from "next/cache";

import { updatePost } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

import { MESSAGES } from "@/constants/messages.constants";
import { CACHE_TAGS } from "@/constants/cacheTags.constants";
import { ROUTES } from "@/constants/routes.constants";
import { PostFormFields } from "@/constants/formFields.constants";

/**
 * @description Handles the update action for an existing post.
 * Validates the input and ensures the user is authenticated before updating the post.
 * After successful update, it revalidates the relevant cache tags and redirects to the home page.
 */
export async function updatePostAction(formData: FormData) {
  // Ensure the user is authenticated before allowing post update
  const user = await getCurrentUser();
  if (!user) {
    return { error: MESSAGES.LOGIN_REQUIRED };
  }

  // Extract and validate the post ID, title, and content from the form data
  const rawId = formData.get(PostFormFields.ID);
  const title = String(formData.get(PostFormFields.TITLE) ?? "").trim();
  const content = String(formData.get(PostFormFields.CONTENT) ?? "").trim();

  const id = typeof rawId === "string" ? Number(rawId) : NaN;
  if (!id || Number.isNaN(id)) {
    return { error: MESSAGES.INVALID_POST_ID };
  }

  if (!title || !content) {
    return { error: MESSAGES.REQUIRED_FIELDS };
  }

  // Update the post with the new title and content
  await updatePost(id, { title, content });

  revalidateTag(CACHE_TAGS.POSTS, "max");
  updateTag(CACHE_TAGS.postById(id));

  redirect(ROUTES.HOME);
}
