import AppError from "../utils/AppError.js";

const handleCastError = (err) => {
  return new AppError(`invalid ${err.path}:${err.value}`, 400);
};

const handleValidationError = (err, res) => {
  const keys = Object.keys(err.errors);
  const value = keys.map((key) => err.errors[key].message);
  return res.status(400).json({ status: err.status, message: value });
};

const handleTokenExpiredError = () => {
  return new AppError("token expired please login again", 401);
};

const devErr = (err, res) => {
  const messageHandler = () => {
    const keys = Object.keys(err.errors);
    const value = keys.map((key) => err.errors[key].message);
    return value;
  };

  return res.status(err.statusCode).json({
    status: err.status,
    message: err.name === "ValidationError" ? messageHandler() : err.message,
    stack: err.stack,
    error: err,
  });
};

const prodError = (err, res) => {
  if (err.isOperational) {
    return res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  } else {
    return res.status(500).json({
      status: "error",
      message: "something went wrong!",
    });
  }
};

const errorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV.trim() === "production") {
    switch (err.name) {
      case "CastError":
        err = handleCastError(err);
        break;
      case "ValidationError":
        err = handleValidationError(err, res);
        break;
      case "TokenExpiredError":
        err = handleTokenExpiredError(err);
        break;
      default:
        prodError(err, res);
    }
  } else if (process.env.NODE_ENV.trim() === "development") {
    devErr(err, res);
  }
};

export { errorController };
