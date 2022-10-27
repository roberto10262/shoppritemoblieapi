import { PrismaClient, Product } from "@prisma/client";
import { AppError } from "../../error/AppError";
import { InewProduct, IupdateProduct } from "./types";
import client from "../prismaclient";

const create_Product = async (new_product: InewProduct): Promise<Product> => {
  if (await exists(new_product.name))
    throw new AppError(
      `A product with the name ${new_product.name} already exists`
    );

  return await client.product.create({ data: new_product });
};

const get_Products = () =>
  client.product.findMany({
    include: { Stock: true },
  });

const get_One_Product = async (id: number) =>
  await client.product.findUniqueOrThrow({
    where: { id },
    include: { Stock: true },
  });

const delete_Product = async (id: number) =>
  await client.product.delete({ where: { id } });

const update_Product = async (id: number, input: IupdateProduct) => {
  const exists = await client.product.findUnique({ where: { id } });

  if (!exists) throw new AppError(`no product with id ${id} found`);

  return await client.product.update({ where: { id }, data: input });
};

const exists = async (name: string): Promise<boolean> => {
  return !!(await client.product.findUnique({ where: { name } }));
};

export {
  create_Product,
  delete_Product,
  update_Product,
  get_One_Product,
  get_Products,
};
