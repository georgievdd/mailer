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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("./config");
const model_1 = require("./model");
const config_2 = require("../server/config");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: config_1.POSTGRES_DB,
    dialect: "postgres",
    username: config_1.POSTGRES_USER,
    password: config_1.POSTGRES_PASSWORD,
    host: config_1.DB_HOST,
    models: [model_1.Template, model_1.Sender],
});
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize.sync();
    if (!(yield model_1.Sender.findOne({ where: { email: config_2.DEFAULT_SENDER } }))) {
        yield model_1.Sender.create({
            smtp_host: 'smtp.yandex.ru',
            email: 'georgiewden@yandex.ru',
            password: 'fyecjegstfkpuxpy',
        });
    }
});
