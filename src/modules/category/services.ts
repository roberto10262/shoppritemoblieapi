import validator from "../../lib/validator";
import client from "../prismaclient";
import { Product, Category, prisma } from "@prisma/client";
import { INewCategory } from "./schemas";



const createCategory = async (category: INewCategory) => {
  await client.category.create({ data: category });
};

const getCategories = async () => await client.category.findMany();


export { getCategories, createCategory}