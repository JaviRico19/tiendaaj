"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Producto {
    constructor(categoria, subcategoria, nombre, precio, descripcion, oferta, descuento, preciodescuento, ventas, fecha) {
        this.categoria = categoria;
        this.subcategoria = subcategoria;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.oferta = oferta;
        this.descuento = descuento;
        this.preciodescuento = preciodescuento;
        this.ventas = ventas;
        this.fecha = fecha;
    }
}
exports.Producto = Producto;
