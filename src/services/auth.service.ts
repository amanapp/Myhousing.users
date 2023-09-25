import { Errback, Request, Response } from "express";
import bcrypt from "bcrypt";
import { Otp } from "../utils/otp-sender.utils";
import { OwnerEntity, UserEntity } from "../entitys/auth.entity";
import { redisClient } from "../database/redisconnection";

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
      let insertUser = await UserEntity.Create({name,email,password,phone_no})
      await Otp.verifyOtpSendUser({ email });
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
      await Otp.verifyOtpSendUser({ email });
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
      console.log("redis  value :: ",val,typeof(val))
      if (verify_otp!= val)throw new Error("invalid otp , try again ")
      await UserEntity.Update({verification_key:true},{where:{email:email}});
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}
export const AuthServices = new authServices();