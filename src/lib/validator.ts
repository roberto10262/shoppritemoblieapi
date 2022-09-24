import * as validator from "yup";
import { AppError } from "../error/AppError";

export const validateData = async (
  schema: validator.AnyObjectSchema,
  data: any,
) => {
  try {
    let validData = await schema.validate(data, { abortEarly: false });
    return validData
  } catch (error) {
    let err = error as validator.ValidationError;
    throw new AppError(`${err.errors}`);
  }
};

export default validator;