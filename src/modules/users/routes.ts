import { Router } from "express";
import { loginController, signupController } from "./controllers";
import { authenticate } from "./auth/authenticate";
const userRouter = Router();

userRouter.post("/login", loginController);
userRouter.post("/signup", authenticate(["ADMIN"]), signupController);

export { userRouter };
