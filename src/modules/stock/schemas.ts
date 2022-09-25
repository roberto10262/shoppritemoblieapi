import validator from "../../lib/validator";

const createStockSchema = validator.object().shape({
    availableQuantity: validator.number().required().min(0),
    productId: validator.number().required()
}).noUnknown(true)

const updateStockSchema = validator.object().shape({
    availableQuantity: validator.number().required()
}).noUnknown(true)

export {createStockSchema, updateStockSchema}