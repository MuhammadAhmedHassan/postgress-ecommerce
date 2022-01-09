import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

/**
 * Common Response Structure
 * {
 *  errors: {
 *    message: string, field?: string
 *  }[]
 * }
 */

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // Typeorm errors
  // Make classes for typeorm errors as well

  console.error(err);
  res.status(400).send({ errors: [{ message: "Something went wrong" }] });
};
