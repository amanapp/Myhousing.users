import { AcceptAny } from "../interface/global.interface";
import { TokenCreation } from "../utils/token.utils";
import { TokenEntity } from "../entitys/token.entity";


class tokenServices{
    async refeshToken(userId:string,jti:string){
     try {
        const accessToken:AcceptAny=await TokenCreation.createAcessToken(userId);
          await TokenEntity.Update({accessToken:accessToken.jti},{where:{refreshToken:jti}})
          return accessToken;
     } catch (e:AcceptAny) {
        throw new Error(e.message)
     }
    }
}
export const TokenServices=new tokenServices();