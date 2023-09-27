import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";

export interface CustomRequest extends Request {
    email:string;
    jti:string;
    iat:string;
}


class AuthMiddleware {
  private access_secret: string = process.env.ACESSES_kEY as string;
  private referace_secret: string = process.env.REFERECE_TOKEN_KEY as string;

  public acessToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers.authorization?.replace('Bearer ','');
    if (!token) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: ExceptionMessage.AUTH_INVALID_TOKEN });
    }

    const decodedToken: any = <JwtPayload>jwt.verify(token, this.access_secret);
    req.body.isData=decodedToken
    next();
  };

  public referaceToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers.authorization?.replace('Bearer ','');

    if (!token) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: ExceptionMessage.AUTH_INVALID_TOKEN });
    }

    const decodedToken: any = <JwtPayload>jwt.verify(token, this.referace_secret);
    req.body.isData = decodedToken;

    next();
  };
}

export const AuthMiddlewares=  new AuthMiddleware();
