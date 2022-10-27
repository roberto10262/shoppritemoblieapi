import { validateData } from "../../lib/validator";
import { AppError } from "../../error/AppError";
import { Role } from "@prisma/client";
import { newUserSchema as Schema } from "./schemas";
import { hashPassword } from "./utils/passwordUtils";
import client from "../prismaclient"
interface InewUserSchema {
  name: string;
  username: string;
  password: string;
  role: Role;
}

const createUser = async (userData: any) => {
  const validData: InewUserSchema = await validateData(Schema, userData);

  
  const exists = await client.user.findUnique({
    where: { username: validData.username },
  });

  if (exists) {
    throw new AppError("user already exists try another username!");
  }
  if (validData.role === "ADMIN") {
    const admin = await client.user.findFirst({ where: { role: "ADMIN" } });

    if (admin) throw new AppError("there's already an admin in aplication");
  }

  const newUser = await client.user.create({
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
