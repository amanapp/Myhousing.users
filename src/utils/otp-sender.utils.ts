import  { redisClient } from "../database/redisconnection";
import { loggers } from "../middleware/winston.middleware";
import { sendEmail } from "../provider/nodemailer.utils";
import '../config/env'
/**
 * @description verify otp send
 * @param email
 */


class otp {
  async verifyOtpSendUser(email: any): Promise<any> {
    try {
      const EMAIL = email;

      let otp: any = Math.floor(1000 + Math.random() * 9000);
      loggers.info(`otp is ${otp}`);
      const key = await redisClient.setKey(`${EMAIL}_verification`, JSON.stringify(otp), { EX: 300 });
      let message = `${process.env.MESSAGE_FIRST_PART} \n ${otp} \n${process.env.MESSAGE_SECOND_PART}`;
      const result = await sendEmail(EMAIL, process.env.SUBJECT, message);
    } catch (e: any) {
      throw new Error("not send ");
    }
  }
}
export const Otp = new otp();
