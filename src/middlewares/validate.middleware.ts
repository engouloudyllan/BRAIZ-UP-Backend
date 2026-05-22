import express from "express";
import ResponseHandler from "../helpers/responses.js";

export const validate = (schema: any) => {
  return async (
    req: any,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      await schema.validate(
        { ...req.body, ...req.files, ...req.params},
        { strict: false, abortEarly: false },
      );
      next();
    } catch (error) {
      return ResponseHandler.error(res, error, "Validation failed !!!", 422);
    }
  };
};
