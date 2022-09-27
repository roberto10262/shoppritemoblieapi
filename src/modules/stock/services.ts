import { PrismaClient } from "@prisma/client";
import { AppError } from "../../error/AppError";
import { IcreateStock } from "./types";

const prisma = new PrismaClient();

const update_Stock = async (quantity: number, id: number) => {
  const stockAvailable = await prisma.stock.findUniqueOrThrow({
    where: { productId: id },
  });
  return await prisma.stock.update({
    where: { productId: id },
    data: { availableQuantity: stockAvailable.availableQuantity + quantity },
  });
};

const create_Stock = async (stock: IcreateStock) => {
  const exists = await prisma.stock.findUnique({
    where: { productId: stock.productId },
  });
  if (exists)
    throw new AppError(`Product already in stock, update existing`, 400);
  return await prisma.stock.create({ data: stock });
};

export { create_Stock, update_Stock };
