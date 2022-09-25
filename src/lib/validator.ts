import * as validator from "yup";
import { AppError } from "../error/AppError";

export const validateData = async <DataInterface>(
  schema: validator.AnyObjectSchema,
  data: DataInterface
) => {
  const validData = (await schema.validate(data, {
    abortEarly: false,
  })) as DataInterface;
  
  if (validData) return validData;
  return
};

export default validator;
