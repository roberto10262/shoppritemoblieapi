import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ValidationError } from "yup";
import { AppError } from "../error/AppError";


const errorHanlder:ErrorRequestHandler = (err: Error, request:Request, response:Response, next: NextFunction) =>{
    if(err instanceof AppError)
        response.status(err.statusCode).json({error: err.message})
    if(err instanceof ValidationError)(
        response.json({error: err.errors})
    )

    
}


export default errorHanlder