import express from "express";

class ResponseHandler {
  static success<T>(
    res: express.Response,
    data: T,
    message: string,
    statusCode: number = 200,
  ) {
    return res.status(statusCode).json({
      meta: {
        message: message || "The request executed successfully. !!!",
        status: statusCode,
      },
      data,
    });
  }
  static error(
    res: express.Response,
    error: any,
    message: string,
    statusCode: number = 500,
  ) {
    return res.status(statusCode).json({
      meta: {
        message: message || "An error occurred while processing the request.",
        status: statusCode,
      },
      error: error || "An error occured",
    });
  }
  static notFound(
    res: express.Response,
    message: string = "The requested resource was not found.",
    statusCode: number = 404,
  ) {
    return res.status(statusCode).json({
      meta: {
        message: message,
        status: statusCode,
      },
    });
  }
}

export default ResponseHandler;
