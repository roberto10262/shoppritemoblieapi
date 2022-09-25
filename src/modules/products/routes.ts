import { Router } from "express";
import { createController } from "./controllers";



const productRouter = Router()

productRouter.post("/create", createController)

export {productRouter}