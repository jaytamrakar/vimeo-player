/**
 * A utility function that wraps an asynchronous request handler function
 * and handles any uncaught errors by passing them to the next middleware.
 */
const asyncHandler = (requestHandlerFn) => {
  return (req, res, next) => {
    Promise.resolve(requestHandlerFn(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

export { asyncHandler };

/**
 * A utility function that wraps an asynchronous request handler function
 * and handles any uncaught errors by sending an error response.
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
