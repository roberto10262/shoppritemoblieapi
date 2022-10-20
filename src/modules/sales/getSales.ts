import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllSales = async () =>
  await prisma.sales.findMany({
    include: { product: { select: { name: true, price: true } } },
  });

export { getAllSales };
