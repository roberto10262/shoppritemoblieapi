import { PrismaClient } from "@prisma/client";
import { AppError } from "../../error/AppError";
import { IcreateStock } from "./types";
import client from "../prismaclient";

const update_Stock = async (quantity: number, id: number) => {
  const stockAvailable = await client.stock.findUniqueOrThrow({
    where: { productId: id },
  });
  if (quantity + stockAvailable.availableQuantity < 0)
    throw new AppError("stock cannot be less than zero");
  return await client.stock.update({
    where: { productId: id },
    data: { availableQuantity: stockAvailable.availableQuantity + quantity },
  });
};

const create_Stock = async (stock: IcreateStock) => {
  const exists = await client.stock.findUnique({
    where: { productId: stock.productId },
  });
  if (exists)
    throw new AppError(`Product already in stock, update existing`, 400);
  return await client.stock.create({ data: stock });
};

export { create_Stock, update_Stock };
