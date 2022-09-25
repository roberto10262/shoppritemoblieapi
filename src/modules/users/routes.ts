import { NextFunction, Request, Response, Router } from "express";
import { loginController, signupController } from "./controllers";
import { authenticate } from "./auth/authenticate";
import { Role } from "@prisma/client";
const userRouter = Router();

userRouter.post("/login", loginController);
userRouter.post("/signup", signupController);

userRouter
  .use(authenticate([Role.MANAGER]))
  .route("/")
  .get((request: Request, response: Response, next: NextFunction) => {
    response.send("HELLO");
  });
export { userRouter };
