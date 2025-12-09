import { ApiError } from "@utils/api/ApiError.js";

const errorHandler = (err, req, res, next) => {
  // Checks if the error is an instance of ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      success: err.successs,
      message: err.message,
      errors: err.errors,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  // Handles unknown error
  return res.status(500).json({
    statusCode: 500,
    success: false,
    message: "Internal Server Error",
    errors: [err.errors],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export { errorHandler };