import { AppError } from "../../error/AppError";
import validator from "../../lib/validator";

const parseId = (id: string | undefined): number => {
  const valid = validator.number().typeError(`provide a valid id - id must be a number`).validateSync(id)
  if (!valid)
    throw new AppError(`provide a valid id - id must be a number, hehe!`);
  return valid;
};
export { parseId };
