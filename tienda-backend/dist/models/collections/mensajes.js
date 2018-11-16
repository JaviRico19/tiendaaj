"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class mensajesUsuarioSchema {
    constructor() {
    }
    mensajesUsuario() {
        const Schema = mongoose_1.default.Schema;
        let mensajesSchema = new Schema({
            emisor: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'usuario' },
            emisorExistente: Boolean,
            receptor: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'usuario' },
            receptorExistente: Boolean,
            mensajes: Array
        });
        if (mongoose_1.default.models.mensajesUsuario) {
            return mongoose_1.default.models.mensajesUsuario;
        }
        else {
            return mongoose_1.default.model('mensajesUsuario', mensajesSchema);
        }
    }
}
exports.mensajesUsuarioSchema = mensajesUsuarioSchema;
