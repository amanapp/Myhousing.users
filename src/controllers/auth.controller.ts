import { Request,Response } from "express";
import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";
import { AuthServices } from "../services/auth.service";

class authController{
     signupUser=async(req:Request,res:Response)=>{
        try {
            const { name, email, password, phone_no } = req.body;
            const result = await AuthServices.signupUser(name, email, password, phone_no);
            res.status(HttpStatusCode.CREATED).json({ message: ExceptionMessage.USER_SIGNUP });
          } catch (e:any) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
          }
    }
    signupOwner=async(req:Request,res:Response)=>{
      try {
          const { name, email, password, phone_no } = req.body;
          const result = await AuthServices.signupOwner(name, email, password, phone_no);
          res.status(HttpStatusCode.CREATED).json({ message: ExceptionMessage.USER_SIGNUP });
        } catch (e:any) {
          res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
        }
  }
    
}

export const AuthController= new authController();
