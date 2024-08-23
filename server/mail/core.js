"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
// @ts-ignore
const nodemailer_1 = __importDefault(require("nodemailer"));
const createTransporter = ({ smtp_host, email, password }) => nodemailer_1.default.createTransport({
    host: smtp_host,
    port: 465,
    secure: true,
    auth: {
        user: email,
        pass: password,
    },
});
const getOptions = (options) => ({
    from: options.sender.email,
    html: options.html,
    subject: options.title,
    to: options.to,
});
const sendMail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = createTransporter(data.sender);
    const options = getOptions(data);
    try {
        return yield transporter.sendMail(options);
    }
    catch (error) {
        throw error;
    }
});
exports.sendMail = sendMail;
