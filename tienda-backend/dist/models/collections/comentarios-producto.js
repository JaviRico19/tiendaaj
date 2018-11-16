"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class comentariosProductoSchema {
    constructor() {
    }
    comentariosProducto() {
        const Schema = mongoose_1.default.Schema;
        let comentariosProducto = new Schema({
            producto: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'producto' },
            usuario: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'usuario' },
            comentario: String
        });
        if (mongoose_1.default.models.comentariosProducto) {
            return mongoose_1.default.models.comentariosProducto;
        }
        else {
            return mongoose_1.default.model('comentariosProducto', comentariosProducto);
        }
    }
}
exports.comentariosProductoSchema = comentariosProductoSchema;
