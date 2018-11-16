"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class ventasSchema {
    constructor() {
    }
    ventasSchema() {
        let Schema = mongoose_1.default.Schema;
        let propiedades_Venta = new Schema({
            comprador: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'usuarios' },
            vendedor: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'usuarios' },
            producto: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'productos' },
            descripcion: String,
            cantidad: Number,
            precio: Number
        });
        if (mongoose_1.default.models.ventas) {
            return mongoose_1.default.models.ventas;
        }
        else {
            return mongoose_1.default.model('ventas', propiedades_Venta);
        }
    }
}
exports.ventasSchema = ventasSchema;
