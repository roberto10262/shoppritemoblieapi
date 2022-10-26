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
  const validData: InewUserSchema = await validateData(Schema, userData);

  const prisma = new PrismaClient();
  const exists = await prisma.user.findUnique({
    where: { username: validData.username },
  });

  if (exists) {
    throw new AppError("user already exists try another username!");
  }
  if (validData.role === "ADMIN") {
    const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });

    if (admin) throw new AppError("there's already an admin in aplication");
  }

  const newUser = await prisma.user.create({
    data: {
      name: validData.name,
      username: validData.username,
      password: await hashPassword(validData.password),
      role: validData.role,
    },
  });
  return newUser;
};

export { createUser };
