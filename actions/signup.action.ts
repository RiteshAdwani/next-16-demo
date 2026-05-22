"use server";

import { createUser, setUserSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MESSAGES } from "@/constants/messages.constants";
import { ROUTES } from "@/constants/routes.constants";
import { ErrorCodes } from "@/constants/errorCodes.constants";
import { signupSchema } from "@/schemas/signup.schema";
import { AuthFormFields } from "@/constants/formFields.constants";

/**
 * @description Handles the signup action for a new user.
 */
export async function signupAction(formData: FormData) {
  // Extract email, password, and name from the form data
  const data = {
    email: formData.get(AuthFormFields.EMAIL),
    password: formData.get(AuthFormFields.PASSWORD),
    name: formData.get(AuthFormFields.NAME),
  };
  const parsedData = signupSchema.safeParse(data);
  if (!parsedData.success) {
    return { error: MESSAGES.REQUIRED_FIELDS };
  }

  // Create a new user and set the user session
  try {
    const user = await createUser(parsedData.data);
    await setUserSession({ id: user.id, email: user.email, name: user.name });
    redirect(ROUTES.HOME);
  } catch (e) {
    if (
      typeof e === "object" &&
      e &&
      "code" in e &&
      (e as { code: string }).code === ErrorCodes.UniqueConstraintFailed
    ) {
      return { error: MESSAGES.EMAIL_IN_USE };
    }
    return { error: MESSAGES.SIGNUP_FAILED };
  }
}
