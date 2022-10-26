import { PrismaClient } from "@prisma/client";
import e from "express";

const prisma = new PrismaClient();

const getAllSales = async () => {
  const grouped = await prisma.sales.groupBy({
    by: ["productId"],
    _sum: {
      totalPrice: true,
    },
    _count:{ id:true}
  });
  const sales = await prisma.sales.findMany({
    select: { productId: true, product: {select:{name:true, category:true}} },
  
  });

  const result = grouped.map( (el) => {
     
    return {
      numberOfSales: el._count.id,
      totalSold: el._sum.totalPrice ,
      ...sales.find((sale) => sale.productId === el.productId),
    };
  });
console.log(result)

  return result
};

export { getAllSales };
