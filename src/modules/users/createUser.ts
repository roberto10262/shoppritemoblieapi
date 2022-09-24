import { validateData } from "../../lib/validator";
import { PrismaClient, Role } from "@prisma/client";
import { AppError } from "../../error/AppError";
import { newUserSchema as Schema } from "./schemas";
import { hashPassword } from "./utils/passwordUtils";

interface InewUserSchema {
  name: string;
  username: string;
  password: string;
  role: Role;
}

const createUser = async (userData: any) => {
  let validData: InewUserSchema;
  try {
    validData = await validateData(Schema, userData);
  } catch (err) {
    let error = err as AppError;
    throw new AppError(error.message);
  }

  const prisma = new PrismaClient();
  const exists = await prisma.user.findUnique({
    where: { username: validData.username },
  });
  
  if(exists){
    throw new AppError("user already exists try another username!")
  }

  const newUser = await prisma.user.create({
    data: {
      name: validData.name,
      username: validData.username,
      password: await hashPassword(validData.password),
      role: validData.role,
    },
  });
  return newUser
};

export { createUser };
