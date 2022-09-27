import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getAllSales =async()=> await prisma.sales.findMany()


export {getAllSales}