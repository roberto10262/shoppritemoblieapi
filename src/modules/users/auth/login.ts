import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../error/AppError";
import { validateData } from "../../../lib/validator";
import { loginSchema } from "../schemas";
import { checkPassword } from "../utils/passwordUtils";
import { generateToken } from "./token";

interface IloginCredentials {
  username: string;
  password: string;
}

const login = async (data: any) => {
  const validData = await validateData<IloginCredentials>(
    loginSchema,
    data
  );
  if (!validData) return;

  const prisma = new PrismaClient();

  const exists = await prisma.user.findUnique({
    where: { username: validData.username },
  });

  if (!exists) throw new AppError("Invalid Credentials", 401);

  if (!(await checkPassword(validData.password, exists.password)))
    throw new AppError("Invalid Credentials", 401);

  return { username: exists.username, name: exists.name, role: exists.role };
};

export { login };
