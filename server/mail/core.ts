// @ts-ignore
import nodemailer, {createTransport, SentMessageInfo} from 'nodemailer';
import {MAIL_EMAIL, MAIL_PASSWORD, MAIL_SMTP_HOST} from "./config";
import * as Mail from "nodemailer/lib/mailer";
import {Sender} from "../../db/model";

interface MailOptions {
  to: string;
  html: string;
  title: string;
  sender: Sender
}

const createTransporter = ({smtp_host, email, password}: Sender) => nodemailer.createTransport({
  host: smtp_host,
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: password,
  },
});

const getOptions = (options: MailOptions): Mail.Options => ({
  from: options.sender.email,
  html: options.html,
  subject: options.title,
  to: options.to,
})
export const sendMail = async (data: MailOptions): Promise<SentMessageInfo> => {
  const transporter = createTransporter(data.sender)
  const options = getOptions(data)
  try {
    return await transporter.sendMail(options);
  } catch (error) {
    throw error
  }
};
