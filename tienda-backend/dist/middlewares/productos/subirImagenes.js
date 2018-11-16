"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_multiparty_1 = __importDefault(require("connect-multiparty"));
exports.upload = connect_multiparty_1.default({ uploadDir: '../imagenes/productos' });
