import { Errback, Request, Response } from "express";
import bcrypt from "bcrypt";
import { Otp } from "../utils/otp-sender.utils";
import { OwnerEntity, UserEntity } from "../entitys/auth.entity";
import { redisClient } from "../database/redisconnection";
import { TokenCreation } from "../utils/token.utils";
import { SessionEntity, TokenEntity } from "../entitys/token.entity";
import { AcceptAny, foundUser } from "../interface/global.interface";
class authServices {
  signupUser = async (
    name: string,
    email: string,
    password: string,
    phone_no: bigint
  ): Promise<any> => {
    try {
      const hashedPassword = await bcrypt.hash(password, 2);

      let foundUser = await UserEntity.findOne(email)
      if (foundUser) {
        throw new Error("Already exist the user, please login");
      }
      let insertUser = await UserEntity.Create({name,email,hashedPassword,phone_no})
      await Otp.verifyOtpSendUser( email);
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  signupOwner = async (
    name: string,
    email: string,
    password: string,
    phone_no: bigint
  ): Promise<any> => {
    try {
      const hashedPassword = await bcrypt.hash(password, 2);

      let foundUser = await OwnerEntity.findOne(email)
      if (foundUser) {
        throw new Error("Already exist the user, please login");
      }
      let insertUser = await OwnerEntity.Create({name,email,password,phone_no})
      await Otp.verifyOtpSendUser( email );
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
  otpSend = async (
    email: string,
  ): Promise<any> => {
    try { 
      await Otp.verifyOtpSendUser( email );
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
  userVerify = async (
    email: string,
    verify_otp: string,
  ): Promise<any> => {
    try {
      let foundUser = await UserEntity.findOne(email)
      if (!foundUser) {
        throw new Error("please register first !!");
      }
      const val = await redisClient.getKey(`${email}_verification`);
      if(!val)throw new Error("otp is expire ")
      if (verify_otp!= val)throw new Error("invalid otp , try again ")
      await UserEntity.Update({verification_key:true},{where:{email:email}});
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
  ownerVerify = async (
    email: string,
    verify_otp: string,
  ): Promise<any> => {
    try {
      let foundUser = await OwnerEntity.findOne(email)
      if (!foundUser) {
        throw new Error("please register first !!");
      }
      const val = await redisClient.getKey(`${email}_verification`);
      if(!val)throw new Error("otp is expire ")
      if (verify_otp!= val)throw new Error("invalid otp , try again ")
      await OwnerEntity.Update({verification_key:true},{where:{email:email}});
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  loginUser = async (
    email: string,
    password: string,
  ): Promise<any> => {
    try {
      let foundUser:foundUser = await UserEntity.findOne(email)
      if (!foundUser.verification_key == true) {
        Otp.verifyOtpSendUser( email );
        throw new Error(
          "not verifyed user ,please verify , otp is sending sucessfully"
        );
      }
      const passwordMatch = await bcrypt.compare(password, foundUser.password);
      if (passwordMatch) throw new Error("Invalid Password");
       const accessToken=await TokenCreation.createAcessToken(foundUser.id);
       const refreshToken=await TokenCreation.createRefreshToken(foundUser.id);
       const result=await TokenEntity.Create({userId:foundUser.id,refreshToken:refreshToken.jti,accessToken:accessToken.jti})
       await SessionEntity.Create({userId:foundUser.id,status:true})
       return {"accessToken":accessToken.accessToken,"referaceToken":refreshToken.referaceToken}
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
  loginOwner = async (
    email: string,
    password: string,
  ): Promise<any> => {
    try {
      let foundOwner:foundUser = await OwnerEntity.findOne(email)
      if (!foundOwner.verification_key == true) {
        Otp.verifyOtpSendUser( email );
        throw new Error(
          "not verifyed user ,please verify , otp is sending sucessfully"
        );
      }
      const passwordMatch = await bcrypt.compare(password, foundOwner.password);
      if (passwordMatch) throw new Error("Invalid Password");
      
      const [accessToken, refreshToken] = await Promise.all([
        TokenCreation.createAcessToken(foundOwner.id),
        TokenCreation.createRefreshToken(foundOwner.id),
      ]);
       const result=await TokenEntity.Create({userId:foundOwner.id,refreshToken:refreshToken.jti,accessToken:accessToken.jti})
       await SessionEntity.Create({userId:foundOwner.id,status:true})
       return {"accessToken":accessToken.accessToken,"referaceToken":refreshToken.referaceToken}
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}
export const AuthServices = new authServices();