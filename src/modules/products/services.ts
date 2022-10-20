import { PrismaClient, Product } from "@prisma/client";
import { AppError } from "../../error/AppError";
import { InewProduct, IupdateProduct } from "./types";
const prisma = new PrismaClient();

const create_Product = async (new_product: InewProduct): Promise<Product> => {
  if (await exists(new_product.name))
    throw new AppError(
      `A product with the name ${new_product.name} already exists`
    );

  return await prisma.product.create({ data: new_product });
};

const get_Products = () =>
  prisma.product.findMany({
    include: { Stock: { select: { availableQuantity: true } } },
  });

const get_One_Product = async (id: number) =>
  await prisma.product.findUniqueOrThrow({
    where: { id },
    include: { Stock: { select: { availableQuantity: true } } },
  });

const delete_Product = async (id: number) =>
  await prisma.product.delete({ where: { id } });

const update_Product = async (id: number, input: IupdateProduct) => {
  const exists = await prisma.product.findUnique({ where: { id } });

  if (!exists) throw new AppError(`no product with id ${id} found`);

  return await prisma.product.update({ where: { id }, data: input });
};

const exists = async (name: string): Promise<boolean> => {
  return !!(await prisma.product.findUnique({ where: { name } }));
};

export {
  create_Product,
  delete_Product,
  update_Product,
  get_One_Product,
  get_Products,
};
