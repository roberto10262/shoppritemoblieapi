import { PrismaClient, Prisma, Sales } from "@prisma/client";
import { AppError } from "../../error/AppError";
import { sellSChema } from "./schemas";

const sellProduct = async (data: any) => {
  const validData = await sellSChema.validate(data, { abortEarly: false });

  if (!validData) return;

  const prisma = new PrismaClient();
  const stock = await prisma.stock.findUnique({
    where: { productId: validData.productId },
  });
  if (!stock || stock.availableQuantity <= validData.quantity)
    throw new AppError("Insuficient or Unavailable Stock");

  const product = await prisma.product.findUnique({
    where: { id: validData.productId },
  });
  await prisma.sales.create({ data: { ...validData } });

  return await prisma.stock.update({
    where: { id: stock.id },
    data: { availableQuantity: stock.availableQuantity - validData.quantity },
  });
};

export { sellProduct };
