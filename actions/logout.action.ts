'use server';

import { clearUserSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants/routes.constants';

/**
 * @description Clears the user session and redirects to the login page.
 */
export async function logoutAction() {
  await clearUserSession();
  redirect(ROUTES.LOGIN);
}
