import { PrismaClient } from "@prisma/client";
import { createStockSchema } from "./schemas";

const createStock = async (data: any) => {
  const validData = await createStockSchema.validate(data, {
    abortEarly: false,
  });
  if (!validData) return;
  const prisma = new PrismaClient();

  const stock = await prisma.stock.create({ data: validData });
  return stock;
};

export { createStock };
