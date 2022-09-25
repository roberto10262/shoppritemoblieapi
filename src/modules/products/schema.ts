import validator from "../../lib/validator";
import { Product } from "@prisma/client";
const newProductSchema = validator.object().shape({
    name: validator.string().required(),
    price: validator.number().required(),
})

export {newProductSchema}