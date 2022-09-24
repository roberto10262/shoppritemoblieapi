import { Router, Request, Response } from "express";
import { passwordTest } from "./password";

const testsRouter = Router();

testsRouter.post("/password", passwordTest);
export { testsRouter };
