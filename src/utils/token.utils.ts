import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import Token from "../database/models/token.model";
import '../config/env'
import { TokenEntity } from "../entitys/token.entity";

class tokenCreation{
    public userId!: string;
    public refreshToken!:string |undefined;
    public accessToken!:string|undefined;
  
   
    /**
     * @description create access token & reference token
     * @param userId
     * @returns
     */
    async createAcessToken(userId:string) {
      const uuId:string = uuidv4();
      const accessSecretKey= <string>process.env.ACESSES_kEY;
  
      const accessToken = jwt.sign({ userId }, accessSecretKey, {
          expiresIn: process.env.ACCESS_TOKEN_TTL,
          jwtid: uuId,
        });
        return {"accessToken":accessToken ,"jti":uuId}

      }

        async createRefreshToken(userId:string) {
          const uuId:string = uuidv4();

        const refreshTokenKey = <string>process.env.REFERECE_TOKEN_KEY;

        const refreshToken = jwt.sign({ userId }, refreshTokenKey, {
          expiresIn: process.env.REFERACE_TOKEN_TTL,
          jwtid: uuId,
        });
        
        return {"referaceToken":refreshToken ,"jti":uuId}

    }
}
export const TokenCreation=new tokenCreation();