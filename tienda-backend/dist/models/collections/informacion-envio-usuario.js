"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class informacionEnvioUsuario {
    constructor() {
    }
    informacionEnvioUsuarioSchema() {
        const Schema = mongoose_1.default.Schema;
        let propiedadesInformacionEnvio = new Schema({
            usuario: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'usuario' },
            pais: String,
            estado: String,
            ciudad: String,
            direccion: String,
            codigoPostal: Number
        });
        if (mongoose_1.default.models.informacionEnvioUsuario) {
            return mongoose_1.default.models.informacionEnvioUsuario;
        }
        else {
            return mongoose_1.default.model('informacionEnvioUsuario', propiedadesInformacionEnvio);
        }
    }
}
exports.informacionEnvioUsuario = informacionEnvioUsuario;
