/**
 * A middleware function to handle asynchronous route handlers.
 * It takes a function as an argument which is the route handler,
 * and returns a new function that wraps the original function.
 * The new function returns a promise that resolves to the result
 * of the original function, or rejects with an error if the
 * original function throws or rejects a promise.
 * @param {function} requestHandler - The route handler function.
 * @returns {function} - A new function that wraps the original function.
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
