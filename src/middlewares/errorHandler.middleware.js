import { ApiError } from "../utils/api/ApiError.js";

/**
 * Error handler middleware to handle errors in the application.
 * @param {Error} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @returns {Promise<void>} - Promise to handle the error.
 * If the error is an instance of ApiError, it returns a JSON response with the error details.
 * If the error is unknown, it returns a JSON response with a generic 500 Internal Server Error message.
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      success: err.successs,
      message: err.message,
      errors: err.errors,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  return res.status(500).json({
    statusCode: 500,
    success: false,
    message: "Internal Server Error",
    errors: [err.errors],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export { errorHandler };
