import { Request, Response } from "express";
import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";
import { AuthServices } from "../services/auth.service";

class authController {
  signupUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password, phone_no } = req.body;
      await AuthServices.signupUser(
        name,
        email,
        password,
        phone_no
      );
      res
        .status(HttpStatusCode.CREATED)
        .json({ message: ExceptionMessage.USER_SIGNUP });
    } catch (e: any) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
    }
  };
  signupOwner = async (req: Request, res: Response) => {
    try {
      const { name, email, password, phone_no } = req.body;
      const result = await AuthServices.signupOwner(
        name,
        email,
        password,
        phone_no
      );
      res
        .status(HttpStatusCode.CREATED)
        .json({ message: ExceptionMessage.USER_SIGNUP });
    } catch (e: any) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
    }
  };
  otpSend = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const result = await AuthServices.otpSend(email);
      res
        .status(HttpStatusCode.OK)
        .json({ message: ExceptionMessage.OTP_SEND });
    } catch (e: any) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
    }
  };
  userVerify = async (req: Request, res: Response) => {
    try {
      const { email, verify_otp } = req.body;
      const result = await AuthServices.userVerify(email, verify_otp);
      res
        .status(HttpStatusCode.CREATED)
        .json({ message: ExceptionMessage.USER_VERIFY });
    } catch (e: any) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
    }
  };
  ownerVerify = async (req: Request, res: Response) => {
    try {
      const { email, verify_otp } = req.body;
      const result = await AuthServices.ownerVerify(email, verify_otp);
      res
        .status(HttpStatusCode.CREATED)
        .json({ message: ExceptionMessage.USER_VERIFY });
    } catch (e: any) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
    }
  };
  loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const result = await AuthServices.loginUser(email, password);
      res
        .status(HttpStatusCode.CREATED)
        .json({ message: ExceptionMessage.LOGIN_USER,result});
    } catch (e: any) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
    }
  };
  loginOwner = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const result = await AuthServices.loginOwner(email, password);
      res
        .status(HttpStatusCode.CREATED)
        .json({ message: ExceptionMessage.LOGIN_OWNER,result});
    } catch (e: any) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
    }
  };
}

export const AuthController = new authController();
