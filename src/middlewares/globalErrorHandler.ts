import { NotFoundError, PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ValidationError } from "yup";
import { AppError } from "../error/AppError";
import {
  handleUniqueConstraintError,
  PRISMA_ERROR_CODES,
} from "../error/prismaErrors";

const errorHanlder: ErrorRequestHandler = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof AppError)
    response.status(err.statusCode).json({ error: err.message });
  if (err instanceof ValidationError) response.json({ error: err.errors });
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === PRISMA_ERROR_CODES.uniqueConstraintError)
      response.json({
        error: handleUniqueConstraintError(err),
        meta: err.meta,
      });
    if (err.code === PRISMA_ERROR_CODES.recordNotFound)
      response.status(404).json({ error: "record not found" });
    if (err.code === PRISMA_ERROR_CODES.foreignKeyConstraintError)
      response.status(404).json({ error: "check relation record existence" });
      console.log("known err",err)
  }
 if(err instanceof NotFoundError) response.status(404).json({error: "record not found"})
  console.log(err)
};

export default errorHanlder;
