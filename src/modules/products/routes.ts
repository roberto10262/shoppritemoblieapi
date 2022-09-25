import { Router } from "express";
import * as controller from "./controllers";

const productRouter = Router();

productRouter.get("/products", controller.allProductsController);
productRouter.get("/products/:id", controller.getByIdController);

productRouter.post("/products/create", controller.createController);
productRouter.patch ("/products/update/:id", controller.updateController);
productRouter.delete("/products/delete/:id", controller.deleteController);
export { productRouter };
