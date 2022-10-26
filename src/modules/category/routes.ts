import { Router } from "express";
import { authenticate } from "../users/auth/authenticate";
import * as categoryControllers from "./controlers";

const categoryRouter = Router();

categoryRouter
  .route("/categories")
  .get(categoryControllers.getAll)
  .post(authenticate(["ADMIN", "MANAGER"]), categoryControllers.create);


export { categoryRouter}