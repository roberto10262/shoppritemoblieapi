import { Router } from "express";
import * as controller from "./controller"

const stockRouter = Router()

stockRouter.post("/stock", controller.createStockController )
stockRouter.patch("/stock/:id", controller.updateStockController )
export {stockRouter}