import { ApiError } from "@/core/errors/apiError";

const GENERIC = "Something went wrong. Please try again.";

/**
 * Converts any thrown value into a message that is safe to show to users.
 * Raw technical errors are never surfaced. Backend-authored messages are only
 * shown for business-rule / validation failures (409, 422).
 */
export function getLeaveErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.isForbidden)
      return "You do not have permission to perform this action.";
    if (error.isNotFound)
      return "This leave request could not be found. It may have been removed.";
    if ((error.status === 409 || error.isValidationError) && error.message)
      return error.message;
    if (error.isServerError)
      return "The server is unavailable right now. Please try again shortly.";
  }
  return GENERIC;
}
