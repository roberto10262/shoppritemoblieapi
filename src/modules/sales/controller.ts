import { NextFunction, Request, Response } from "express";
import { sellProduct } from "./create";

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

export { sellController };
