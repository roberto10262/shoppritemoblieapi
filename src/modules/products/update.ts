import { prisma, PrismaClient } from "@prisma/client";
import { AppError } from "../../error/AppError";
import { updateProductSchema } from "./schema";

const updateProduct = async (data: any, id: number) => {
  const validData = await updateProductSchema.validate(data, {
    abortEarly: false,
  });
  const prisma = new PrismaClient();

  if (!validData) return;
  const exists = await prisma.product.findUnique({ where: { id } });
  if (!exists) throw new AppError("record not found", 404);
  return await prisma.product.update({
    where: { id: id },
    data: validData,
  });
};

export { updateProduct };
