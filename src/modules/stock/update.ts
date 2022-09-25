import { PrismaClient } from "@prisma/client";
import { AppError } from "../../error/AppError";

const updateStock = async (quantity: number, id: number) => {
  const prisma = new PrismaClient();
  const stockAvailable = await prisma.stock.findUnique({ where: { id } });

  if (!stockAvailable)
    throw new AppError("Record not found",404);
    
    return await prisma.stock.update({
      where: { id },
      data: { availableQuantity: stockAvailable.availableQuantity + quantity },
    });
};

export { updateStock };
