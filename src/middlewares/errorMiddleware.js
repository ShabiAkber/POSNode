// middleware/errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
  console.error("🔥 Error:", err.message); // Log error to console

  const statusCode = err.statusCode || 500; // Default to Internal Server Error (500)
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;
