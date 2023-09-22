import { Errback, Request, Response } from "express";
import bcrypt from "bcrypt";
import { Otp } from "../utils/otp-sender.utils";
import { AuthEntity } from "../entitys/auth.entity";

class authServices {
  signupUser = async (
    name: string,
    email: string,
    password: string,
    phone_no: bigint
  ): Promise<any> => {
    try {
      const hashedPassword = await bcrypt.hash(password, 2);

      let foundUser = await AuthEntity.findOne(email)
      if (foundUser) {
        throw new Error("Already exist the user, please login");
      }
      let insertUser = await AuthEntity.Create({name,email,password,phone_no})
      await Otp.verifyOtpSendUser({ email });
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
}
export const AuthServices = new authServices();
