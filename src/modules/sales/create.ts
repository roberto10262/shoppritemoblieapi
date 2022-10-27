import {
  PrismaClient,
  Prisma,
  Sales,
  Stock,
  Product,
  PrismaPromise,
} from "@prisma/client";
import { AppError } from "../../error/AppError";
import { salesSchema, sellSchema } from "./schemas";
import client from "../prismaclient";

const sellProduct = async (data: any) => {
  const validData = await salesSchema.validate(data, { abortEarly: false });

  if (!validData) return;
  if (validData.length == 0)
    throw new AppError("can't sell nothing, provide a product");

  const products = await client.product.findMany({ include: { Stock: true } });

  const stock = checkStock(products, validData);
  if (!stock) return;

  const updateStock = async (stock: Stock) => {
    return await client.stock.update({
      where: { id: stock.id },
      data: { availableQuantity: stock.availableQuantity },
    });
  };

  const result = await Promise.all(stock.map((el) => updateStock(el)));
  //console.log(result)

  const [sales] = await client.$transaction([
    client.sales.createMany({ data: validData }),
  ]);

  return { sales };
};

export { sellProduct };

interface ProductWithStock extends Product {
  Stock: Stock | null;
}

interface Idata {
  quantity: number;
  productId: number;
  totalPrice: number;
}
const checkStock = (products: ProductWithStock[], data: Idata[]) => {
  return data.map((el) => {
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
      productId: result.Stock.productId,
    };
  });
};
