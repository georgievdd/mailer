"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
exports.default = (req, res, next) => {
    const secret = req.get('SECRET');
    if (secret == config_1.SECRET) {
        return next();
    }
    res.status(403).send(`Forbidden`);
};
