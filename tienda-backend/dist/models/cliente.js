"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Colecciones 
const export_1 = require("./collections/export");
//Crud 
const crud_user_1 = require("./crud/crud_user");
//Servicio 
const autenticacion_1 = require("../services/autenticacion");
//Dependencias 
const password_hash_1 = __importDefault(require("password-hash"));
const fs_1 = __importDefault(require("fs"));
class Cliente {
    /*=====  End of Variables de instancia  ======*/
    constructor() {
        /*============================================================
        =            Inicializando variables de instancia            =
        ============================================================*/
        this.usuarioSchema = new export_1.usuarioSchema();
        this.informacionEnvioUsuarioSchema = new export_1.informacionEnvioUsuario();
        this.mensajesSchema = new export_1.mensajesUsuarioSchema();
        this.ventasSchema = new export_1.ventasSchema();
        this.productoSchema = new export_1.productoSchema();
        this.imagenesProductoSchema = new export_1.imagenesProductosSchema();
        this.comentariosProducto = new export_1.comentariosProductoSchema();
        this.jwt = new autenticacion_1.Jwt();
        /*=====  End of Inicializando variables de instancia  ======*/
    }
    /*========================================================
    =            Metodo Registrar-Usuario-Cliente            =
    ========================================================*/
    registrar(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let userSchema = this.usuarioSchema.usuarioSchema();
            let result = yield crud_user_1.registrar(usuario, userSchema, password_hash_1.default);
            if (result == true) {
                return 500;
            }
            else {
                let guardar = new Promise((resolve, reject) => {
                    let user = new userSchema();
                    user.correo = usuario.correo;
                    user.contraseña = result;
                    user.nombre = usuario.nombre;
                    user.apellidos = usuario.apellidos;
                    user.avatar = null;
                    console.log(usuario);
                    user.save((err, usuario) => {
                        if (err) {
                            reject(new Error('Error al guardar'));
                        }
                        if (usuario) {
                            resolve({ correo: usuario.correo });
                        }
                    });
                });
                return guardar;
            }
        });
    }
    /*=====  End of Metodo Registrar-Usuario-Cliente  ======*/
    /*=============================================================
    =            Metodo Iniciar-Sesion-Usuario-Cliente            =
    =============================================================*/
    iniciarSesion(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let userSchema = this.usuarioSchema.usuarioSchema();
            let result = yield crud_user_1.iniciarSesion(usuario, userSchema);
            let contraseña = result.contraseña;
            let contraseñaBd = result.contraseñaBd;
            let userLogin = result.user;
            let comparar = new Promise((resolve, reject) => {
                let result = password_hash_1.default.verify(contraseña, contraseñaBd);
                if (result) {
                    if (usuario.getToken) {
                        let token = this.jwt.createToken(userLogin);
                        resolve({ token: token });
                    }
                    else {
                        resolve({ user: userLogin });
                    }
                }
                else {
                    reject(new Error('Las contraseñas son diferentes'));
                }
            });
            return comparar;
        });
    }
    /*=====  End of Metodo Iniciar-Sesion-Usuario-Cliente  ======*/
    /*=====================================================================
    =            Metodo Actualizar-Informacion-Usuario-Cliente            =
    =====================================================================*/
    actualizarUsuario(id, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let userSchema = this.usuarioSchema.usuarioSchema();
            let result = crud_user_1.actualizarUsuario(id, usuario, userSchema);
            return result;
        });
    }
    /*=====  End of Metodo Actualizar-Informacion-Usuario-Cliente  ======*/
    /*=================================================================
    =            Metodo Cambiar-Contraseña-Usuario-Cliente            =
    =================================================================*/
    cambiarContraseña(id_usuario, contraseña) {
        return __awaiter(this, void 0, void 0, function* () {
            let userSchema = this.usuarioSchema.usuarioSchema();
            let hash = password_hash_1.default.generate(contraseña);
            let result = yield crud_user_1.cambiarContraseña(id_usuario, hash, userSchema);
            return result;
        });
    }
    /*=====  End of Metodo Cambiar-Contraseña-Usuario-Cliente  ======*/
    /*========================================================================
    =            Metodo Agregar-Informacion-Envio-Usuario-Cliente            =
    ========================================================================*/
    agregarInformacionEnvio(id_usuario, informacion) {
        return __awaiter(this, void 0, void 0, function* () {
            let informacionEnvioSchema = this.informacionEnvioUsuarioSchema.informacionEnvioUsuarioSchema();
            let result = yield crud_user_1.agregarInformacionEnvio(id_usuario, informacionEnvioSchema);
            if (result == 1) {
                let agregar = new Promise((resolve, reject) => {
                    let informacionEnvio = new informacionEnvioSchema();
                    informacionEnvio.usuario = id_usuario;
                    informacionEnvio.pais = informacion.pais;
                    informacionEnvio.estado = informacion.estado;
                    informacionEnvio.ciudad = informacion.ciudad;
                    informacionEnvio.direccion = informacion.direccion;
                    informacionEnvio.codigoPostal = informacion.codigoPostal;
                    informacionEnvio.save((err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(200);
                        }
                    });
                });
                return agregar;
            }
            else {
                return 500;
            }
        });
    }
    /*=====  End of Metodo Agregar-Informacion-Envio-Usuario-Cliente  ======*/
    /*========================================================================
    =            Metodo Obtener-Informacion-Envio-Usuario-Cliente            =
    ========================================================================*/
    obtenerInformacionEnvio(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let informacionEnvioSchema = this.informacionEnvioUsuarioSchema.informacionEnvioUsuarioSchema();
            let result = yield crud_user_1.obtenerInformacionEnvio(id_usuario, informacionEnvioSchema);
            return result;
        });
    }
    /*=====  End of Metodo Obtener-Informacion-Envio-Usuario-Cliente  ======*/
    /*===========================================================================
    =            Metodo Actualizar-Informacion-Envio-Usuario-Cliente            =
    ===========================================================================*/
    actualizarInformacionEnvio(id_info, informacion) {
        return __awaiter(this, void 0, void 0, function* () {
            let informacionEnvioSchema = this.informacionEnvioUsuarioSchema.informacionEnvioUsuarioSchema();
            let result = yield crud_user_1.actualizarInformacionEnvio(id_info, informacion, informacionEnvioSchema);
            return result;
        });
    }
    /*=====  End of Metodo Actualizar-Informacion-Envio-Usuario-Cliente  ======*/
    /*===========================================================
    =            Metodo Subir-Imagen-Usuario-Cliente            =
    ===========================================================*/
    subirImagen(id, imagen) {
        return __awaiter(this, void 0, void 0, function* () {
            let userSchema = this.usuarioSchema.usuarioSchema();
            let file_path = imagen.image.path;
            let file_split = file_path.split('\\');
            let file_name = file_split[3];
            let ext_split = file_name.split('\.');
            let file_ext = ext_split[1];
            if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
                let result = yield crud_user_1.subirImagen(id, file_name, userSchema);
                return result;
            }
            else {
                fs_1.default.unlink(file_path, (err) => {
                    if (err) {
                        return err;
                    }
                    else {
                        return 1; //1 = Elimino imagen y no se guardaron por no ser del formato indicado
                    }
                });
            }
        });
    }
    /*=====  End of Metodo Subir-Imagen-Usuario-Cliente  ======*/
    /*=============================================================
    =            Metodo Obtener-Imagen-Usuario-Cliente            =
    =============================================================*/
    obtenerImagen(imagen) {
        let ruta = '../imagenes/usuarios/' + imagen;
        let obtener = new Promise((resolve, reject) => {
            fs_1.default.access(ruta, (err) => {
                if (!err) {
                    resolve(ruta);
                }
                else {
                    reject(new Error('El archivo no existe'));
                }
            });
        });
        return obtener;
    }
    /*=====  End of Metodo Obtener-Imagen-Usuario-Cliente  ======*/
    /*==================================================================
    =            Metodo Obtener-Usuario-Informacion-Cliente            =
    ==================================================================*/
    obtenerUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let userSchema = this.usuarioSchema.usuarioSchema();
            let result = yield crud_user_1.obtenerUsuario(id, userSchema);
            return result;
        });
    }
    /*=====  End of Metodo Obtener-Usuario-Informacion-Cliente  ======*/
    /*=============================================
    =            Sistema de Mensajeria            =
    =============================================*/
    sistemaMensajeria(usuario1, usuario2, contenido) {
        return __awaiter(this, void 0, void 0, function* () {
            let mensajesSchema = this.mensajesSchema.mensajesUsuario();
            let userSchema = this.usuarioSchema.usuarioSchema();
            let comprobacion = yield crud_user_1.comprobacionConversacion(usuario1, usuario2, mensajesSchema);
            // 0 = si no existe conversacion 
            // 1 = si existe conversacion y si es emisor 
            // 3 = si existe conversacion y si es receptor
            if (comprobacion == 0) {
                console.log('No existe conversacion,se generara una nueva');
                let nuevaConversacion = new mensajesSchema();
                let emisor = {
                    emisor: {
                        mensaje: contenido.mensaje,
                        fecha: contenido.fecha,
                        visto: contenido.visto
                    }
                };
                nuevaConversacion.emisor = usuario1;
                nuevaConversacion.emisorExistente = true;
                nuevaConversacion.receptor = usuario2;
                nuevaConversacion.receptorExistente = true;
                nuevaConversacion.mensajes = emisor;
                let guardar = new Promise((resolve, reject) => {
                    nuevaConversacion.save((err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(200);
                        }
                    });
                });
                return guardar;
            }
            else if (comprobacion.codigo == 1) {
                console.log('Existe conversacion,eres el emisor');
                let conversacion = yield crud_user_1.obtenerMensajesConversacion(comprobacion.id_conversacion, mensajesSchema);
                let comprobacionUsuario = yield crud_user_1.comprobacionUsuarioExistente(conversacion.receptor, userSchema);
                if (comprobacionUsuario == 0) {
                    let result = {
                        codigo: comprobacion.codigo,
                        receptor: 0,
                        conversacion: conversacion
                    };
                    return result;
                }
                else {
                    let result = {
                        codigo: comprobacion.codigo,
                        receptor: comprobacionUsuario,
                        conversacion: conversacion
                    };
                    return result;
                }
            }
            else if (comprobacion.codigo == 3) {
                console.log('Existe conversacion,eres el receptor');
                let conversacion = yield crud_user_1.obtenerMensajesConversacion(comprobacion.id_conversacion, mensajesSchema);
                let comprobacionUsuario = yield crud_user_1.comprobacionUsuarioExistente(conversacion.emisor, userSchema);
                if (comprobacionUsuario == 0) {
                    let result = {
                        codigo: comprobacion.codigo,
                        emisor: 0,
                        conversacion: conversacion
                    };
                    return result;
                }
                else {
                    let result = {
                        codigo: comprobacion.codigo,
                        emisor: comprobacionUsuario,
                        conversacion: conversacion
                    };
                    return result;
                }
            }
        });
    }
    enviarMensaje(id_conversacion, codigo, mensaje) {
        return __awaiter(this, void 0, void 0, function* () {
            let mensajesSchema = this.mensajesSchema.mensajesUsuario();
            let userSchema = this.usuarioSchema.usuarioSchema();
            if (codigo == 1) {
                let conversacion = yield crud_user_1.obtenerMensajesConversacion(id_conversacion, mensajesSchema);
                let receptor = conversacion.receptor;
                let comprobacionUsuario = yield crud_user_1.comprobacionUsuarioExistente(receptor, userSchema);
                if (comprobacionUsuario == 0) {
                    return 500;
                }
                else {
                    let enviar = yield crud_user_1.enviarMensaje(id_conversacion, codigo, mensaje, mensajesSchema);
                    return enviar;
                }
            }
            else if (codigo == 3) {
                let conversacion = yield crud_user_1.obtenerMensajesConversacion(id_conversacion, mensajesSchema);
                let emisor = conversacion.emisor;
                let comprobacionUsuario = yield crud_user_1.comprobacionUsuarioExistente(emisor, userSchema);
                if (comprobacionUsuario == 0) {
                    return 500;
                }
                else {
                    let enviar = yield crud_user_1.enviarMensaje(id_conversacion, codigo, mensaje, mensajesSchema);
                    return enviar;
                }
            }
        });
    }
    enviarArchivos(id_conversacion, files, informacion) {
        return __awaiter(this, void 0, void 0, function* () {
            let mensajesSchema = this.mensajesSchema.mensajesUsuario();
            let images = files.image;
            let iterar = new Promise((resolve, reject) => {
                images.forEach((image) => {
                    if (image) {
                        let file_path = image.path;
                        let file_split = file_path.split('\\');
                        let file_name = file_split[3];
                        let ext_split = file_name.split('\.');
                        let file_ext = ext_split[1];
                        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
                            console.log('Realizo comprobacion de extencion');
                            let resultado = crud_user_1.enviarArchivos(id_conversacion, file_name, informacion, mensajesSchema);
                            resolve(resultado);
                        }
                        else {
                            fs_1.default.unlink(file_path, (err) => {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    reject(new Error('Se eliminaron los archivos y no son del formato adecuado,no se guardaron'));
                                }
                            });
                        }
                    }
                    else {
                        reject(new Error('Error de iteracion'));
                    }
                });
            });
            return iterar;
        });
    }
    obtenerConversaciones(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let mensajesSchema = this.mensajesSchema.mensajesUsuario();
            let obtener = yield crud_user_1.obtenerConversaciones(id_usuario, mensajesSchema);
            return obtener;
        });
    }
    /*=====  End of Sistema de Mensajeria  ======*/
    /*=================================================================
    =            Metodo Obtener-Mis-Ventas-Usuario-Cliente            =
    =================================================================*/
    obtenerMisVentas(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let ventasSchema = this.ventasSchema.ventasSchema();
            let result = yield crud_user_1.obtenerMisVentas(id_usuario, ventasSchema);
            let cantidad = 0;
            let dineroGanado = 0;
            result.forEach((producto) => {
                cantidad += producto.cantidad;
                dineroGanado += producto.precio;
            });
            let data = {
                cantidad: cantidad,
                dineroGanado: dineroGanado,
                productosVendidos: result
            };
            return data;
        });
    }
    /*=====  End of Metodo Obtener-Mis-Ventas-Usuario-Cliente  ======*/
    /*==================================================================
    =            Metodo Obtener-Mis-Compras-Usuario-Cliente            =
    ==================================================================*/
    obtenerMisCompras(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let ventasSchema = this.ventasSchema.ventasSchema();
            let result = yield crud_user_1.obtenerMisCompras(id_usuario, ventasSchema);
            let cantidad = 0;
            result.forEach((producto) => {
                cantidad += producto.cantidad;
            });
            let data = {
                cantidad: cantidad,
                productosComprados: result
            };
            return data;
        });
    }
    /*=====  End of Metodo Obtener-Mis-Compras-Usuario-Cliente  ======*/
    /*==============================================================
    =            Metodo Eliminar-Cuenta-Usuario-Cliente            =
    ==============================================================*/
    eliminarCuenta(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuarioSchema = this.usuarioSchema.usuarioSchema();
            let informacionUsuarioSchema = this.informacionEnvioUsuarioSchema.informacionEnvioUsuarioSchema();
            let mensajesSchema = this.mensajesSchema.mensajesUsuario();
            let ventasSchema = this.ventasSchema.ventasSchema();
            let productoSchema = this.productoSchema.productoSchema();
            let imagenesProductoSchema = this.imagenesProductoSchema.imagenesProductoSchema();
            let comentariosProductoSchema = this.comentariosProducto.comentariosProducto();
            let result = yield crud_user_1.eliminarCuenta(id_usuario, usuarioSchema, informacionUsuarioSchema, mensajesSchema, ventasSchema, productoSchema, export_1.imagenesProductosSchema, comentariosProductoSchema);
            return result;
        });
    }
}
exports.Cliente = Cliente;
