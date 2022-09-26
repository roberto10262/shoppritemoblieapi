import { Router } from "express";
import { IprotectedRoute } from "../users/auth/protectedRoutes";
import { sellController } from "./controller";

// const protected:IprotectedRoute={
//     path:""
// }

const salesRouter = Router()

salesRouter.post("/sales", sellController)

export {salesRouter}