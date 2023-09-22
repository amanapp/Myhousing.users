import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { loggers } from "../middleware/winston.middleware";

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_MAIL,
    pass: process.env.APP_PASSWORD,
  },
  debug: true,
});
/**
 * @description customized messages send
 * @param to
 * @param subject
 * @param text
 */
export const sendEmail = async (
  to: string,
  subject: string|undefined,
  text: string
) => {
  try {
    await transporter.sendMail({
      from: process.env.APP_MAIL,
      to,
      subject,
      text,
    });

    loggers.info("Email sent successfully.");
  } catch (error) {
    loggers.error("Error sending email:");
  }
};
