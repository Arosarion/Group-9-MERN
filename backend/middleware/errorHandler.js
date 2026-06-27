const errorHandler = (err, req, res, next) => {
  // Log full error in development only
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  // Handle specific MongoDB/Mongoose errors
  // Duplicate key (e.g. email already exists)
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate field value",
      error: Object.keys(err.keyValue)[0] + " already exists",
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      error: Object.values(err.errors)
        .map((e) => e.message)
        .join(", "),
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: "Authentication failed",
    });
  }

  // Default - print full error in dev, hide in production
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.stack
        : "Something went wrong",
  });
};

module.exports = errorHandler;
