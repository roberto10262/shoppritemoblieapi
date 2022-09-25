import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../error/AppError";


const errorHanlder:ErrorRequestHandler = (err: Error, request:Request, response:Response, next: NextFunction) =>{
    if(err instanceof AppError)
        response.status(err.statusCode).json({error: err.message})
    
}


export default errorHanlder