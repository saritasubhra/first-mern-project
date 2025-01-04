const AppError = require("../utils/appError");

const globalErrorHandler = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CastError") {
    const message = `Invalid ${err.path} - ${err.value}`;
    err = new AppError(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    err = new AppError("Please log in.", 401);
  }
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err,
  });
};

module.exports = globalErrorHandler;
