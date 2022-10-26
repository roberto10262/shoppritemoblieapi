import validator from "../../lib/validator";
import { Product } from "@prisma/client";
const newProductSchema = validator.object().shape({
  name: validator.string().required(),
  price: validator.number().required(),
  categoryId: validator.number().required()
}).noUnknown(true);

const updateProductSchema = validator
  .object()
  .shape({
    name: validator.string().notRequired(),
    price: validator.number(),
    active: validator.boolean(),
  }).noUnknown(true);

export { newProductSchema, updateProductSchema };
