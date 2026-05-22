import type { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    meta: {
      success: false,
      status: statusCode,
    },
    message: err.message || "An unexpected error occurred.",
  });
};

export default errorHandler;
