import { PrismaClient } from "@prisma/client";

const getAllProducts = async () => {
  const prisma = new PrismaClient();
  return await prisma.product.findMany({include:{Stock:true}});
};

const getProductById = async (id: number) => {
  const prisma = new PrismaClient();
  return await prisma.product.findUnique({
    where: { id },
    include: { Stock: true },
  });
};

export { getAllProducts, getProductById };
