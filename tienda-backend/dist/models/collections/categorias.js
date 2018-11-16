"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class categoriasProductoSchema {
    constructor() {
    }
    categoriasProducto() {
        const Schema = mongoose_1.default.Schema;
        let categoriasSchema = new Schema({
            nombre: String,
            descripcion: String
        });
        if (mongoose_1.default.models.categoriasProducto) {
            return mongoose_1.default.models.categoriasProducto;
        }
        else {
            return mongoose_1.default.model('categoriasProducto', categoriasSchema);
        }
    }
}
exports.categoriasProductoSchema = categoriasProductoSchema;
