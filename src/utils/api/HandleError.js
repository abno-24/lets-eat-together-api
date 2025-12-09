import { ApiError } from "./ApiError.js";

export const handleError = (error) => {
  throw error instanceof ApiError
    ? error
    : new ApiError(
      500,
      "An internal server error occurred. Please try again later.",
      [error?.message]
    );
};