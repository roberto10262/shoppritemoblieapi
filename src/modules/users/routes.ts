import { NextFunction, Request, Response, Router } from "express";
import { loginController, signupController } from "./controllers";
import { authenticate } from "./auth/authenticate";
import { Role } from "@prisma/client";
const userRouter = Router();

userRouter.post("/login", loginController);
userRouter
  .post("/signup", signupController);

export { userRouter };
