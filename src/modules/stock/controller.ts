import { NextFunction, Request, Response } from "express";
import validator from "../../lib/validator";
import { parseId } from "../utils/urlUtils";
import { createStock } from "./create";
import { updateStockSchema } from "./schemas";
import { updateStock } from "./update";

const createStockController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const stock = await createStock(request.body);
    response.status(201).json(stock);
  } catch (error) {
    next(error);
  }
};

const updateStockController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const quantity = await updateStockSchema.validate(request.body, {
      abortEarly: false,
    });
    console.log(quantity)
    const parsedId = parseId(request.params.id);

    if (!quantity || !parsedId) return;
   const stock= await updateStock(quantity.availableQuantity, parsedId);
    response.json(stock)
} catch (error) {
      next(error)
  }
};

export { createStockController, updateStockController };
