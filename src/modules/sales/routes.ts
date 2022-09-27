import { Router } from "express";
import { authenticate } from "../users/auth/authenticate";
import * as controller from "./controller";

const salesRouter = Router();

salesRouter
  .route("/sales")
  .all(authenticate(["MANAGER", "ADMIN", "WORKER"]))
  .get(controller.allSalesController)
  .post(controller.sellController);

export { salesRouter };
