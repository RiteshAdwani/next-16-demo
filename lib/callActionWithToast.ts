import toast from "react-hot-toast";

/**
 * Wraps a server action and automatically shows a toast if the result contains an error property.
 * Returns the result of the action.
 */
type ActionResult = { error?: string } & Record<string, unknown>;

export async function callActionWithToast<T extends ActionResult, A extends unknown[]>(
  action: (...args: A) => Promise<T>,
  ...args: A
): Promise<T> {
  const result = await action(...args);
  if (result && typeof result === "object" && "error" in result && result.error) {
    toast.error(result.error as string);
  }
  return result;
}
