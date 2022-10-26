import { PrismaClient, Prisma, Sales, Stock, Product } from "@prisma/client";
import { AppError } from "../../error/AppError";
import { salesSchema, sellSchema } from "./schemas";

const prisma = new PrismaClient();

const sellProduct = async (data: any) => {
  const validData = await salesSchema.validate(data, { abortEarly: false });

  if (!validData) return;
  const products = await prisma.product.findMany({ include: { Stock: true } });

  const stock = checkStock(products, validData);
  if (!stock) return;

  await prisma.sales.createMany({ data: validData });
  return await prisma.stock.updateMany({ data: stock });
  // const stock = await prisma.stock.findUnique({
  //   where: { productId: validData.productId },
  // });
  // if (!stock || stock.availableQuantity <= validData.quantity)
  //   throw new AppError("Insuficient or Unavailable Stock");

  // const product = await prisma.product.findUniqueOrThrow({
  //   where: { id: validData.productId },
  // });
  // await prisma.sales.create({
  //   data: { ...validData, totalPrice: product.price * validData.quantity },
  // });

  // return await prisma.stock.update({
  //   where: { id: stock.id },
  //   data: { availableQuantity: stock.availableQuantity - validData.quantity },
  // });
};

export { sellProduct };

interface ProductWithStock extends Product {
  Stock: Stock | null;
}

const checkStock = (
  products: ProductWithStock[],
  data: { quantity: number; productId: number; totalPrice: number }[]
) =>
  data.map((el) => {
    const result = products.find((product) => product.id === el.productId);
    if (
      !result ||
      !result.Stock ||
      result.Stock.availableQuantity < el.quantity
    )
      throw new AppError("Unavailable Stock");
    return {
      id: result.Stock.id,
      availableQuantity: result.Stock.availableQuantity - el.quantity,
    };
  });
