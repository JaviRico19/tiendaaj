"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    constructor(correo, contraseña, nombre, apellidos, avatar, getToken) {
        this.correo = correo;
        this.contraseña = contraseña;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.avatar = avatar;
        this.getToken = getToken;
    }
}
exports.Usuario = Usuario;
