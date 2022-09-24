import { Request, Response } from "express";
import { createUser } from "./createUser";

const createUserController = async (req: Request, res: Response) => {
  try {
    await createUser(req.body);
  } catch (error) {
      console.log(error)
  }
  res.send(req.body)
};



export {createUserController}