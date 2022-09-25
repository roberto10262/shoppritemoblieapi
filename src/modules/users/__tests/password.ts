import { NextFunction, Request, Response } from "express";
import { generateToken, verifyToken } from "../auth/token";
import { checkPassword, hashPassword } from "../utils/passwordUtils";

const passwordTest = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // const {password} = request.body
  // const hash = await hashPassword(password)
  // const comparePassword = await checkPassword("divine2022", await hashPassword(password))

  // response.json({hash: hash, compareResult: comparePassword})
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
 
   try {
    const verifiedToken = await verifyToken(token);
    response.json({ verifiedToken: verifiedToken });
   } catch (error) {
       
       response.end()
   }

 
};

export { passwordTest };
