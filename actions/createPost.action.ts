"use server";

import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

import { createPost } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

import { MESSAGES } from "@/constants/messages.constants";
import { CACHE_TAGS } from "@/constants/cacheTags.constants";
import { ROUTES } from "@/constants/routes.constants";
import { PostFormFields } from "@/constants/formFields.constants";

/**
 * @description Handles the creation of a new post.
 * Validates the input and ensures the user is authenticated before creating the post.
 * After successful creation, it revalidates the relevant cache tags and redirects to the home page.
 */
export async function createPostAction(formData: FormData) {
  // Ensure the user is authenticated before allowing post creation
  const user = await getCurrentUser();
  if (!user) {
    return { error: MESSAGES.LOGIN_REQUIRED };
  }

  // Extract and validate the title and content from the form data
  const title = String(formData.get(PostFormFields.TITLE) ?? "").trim();
  const content = String(formData.get(PostFormFields.CONTENT) ?? "").trim();

  if (!title || !content) {
    return { error: MESSAGES.REQUIRED_FIELDS };
  }

  // Create the new post
  await createPost({ title, content, authorId: user.id });

  revalidateTag(CACHE_TAGS.POSTS, "max");
  redirect(ROUTES.HOME);
}
