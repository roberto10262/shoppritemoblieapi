import { NextFunction, Request, Response } from "express";
import { parseId } from "../utils/urlUtils";
import { createStock } from "./create";
import { createStockSchema, updateStockSchema } from "./schemas";
import { updateStock } from "./update";
import * as services from "./services";
const createStockController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const stock = await services.create_Stock(
      createStockSchema.validateSync(request.body)
    );
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
  const { id } = request.params;
  try {
    const stock = await services.update_Stock(
      updateStockSchema.validateSync(request.body).availableQuantity,
      parseId(id)
    );
    response.json(stock);
  } catch (error) {
    next(error);
  }
};

export { createStockController, updateStockController };
