import { Errback, Request, Response } from "express";
import bcrypt from "bcrypt";
import { Otp } from "../utils/otp-sender.utils";
import { OwnerEntity, UserEntity } from "../entitys/auth.entity";

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
}
export const AuthServices = new authServices();
