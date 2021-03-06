"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class enviosVentas {
    constructor() { }
    enviosVentasSchema() {
        const Schema = mongoose_1.default.Schema;
        let propiedadesEnviosVentas = new Schema({
            venta: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'ventas' },
            informacionEnvioUsuario: String,
            enviado: Boolean,
            fechaEnvio: String,
            fechaEntrega: String
        });
        if (mongoose_1.default.models.enviosVentas) {
            return mongoose_1.default.models.enviosVentas;
        }
        else {
            return mongoose_1.default.model('enviosVentas', propiedadesEnviosVentas);
        }
    }
}
exports.enviosVentas = enviosVentas;
