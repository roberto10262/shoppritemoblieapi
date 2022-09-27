import { NextFunction, Request, Response } from "express";
import { sellProduct } from "./create";
import { getAllSales } from "./getSales";

const sellController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const sold = await sellProduct(request.body);
    response.json(sold);
  } catch (error) {
    next(error);
  }
};
const allSalesController  = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const sales = await getAllSales()
    response.status(200).json(sales)
  } catch (error) {
    next(error)
  }
}

export { sellController,allSalesController };
