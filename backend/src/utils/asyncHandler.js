/**
 * A utility function that wraps an asynchronous request handler function
 * and handles any uncaught errors by passing them to the next middleware.
 *
 * @param {Function} requestHandlerFn - The asynchronous request handler function.
 * @returns {Function} - The wrapped request handler function.
 */
const asyncHandler = (requestHandlerFn) => {
  return (req, res, next) => {
    Promise.resolve(requestHandlerFn(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

export default asyncHandler;

/**
 * A utility function that wraps an asynchronous request handler function
 * and handles any uncaught errors by sending an error response.
 *
 * @param {Function} fn - The asynchronous request handler function.
 * @returns {Function} - The wrapped request handler function.
 */
const asyncHandlerWithTryCatch = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export { asyncHandlerWithTryCatch };
