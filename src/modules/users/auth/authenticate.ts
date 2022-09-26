import { Role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../error/AppError";
import { getToken, verifyToken } from "./token";

const authenticate =
  (options: Role[]) =>
  (request: Request, response: Response, next: NextFunction) => {
    const authorization = request.headers.authorization;

    if (!authorization) throw new AppError("Unauthorized", 401);

    const { userData } = verifyToken(getToken(authorization));
    if (!options.find((role) => role === userData.role))
      throw new AppError("Unauthorized", 401);

    next();
  };

export { authenticate };
