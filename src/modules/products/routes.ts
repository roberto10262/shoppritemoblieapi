import { Router } from "express";
import { authenticate } from "../users/auth/authenticate";
import * as controller from "./controllers";

const productRouter = Router();

productRouter
  .route("/products")
  .get(controller.allProductsController)
  .post(authenticate(["ADMIN", "MANAGER"]), controller.createController);

productRouter
  .route("/products/:id")
  .get(controller.getByIdController)
  .all(authenticate(["ADMIN", "MANAGER"]))
  .patch(controller.updateController)
  .delete(controller.deleteController);


export { productRouter };
