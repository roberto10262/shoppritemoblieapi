import { AppError } from "../../error/AppError";
import validator from "../../lib/validator";

const parseId = (id: string | undefined) => {
 return  validator.number().validateSync(id);
};
export {parseId}