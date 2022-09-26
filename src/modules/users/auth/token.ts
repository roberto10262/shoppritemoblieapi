import jwt from "jsonwebtoken";
import { AppError } from "../../../error/AppError";
import { Icredentials } from "../schemas";


const getSecret = () => {
  const { JWT_SECRET } = process.env;
  if(!JWT_SECRET)throw new AppError("secret undefined", 500)
  return JWT_SECRET
};

const generateToken = (userData: { username: string; role: string }) => {
  const token = jwt.sign({ userData }, getSecret(), { expiresIn: "12h" });
  
  return token;
};

const verifyToken = (token: string): Icredentials => {
  let verifiedToken;
  try {
    verifiedToken = jwt.verify(token, getSecret()) as Icredentials;
  } catch (error) {
    throw new AppError("unauthorized", 401);
  }
  return verifiedToken;
};
function getToken(token: string | undefined): string {
  if (!token || !validToken(token)) throw new AppError("invalid token");

  return token.split(" ")[1];
}

const validToken = (token: string) =>
  token.split(" ").length == 2 && token.startsWith("Bearer");

export { generateToken, verifyToken, getToken };
