// @ts-ignore
import nodemailer, {SentMessageInfo} from 'nodemailer';
import {MAIL_EMAIL, MAIL_PASSWORD, MAIL_SMTP_HOST} from "./config";
import * as Mail from "nodemailer/lib/mailer";

interface MailOptions {
  to: string;
  html: string;
  title: string;
}

// Настройка транспортера
const transporter = nodemailer.createTransport({
  host: MAIL_SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: MAIL_EMAIL,
    pass: MAIL_PASSWORD,
  },
});

const getOptions = (options: MailOptions): Mail.Options => ({
  from: MAIL_EMAIL,
  html: options.html,
  subject: options.title,
  to: options.to,
})

export const sendMail = async (options: MailOptions): Promise<SentMessageInfo> => {
  try {
    return await transporter.sendMail(getOptions(options));
  } catch (error) {
    throw error
  }
};
