import { NextFunction, Request, Response } from "express";
import { parseId } from "../utils/urlUtils";
import { createProduct } from "./create";
import { deleteProduct } from "./delete";
import { getAllProducts, getProductById } from "./getProducts";
import { updateProduct } from "./update";

const createController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const product = await createProduct(request.body);
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
    const parsedId = parseId(id);
    if (parsedId) {
      const product = await updateProduct(request.body, parsedId);
      response.json(product);
    }
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
    const parsedId = parseId(id);
    if (parsedId) {
      const product = await deleteProduct(parsedId);

      response.status(201).json({ message: "record deleted" });
    }
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
    const products = await getAllProducts();
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
    const parsedId = parseId(id);
    if (parsedId) {
      const product = await getProductById(parsedId);
      if (!product) response.status(404).json(null);

      response.status(200).json(product);
    }
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
