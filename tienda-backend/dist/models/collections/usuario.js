"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class usuarioSchema {
    constructor() {
    }
    usuarioSchema() {
        const Schema = mongoose_1.default.Schema;
        let usuarioSchema = new Schema({
            correo: String,
            contraseña: String,
            nombre: String,
            apellidos: String,
            avatar: String
        });
        if (mongoose_1.default.models.usuario) {
            return mongoose_1.default.models.usuario;
        }
        else {
            return mongoose_1.default.model('usuario', usuarioSchema);
        }
    }
}
exports.usuarioSchema = usuarioSchema;
