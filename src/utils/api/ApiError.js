class ApiError extends Error {
  /**
   * Creates a new instance of the ApiError class.
   * @param {number} statusCode The HTTP status code for the error.
   * @param {string} [message="App Crashed!"] The error message.
   * @param {Array} [errors=[]] An array of error objects.
   * @param {string} [stack=""] The error stack trace. If not provided, the default error stack trace is used.
   */
  constructor(statusCode, message = "App Crashed!", errors = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
