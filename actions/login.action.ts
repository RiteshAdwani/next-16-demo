"use server";

import { authenticateUser, setUserSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MESSAGES } from "@/constants/messages.constants";
import { ROUTES } from "@/constants/routes.constants";
import { loginSchema } from "@/schemas/login.schema";
import { AuthFormFields } from "@/constants/formFields.constants";

/**
 * @description Handles the login action for a user.
 */
export async function loginAction(formData: FormData) {
  // Extract email and password from the form data
  const data = {
    email: formData.get(AuthFormFields.EMAIL),
    password: formData.get(AuthFormFields.PASSWORD),
  };
  const parsedData = loginSchema.safeParse(data);
  if (!parsedData.success) {
    return { error: MESSAGES.REQUIRED_FIELDS };
  }

  // Authenticate the user with the provided credentials
  const user = await authenticateUser(parsedData.data.email, parsedData.data.password);
  if (!user) {
    return { error: MESSAGES.INVALID_CREDENTIALS };
  }

  // Set the user session and redirect to the home page
  await setUserSession(user);
  redirect(ROUTES.HOME);
}
