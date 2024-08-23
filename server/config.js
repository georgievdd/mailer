"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USE_SECRET = exports.DEFAULT_SENDER = exports.SECRET = exports.SERVER_HOST = exports.SERVER_PORT = void 0;
require('dotenv').config();
exports.SERVER_PORT = process.env.SERVER_PORT;
exports.SERVER_HOST = process.env.SERVER_HOST;
exports.SECRET = process.env.SECRET;
exports.DEFAULT_SENDER = 'georgiewden@yandex.ru';
exports.USE_SECRET = process.env.USE_SECRET === 'true';
