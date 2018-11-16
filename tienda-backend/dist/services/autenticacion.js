"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const moment_1 = __importDefault(require("moment"));
class Jwt {
    constructor() {
    }
    createToken(usuario) {
        const secret = 'key-secret';
        let payload = {
            sub: usuario.id,
            correo: usuario.correo,
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            avatar: usuario.avatar,
            iat: moment_1.default().unix(),
            exp: moment_1.default().add(30, 'days').unix()
        };
        return jwt_simple_1.default.encode(payload, secret);
    }
}
exports.Jwt = Jwt;
