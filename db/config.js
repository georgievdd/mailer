"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_HOST = exports.POSTGRES_DB = exports.POSTGRES_PASSWORD = exports.POSTGRES_USER = void 0;
require('dotenv').config();
exports.POSTGRES_USER = process.env.POSTGRES_USER;
exports.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
exports.POSTGRES_DB = process.env.POSTGRES_DB;
exports.DB_HOST = process.env.DB_HOST;
