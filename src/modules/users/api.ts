import { Router } from "express";
import { createUserController } from "./userController";

const userApi = Router()

userApi.post("/createuser", createUserController)



export {userApi}