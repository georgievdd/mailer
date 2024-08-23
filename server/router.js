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
const express_1 = require("express");
const model_1 = require("../db/model");
const core_1 = require("./mail/core");
const config_1 = require("./config");
const router = (0, express_1.Router)();
router.post('/send', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { variables, to, templateName, title, senderEmail } = req.body;
    try {
        const template = yield model_1.Template.findOne({ where: { name: templateName } });
        if (!template) {
            return res.status(500).json({ error: { message: "Not found template" } });
        }
        const sender = yield model_1.Sender.findOne({ where: { email: senderEmail || config_1.DEFAULT_SENDER } });
        const html = eval(template.script)(variables);
        yield (0, core_1.sendMail)({
            to,
            title,
            html,
            sender
        });
        res.status(200).send("OK");
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: e });
    }
}));
router.post('/set_template', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, script, } = req.body;
    try {
        let template = yield model_1.Template.findOne({ where: { name } });
        if (template) {
            template.script = script;
            yield template.save();
        }
        else {
            yield model_1.Template.create({ name, script });
        }
        res.status(200).send("setted");
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}));
router.get('/template', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send((yield model_1.Template.findAll()).map(({ name }) => ({
            name
        })));
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}));
router.get('/template/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        const template = yield model_1.Template.findOne({ where: { name } });
        if (!template) {
            throw new Error("Not found");
        }
        const text = eval(template.script)();
        res.status(200).send(text);
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}));
router.delete('/template/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        const template = yield model_1.Template.findOne({ where: { name } });
        if (template) {
            yield template.destroy();
            res.status(200).send();
        }
        else {
            res.status(404).json({ error: { message: "Not Found" } });
        }
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}));
router.post('/set_sender', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sender = req.body;
    try {
        yield model_1.Sender.create(Object.assign({}, sender));
        res.status(200).send(`created ${sender.email}`);
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}));
exports.default = router;
