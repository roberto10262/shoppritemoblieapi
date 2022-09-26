import { Role } from "@prisma/client";
import { Handler, NextFunction, Request, Response } from "express";
import { login } from "./auth/login";
import { generateToken } from "./auth/token";
import { createUser } from "./createUser";
import { Icredentials } from "./schemas";

const signupController: Handler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { username, role, name } = await createUser(request.body);

    const credentials: Icredentials = await getCredentials({
      username,
      name,
      role,
    });

    response.status(201).json(credentials);
  } catch (error) {
    next(error);
  }
};
const loginController: Handler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  
  try {
    const user = await login(request.body);
    
    if (user) response.json(await getCredentials(user));
  } catch (error) {
      next(error)
  }
};

export { signupController, loginController };

async function getCredentials<Icredentials>(userData: {
  username: string;
  name: string;
  role: Role;
}) {
  
  return  {
    token:  generateToken({
      username: userData.username,
      role: userData.role,
    }),
    userData,
  };
}
