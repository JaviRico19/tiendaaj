"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class imagenesProductosSchema {
    constructor() { }
    imagenesProductoSchema() {
        const Schema = mongoose_1.default.Schema;
        let imagenesProductoSchema = new Schema({
            producto: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'producto' },
            imagen: String
        });
        if (mongoose_1.default.models.imagenesProducto) {
            return mongoose_1.default.models.imagenesProducto;
        }
        else {
            return mongoose_1.default.model('imagenesProducto', imagenesProductoSchema);
        }
    }
}
exports.imagenesProductosSchema = imagenesProductosSchema;
