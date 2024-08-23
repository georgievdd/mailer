"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const checkKey_1 = __importDefault(require("./middleware/checkKey"));
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
if (config_1.USE_SECRET) {
    app.use(checkKey_1.default);
}
app.use(router_1.default);
exports.default = () => {
    app.listen(config_1.SERVER_PORT, () => {
        console.log(`Server is running on ${config_1.SERVER_HOST}`);
    });
};
