import { NextFunction, Request, Response } from "express";
import { parseId } from "../utils/urlUtils";
import { newProductSchema, updateProductSchema } from "./schema";
import * as services from "./services";

const createController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  try {
    const product = await services.create_Product(
      await newProductSchema.validate(request.body, { abortEarly: false })
    );
    response.json(product);
  } catch (error) {
    next(error);
  }
};

const updateController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;

  try {
    const product = await services.update_Product(
      parseId(id),
      updateProductSchema.validateSync(request.body)
    );
    response.json(product);
  } catch (error) {
    next(error);
  }
};
const deleteController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;

  try {
    const product = await services.delete_Product(parseId(id));
    response.status(201).json({ message: "record deleted" });
  } catch (error) {
    next(error);
  }
};

const allProductsController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const products = await services.get_Products();
    response.json({ products: products });
  } catch (error) {
    next(error);
  }
};

const getByIdController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;

  try {
    const product = await services.get_One_Product(parseId(id));
    response.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export {
  createController,
  updateController,
  deleteController,
  allProductsController,
  getByIdController,
};
