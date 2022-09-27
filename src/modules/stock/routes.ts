import { Role } from "@prisma/client";
import { Router } from "express";
import { authenticate } from "../users/auth/authenticate";
import * as controller from "./controller";

const stockRouter = Router();
stockRouter.post(
  "/stock",
  authenticate(["ADMIN", "MANAGER"]),
  controller.createStockController
);
stockRouter.patch(
  "/stock/:id",
  authenticate(["ADMIN", "MANAGER"]),
  controller.updateStockController
);
export { stockRouter };
