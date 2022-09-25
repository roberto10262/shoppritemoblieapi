import { PrismaClient } from "@prisma/client";

const deleteProduct = async (id: number) => {
  const prisma = new PrismaClient();
  return !!(await prisma.product.delete({ where: { id } }));
};
export { deleteProduct };
