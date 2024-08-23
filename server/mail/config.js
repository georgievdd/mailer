"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAIL_SMTP_HOST = exports.MAIL_PASSWORD = exports.MAIL_EMAIL = void 0;
require('dotenv').config();
exports.MAIL_EMAIL = process.env.MAIL_EMAIL;
exports.MAIL_PASSWORD = process.env.MAIL_PASSWORD;
exports.MAIL_SMTP_HOST = process.env.MAIL_SMTP_HOST;
