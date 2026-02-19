const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      // Handle ApiError instances
      if (err.statusCode) {
        return res.status(err.statusCode).json({
          success: false,
          message: err.message,
          errors: err.errors || [],
        });
      }
      
      // Handle other errors
      console.error("Unhandled error:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    });
  };
};

export { asyncHandler };





