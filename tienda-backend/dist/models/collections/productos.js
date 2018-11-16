"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class productoSchema {
    constructor() {
    }
    productoSchema() {
        const Schema = mongoose_1.default.Schema;
        let productoSchema = new Schema({
            categoria: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'categoriasProducto' },
            subcategoria: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'subCategoriasProducto' },
            usuario: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'usuario' },
            nombre: String,
            precio: Number,
            descripcion: String,
            tipo: String,
            oferta: Boolean,
            descuento: Number,
            preciodescuento: Number,
            ventas: Number,
            fecha: String
        });
        if (mongoose_1.default.models.producto) {
            return mongoose_1.default.models.producto;
        }
        else {
            return mongoose_1.default.model('producto', productoSchema);
        }
    }
}
exports.productoSchema = productoSchema;
