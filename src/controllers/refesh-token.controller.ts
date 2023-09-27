import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";
import { AcceptAny } from "../interface/global.interface";
import { Request, Response } from "express";
import { TokenServices } from "../services/resh-token.service";


class tokenController{
    async refeshToken(req:Request,res:Response){
     try {
        const {isData}=req.body
        const token=await TokenServices.refeshToken(isData.userId,isData.jti);
        res
        .status(HttpStatusCode.CREATED)
        .json({ message: ExceptionMessage.ACESSES_kEY,token });
     } catch (e:AcceptAny) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });

     }
    }
}
export const TokenController=new tokenController();