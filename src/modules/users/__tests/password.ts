import { NextFunction, Request, Response } from "express";
import { checkPassword, hashPassword } from "../utils/passwordUtils";


const passwordTest =async (request:Request, response: Response, next: NextFunction)=>{
    const {password} = request.body
    const hash = await hashPassword(password)
    const comparePassword = await checkPassword("divine2022", await hashPassword(password))
    
    response.json({hash: hash, compareResult: comparePassword})
   
    
}

export {passwordTest}