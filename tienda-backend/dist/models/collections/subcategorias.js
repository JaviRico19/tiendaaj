"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class subCategoriasSchema {
    constructor() {
    }
    subCategorias() {
        const Schema = mongoose_1.default.Schema;
        let subCategoriasSchema = new Schema({
            categoria: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'categoriasProducto' },
            nombre: String,
            descripcion: String
        });
        if (mongoose_1.default.models.subCategoriasProducto) {
            return mongoose_1.default.models.subCategoriasProducto;
        }
        else {
            return mongoose_1.default.model('subCategoriasProducto', subCategoriasSchema);
        }
    }
}
exports.subCategoriasSchema = subCategoriasSchema;
