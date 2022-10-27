import { PrismaClient } from "@prisma/client";
import client from "../prismaclient";


const getAllSales = async () => {
  const grouped = await client.sales.groupBy({
    by: ["productId"],
    _sum: {
      totalPrice: true,
    },
    _count:{ id:true}
  });
  const sales = await client.sales.findMany({
    select: { productId: true, product: {select:{name:true, category:true}} },
  
  });

  const result = grouped.map( (el) => {
     
    return {
      numberOfSales: el._count.id,
      totalSold: el._sum.totalPrice ,
      ...sales.find((sale) => sale.productId === el.productId),
    };
  });


  return result
};

export { getAllSales };
