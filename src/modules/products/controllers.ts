import { create } from "domain";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../error/AppError";
import { validateData } from "../../lib/validator";
import { createProduct } from "./create";
import { newProductSchema } from "./schema";
import { InewProduct } from "./types";

const createController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const product = await createProduct(request.body)
    response.json(product);
  } catch (error) {
      next(error)
  }
};

export { createController };
