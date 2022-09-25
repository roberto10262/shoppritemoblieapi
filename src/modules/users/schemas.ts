import validator from "../../lib/validator";
import { Role } from "@prisma/client";
import { StringDecoder } from "string_decoder";
const newUserSchema = validator.object().shape({
  username: validator
    .string()
    .required()
    .min(5, "Very short, username must be at least 5 characters long"),
  name: validator.string().required(),
  password: validator
    .string()
    .required()
    .min(8, "password must be at least 8 characters long"),
  passwordVerify: validator
    .string()
    .required()
    .oneOf([validator.ref("password")], "password must match"),
  role: validator
    .string()
    .oneOf([Role.ADMIN, Role.MANAGER, Role.WORKER])
    .required(),
});

const loginSchema = validator.object().shape({
  username: validator
    .string()
    .required()
    .min(5, "Very short, username must be at least 5 characters long"),
  password: validator
    .string()
    .required()
    .min(8, "password must be at least 8 characters long"),
});

interface Icredentials {
  token: string;
  userData: {
    username: string;
    name: string;
    role: Role;
  };
}

export { newUserSchema, loginSchema, Icredentials };
