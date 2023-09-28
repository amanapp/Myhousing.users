
import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";
import { AcceptAny } from "../interface/global.interface";

export interface CustomRequest extends Request {
    token: any;
    userId:string;
    iat:string;
    exp:string;
    jti:string;
}


class AuthMiddleware {
  private access_secret: string = process.env.ACESSES_kEY as string;
  private referace_secret: string = process.env.REFERECE_TOKEN_KEY as string;

  public acessToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    
    try {
        const token = req.headers.authorization?.replace('Bearer ','');
    if (!token) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: ExceptionMessage.AUTH_INVALID_TOKEN });
    }

    const decodedToken: any = <JwtPayload>jwt.verify(token, this.access_secret);
    (req as CustomRequest).token =decodedToken;
    next();
    } catch (e:AcceptAny) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });

    }
  };

  public referaceToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ','');

    if (!token) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: ExceptionMessage.AUTH_INVALID_TOKEN });
    }

    const decodedToken: any = <JwtPayload>jwt.verify(token, this.referace_secret);
    (req as CustomRequest).token =decodedToken;

    next();
  
    } catch (e:AcceptAny) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });

    }
}
}
export const AuthMiddlewares=  new AuthMiddleware();