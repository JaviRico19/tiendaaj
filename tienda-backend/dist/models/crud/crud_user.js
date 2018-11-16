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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/*=====================================================
=            Metodo Registrar-Usuario-Crud            =
=====================================================*/
function registrar(usuario, userSchema, passwordHash) {
    let contraseña = usuario.contraseña;
    let buscar = new Promise((resolve, reject) => {
        userSchema.findOne({ correo: usuario.correo }, (error, usuario) => {
            if (error) {
                console.log('Error:', error);
                reject(error);
            }
            else if (!usuario) {
                let hash = passwordHash.generate(contraseña);
                console.log(hash);
                resolve(hash);
            }
            else {
                console.log('El usuario ya existe');
                resolve(true);
            }
        });
    });
    return buscar;
}
/*=====  End of Metodo Registrar-Usuario-Crud  ======*/
/*=============================================================
=            Metodo Iniciar-Sesion-Usuario-Cliente            =
=============================================================*/
function iniciarSesion(usuario, userSchema) {
    let comprobar = new Promise((resolve, reject) => {
        userSchema.findOne({ correo: usuario.correo }, (err, usuariO) => {
            if (err) {
                reject(err);
            }
            if (usuario) {
                let user = {
                    id: usuariO.id,
                    correo: usuariO.correo,
                    nombre: usuariO.nombre,
                    apellidos: usuariO.apellidos,
                    avatar: usuariO.avatar
                };
                resolve({ contraseña: usuario.contraseña, contraseñaBd: usuariO.contraseña, user: user });
            }
        });
    });
    return comprobar;
}
/*=====  End of Metodo Iniciar-Sesion-Usuario-Cliente  ======*/
/*==================================================================
=            Metodo Actualizar-Informacion-Usuario-Crud            =
==================================================================*/
function actualizarUsuario(id, usuario, userSchema) {
    let actualizar = new Promise((resolve, reject) => {
        userSchema.findByIdAndUpdate(id, usuario, { new: true }, (err, usuario) => {
            if (err) {
                reject(err);
            }
            else {
                if (!usuario) {
                    reject(new Error('No se actualizo el usuario'));
                }
                else {
                    resolve({ status: 200 });
                }
            }
        });
    });
    return actualizar;
}
/*=====  End of Metodo Actualizar-Informacion-Usuario-Crud  ======*/
/*==============================================================
=            Metodo Cambiar-Contraseña-Usuario-Crud            =
==============================================================*/
function cambiarContraseña(id, contraseña, userSchema) {
    let cambiar = new Promise((resolve, reject) => {
        userSchema.findByIdAndUpdate(id, { contraseña: contraseña }, { new: true }, (err, usuario) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(200);
            }
        });
    });
    return cambiar;
}
/*=====  End of Metodo Cambiar-Contraseña-Usuario-Crud  ======*/
/*================================================================
=            Metodo Agregar-Informacion-Envio-Usuario-Crud            =
================================================================*/
function agregarInformacionEnvio(id_usuario, informacionEnvioSchema) {
    let comprobar = new Promise((resolve, reject) => {
        informacionEnvioSchema.find({ usuario: id_usuario }, (err, informacion) => {
            if (err) {
                reject(err);
            }
            else {
                if (informacion[0] == undefined) {
                    resolve(1);
                }
                else {
                    resolve(0);
                }
            }
        });
    });
    return comprobar;
}
/*=====  End of Metodo Agregar-Informacion-Envio-Usuario-Crud ======*/
/*=====================================================================
=            Metodo Obtener-Informacion-Envio-Usuario-Crud            =
=====================================================================*/
function obtenerInformacionEnvio(id_usuario, informacionEnvioSchema) {
    let obtener = new Promise((resolve, reject) => {
        informacionEnvioSchema.find({ usuario: id_usuario }, (err, informacion) => {
            if (err) {
                reject(err);
            }
            else {
                let objectInformacion = JSON.parse(JSON.stringify(informacion));
                resolve(objectInformacion);
            }
        });
    });
    return obtener;
}
/*=====  End of Metodo Obtener-Informacion-Envio-Usuario-Crud  ======*/
/*========================================================================
=            Metodo Actualizar-Informacion-Envio-Usuario-Crud            =
========================================================================*/
function actualizarInformacionEnvio(id, informacion, informacionEnvioSchema) {
    let actualizar = new Promise((resolve, reject) => {
        informacionEnvioSchema.findByIdAndUpdate(id, informacion, { new: true }, (err, informacion) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(200);
            }
        });
    });
    return actualizar;
}
/*=====  End of Metodo Actualizar-Informacion-Envio-Usuario-Crud  ======*/
/*========================================================
=            Metodo Subir-Imagen-Usuario-Crud            =
========================================================*/
function subirImagen(id, imagen, userSchema) {
    let subir = new Promise((resolve, reject) => {
        userSchema.findByIdAndUpdate(id, { avatar: imagen }, { new: true }, (err, usuario) => {
            if (err) {
                reject(err);
            }
            if (usuario) {
                let user = {
                    correo: usuario.correo,
                    nombre: usuario.nombre,
                    apellidos: usuario.apellidos,
                    avatar: usuario.avatar
                };
                resolve(user);
            }
        });
    });
    return subir;
}
/*=====  End of Metodo Subir-Imagen-Usuario-Crud  ======*/
/*===============================================================
=            Metodo Obtener-Informacion-Usuario-Crud            =
===============================================================*/
function obtenerUsuario(id, userSchema) {
    let obtener = new Promise((resolve, reject) => {
        userSchema.findById(id, (err, usuario) => {
            if (err) {
                reject(err);
            }
            if (usuario) {
                let objectUsuario = JSON.parse(JSON.stringify(usuario));
                resolve(objectUsuario);
            }
        });
    });
    return obtener;
}
/*=====  End of Metodo Obtener-Informacion-Usuario-Crud  ======*/
/*=============================================
=            Sistema de Mensajeria            =
=============================================*/
function comprobacionConversacion(usuario1, usuario2, mensajesSchema) {
    return __awaiter(this, void 0, void 0, function* () {
        let buscarEmisorReceptor = new Promise((resolve, reject) => {
            mensajesSchema.findOne({ $and: [{ emisor: usuario1 }, { receptor: usuario2 }] }, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (result == undefined || !result) {
                        console.log('Buscar si es receptor');
                        mensajesSchema.findOne({ $and: [{ emisor: usuario2 }, { receptor: usuario1 }] }, (err, result) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                if (result == undefined || !result) {
                                    resolve(0);
                                }
                                else {
                                    let objectConversacion = JSON.parse(JSON.stringify(result));
                                    let respuesta = {
                                        id_conversacion: objectConversacion._id,
                                        codigo: 3
                                    };
                                    resolve(respuesta);
                                }
                            }
                        });
                    }
                    else {
                        console.log('Existe Conversacion');
                        let objectConversacion = JSON.parse(JSON.stringify(result));
                        if (objectConversacion.emisor == usuario1) {
                            console.log('Es emisor');
                            let respuesta = {
                                id_conversacion: objectConversacion._id,
                                codigo: 1
                            };
                            // 1 == Emisor
                            resolve(respuesta);
                        }
                    }
                }
            });
        });
        let r1 = yield buscarEmisorReceptor;
        // 0 = si no existe conversacion 
        // 1 = si existe conversacion y si es emisor 
        // 3 = si existe conversacion y si es receptor
        if (r1.codigo == 1) {
            return r1;
        }
        if (r1.codigo == 3) {
            return r1;
        }
        if (r1 == 0) {
            return r1;
        }
    });
}
function obtenerMensajesConversacion(id_conversacion, mensajesSchema) {
    let obtener = new Promise((resolve, reject) => {
        mensajesSchema.findById(id_conversacion, (err, conversacion) => {
            if (err) {
                reject(err);
            }
            else {
                let objectConversacion = JSON.parse(JSON.stringify(conversacion));
                resolve(objectConversacion);
            }
        });
    });
    return obtener;
}
function comprobacionUsuarioExistente(id_usuario, usuarioSchema) {
    let comprobar = new Promise((resolve, reject) => {
        usuarioSchema.findOne({ _id: id_usuario }, (err, usuario) => {
            if (err) {
                reject(err);
            }
            else {
                if (!usuario || usuario == undefined) {
                    resolve(0);
                    // 0 cuando el usuario no existe en la bd
                }
                else {
                    let objectUsuario = JSON.parse(JSON.stringify(usuario));
                    resolve(objectUsuario);
                }
            }
        });
    });
    return comprobar;
}
function enviarMensaje(id_conversacion, codigo, mensaje, mensajesSchema) {
    if (codigo == 1) {
        console.log('Enviar Mensaje como Emisor');
        let emisor = {
            emisor: {
                mensaje: mensaje.mensaje,
                fecha: mensaje.fecha,
                visto: false
            }
        };
        let agregar = new Promise((resolve, reject) => {
            mensajesSchema.findByIdAndUpdate(id_conversacion, { $push: { mensajes: emisor } }, (err, mensajes) => {
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
    else if (codigo == 3) {
        console.log('Enviar Mensaje como Receptor');
        let receptor = {
            receptor: {
                mensaje: mensaje.mensaje,
                fecha: mensaje.fecha,
                visto: false
            }
        };
        let agregar = new Promise((resolve, reject) => {
            mensajesSchema.findByIdAndUpdate(id_conversacion, { $push: { mensajes: receptor } }, (err, mensajes) => {
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
}
function enviarArchivos(id_conversacion, imagen, informacion, mensajesSchema) {
    let agregar = new Promise((resolve, reject) => {
        if (Number(informacion.codigo) == 1) {
            let emisor = {
                emisor: {
                    archivo: imagen,
                    fecha: informacion.fecha,
                    visto: false
                }
            };
            mensajesSchema.findByIdAndUpdate(id_conversacion, { $push: { mensajes: emisor } }, (err, mensajes) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(200);
                }
            });
        }
        else if (Number(informacion.codigo) == 3) {
            let receptor = {
                receptor: {
                    archivo: imagen,
                    fecha: informacion.fecha,
                    visto: false
                }
            };
            mensajesSchema.findByIdAndUpdate(id_conversacion, { $push: { mensajes: receptor } }, (err, mensajes) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(200);
                }
            });
        }
    });
    return agregar;
}
function obtenerConversaciones(id_usuario, mensajesSchema) {
    let obtener = new Promise((resolve, reject) => {
        mensajesSchema.find({ $or: [{ emisor: id_usuario }, { receptor: id_usuario }] }, (err, conversaciones) => {
            if (err) {
                reject(err);
            }
            else {
                let objectConversaciones = JSON.parse(JSON.stringify(conversaciones));
                resolve(objectConversaciones);
            }
        });
    });
    return obtener;
}
/*=====  End of Sistema de Mensajeria  ======*/
/*=================================================================
=            Metodo Obtener-Mis-Ventas-Usuario-Cliente            =
=================================================================*/
function obtenerMisVentas(id_usuario, ventasSchema) {
    let obtener = new Promise((resolve, reject) => {
        ventasSchema.find({ vendedor: id_usuario }, (err, ventas) => {
            if (err) {
                reject(err);
            }
            else {
                let objectVentas = JSON.parse(JSON.stringify(ventas));
                resolve(objectVentas);
            }
        });
    });
    return obtener;
}
/*=====  End of Metodo Obtener-Mis-Ventas-Usuario-Cliente  ======*/
/*===============================================================
=            Metodo Obtener-Mis-Compras-Usuario-Crud            =
===============================================================*/
function obtenerMisCompras(id_usuario, ventasSchema) {
    let obtener = new Promise((resolve, reject) => {
        ventasSchema.find({ comprador: id_usuario }, (err, compras) => {
            if (err) {
                reject(err);
            }
            else {
                let objectCompras = JSON.parse(JSON.stringify(compras));
                resolve(compras);
            }
        });
    });
    return obtener;
}
/*=====  End of Metodo Obtener-Mis-Compras-Usuario-Crud  ======*/
/*=======================================
=            Eliminar Cuenta            =
=======================================*/
function eliminarCuenta(id_usuario, usuarioSchema, informacionUsuarioSchema, mensajesSchema, ventasSchema, productoSchema, imagenesProductosSchema, comentariosProductoSchema) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1 == correctamente
        /*===================================================
        =            Eliminar Imagenes Productos            =
        ===================================================*/
        let eliminarImagenesProductos = new Promise((resolve, reject) => {
            productoSchema.find({ usuario: id_usuario }, (err, productos) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (productos[0] == undefined) {
                        resolve(1);
                    }
                    else {
                        let objectProductos = JSON.parse(JSON.stringify(productos));
                        objectProductos.forEach((producto) => {
                            imagenesProductosSchema.find({ producto: producto._id }, (err, imagenesInfo) => {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    imagenesInfo.forEach((imagenInfo) => {
                                        fs_1.default.unlink(imagenInfo.imagen, (err) => {
                                            if (err) {
                                                reject(err);
                                            }
                                            else {
                                                imagenesProductosSchema.findByIdAndRemove(imagenInfo._id, (err) => {
                                                    if (err) {
                                                        reject(err);
                                                    }
                                                    else {
                                                        resolve(1);
                                                    }
                                                });
                                            }
                                        });
                                    });
                                }
                            });
                        });
                    }
                }
            });
        });
        let r = yield eliminarImagenesProductos;
        /*=====  End of Eliminar Imagenes Productos  ======*/
        if (r == 1) {
            /*============================================
             =            Eliminar Comentarios            =
             ============================================*/
            let eliminarComentarios = new Promise((resolve, reject) => {
                comentariosProductoSchema.remove({ usuario: id_usuario }, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(1);
                    }
                });
            });
            let r2 = yield eliminarComentarios;
            /*=====  End of Eliminar Comentarios  ======*/
            if (r2 == 1) {
                /*==========================================
                =            Eliminar Productos            =
                ==========================================*/
                let eliminarProductos = new Promise((resolve, reject) => {
                    productoSchema.remove({ usuario: id_usuario }, (err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(1);
                        }
                    });
                });
                let r3 = yield eliminarProductos;
                /*=====  End of Eliminar Productos  ======*/
                if (r3 == 1) {
                    /*==========================================================
                    =            Eliminar Informacion Envio Usuario            =
                    ==========================================================*/
                    let eliminarInformacionEnvio = new Promise((resolve, reject) => {
                        informacionUsuarioSchema.findByIdAndRemove(id_usuario, (err) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(1);
                            }
                        });
                    });
                    let r4 = yield eliminarInformacionEnvio;
                    /*=====  End of Eliminar Informacion Envio Usuario  ======*/
                    if (r4 == 1) {
                        /*=======================================
                        =            Eliminar Avatar            =
                        =======================================*/
                        let eliminarAvatar = new Promise((resolve, reject) => {
                            usuarioSchema.findById(id_usuario, (err, usuario) => {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    let user = JSON.parse(JSON.stringify(usuario));
                                    if (user.avatar == undefined) {
                                        resolve(1);
                                    }
                                    else {
                                        let direccion = '../imagenes/usuarios/' + user.avatar;
                                        let ruta = path_1.default.resolve(direccion);
                                        fs_1.default.unlink(ruta, (err) => {
                                            if (err) {
                                                reject(err);
                                            }
                                            else {
                                                usuarioSchema.findByIdAndUpdate(id_usuario, { avatar: undefined }, (err) => {
                                                    if (err) {
                                                        reject(err);
                                                    }
                                                    else {
                                                        resolve(1);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        });
                        let r5 = yield eliminarAvatar;
                        /*=====  End of Eliminar Avatar  ======*/
                        if (r5 == 1) {
                            /*==================================================
                            =            Eliminar Archivos Mensajes            =
                            ==================================================*/
                            let eliminarArchivosMensajesEmisor = new Promise((resolve, reject) => {
                                mensajesSchema.find({ emisor: id_usuario }, (err, conversaciones) => {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        if (conversaciones[0] == undefined) {
                                            resolve(1);
                                        }
                                        else {
                                            let objectConversaciones = JSON.parse(JSON.stringify(conversaciones));
                                            objectConversaciones.forEach((conversacion) => {
                                                conversacion.mensajes.forEach((usuario) => {
                                                    if (usuario.emisor) {
                                                        if (usuario.emisor.archivo) {
                                                            let direccion = '../imagenes/mensajes/' + usuario.emisor.archivo;
                                                            fs_1.default.unlink(path_1.default.resolve(direccion), (err) => {
                                                                if (err) {
                                                                    reject(err);
                                                                }
                                                                else {
                                                                    resolve(1);
                                                                }
                                                            });
                                                        }
                                                        else {
                                                            resolve(1);
                                                        }
                                                    }
                                                    else {
                                                        resolve(1);
                                                    }
                                                });
                                            });
                                        }
                                    }
                                });
                            });
                            let r6 = yield eliminarArchivosMensajesEmisor;
                            /*=====  End of Eliminar Archivos Mensajes  ======*/
                            if (r6 == 1) {
                                let eliminarArchivosMensajesReceptor = new Promise((resolve, reject) => {
                                    mensajesSchema.find({ receptor: id_usuario }, (err, conversaciones) => {
                                        if (err) {
                                            reject(err);
                                        }
                                        else {
                                            if (conversaciones[0] == undefined) {
                                                resolve(1);
                                            }
                                            else {
                                                let objectConversaciones = JSON.parse(JSON.stringify(conversaciones));
                                                objectConversaciones.forEach((conversacion) => {
                                                    conversacion.forEach((usuario) => {
                                                        if (usuario.receptor) {
                                                            if (usuario.receptor.archivo) {
                                                                let direccion = '../imagenes/mensajes/' + usuario.receptor.archivo;
                                                                fs_1.default.unlink(path_1.default.resolve(direccion), (err) => {
                                                                    if (err) {
                                                                        reject(err);
                                                                    }
                                                                    else {
                                                                        resolve(1);
                                                                    }
                                                                });
                                                            }
                                                            else {
                                                                resolve(1);
                                                            }
                                                        }
                                                        else {
                                                            resolve(1);
                                                        }
                                                    });
                                                });
                                            }
                                        }
                                    });
                                });
                                let r7 = yield eliminarArchivosMensajesReceptor;
                                if (r7 == 1) {
                                    /*=======================================================================
                                    =            Cambiar Estado Usuario Existente Conversaciones            =
                                    =======================================================================*/
                                    let cambiarEstadoConversacionEmisor = new Promise((resolve, reject) => {
                                        mensajesSchema.update({ emisor: id_usuario }, { $set: { emisorExistente: false } }, { multi: true }, (err) => {
                                            if (err) {
                                                reject(err);
                                            }
                                            else {
                                                resolve(1);
                                            }
                                        });
                                    });
                                    let r8 = yield cambiarEstadoConversacionEmisor;
                                    /*=====  End of Cambiar Estado Usuario Existente Conversaciones  ======*/
                                    if (r8 == 1) {
                                        let cambiarEstadoConversacionReceptor = new Promise((resolve, reject) => {
                                            mensajesSchema.update({ receptor: id_usuario }, { $set: { receptorExistente: false } }, { multi: true }, (err) => {
                                                if (err) {
                                                    reject(err);
                                                }
                                                else {
                                                    resolve(1);
                                                }
                                            });
                                        });
                                        let r9 = yield cambiarEstadoConversacionReceptor;
                                        if (r9 == 1) {
                                            /*========================================
                                            =            Eliminar Usuario            =
                                            ========================================*/
                                            let eliminarUsuario = new Promise((resolve, reject) => {
                                                usuarioSchema.findByIdAndRemove(id_usuario, (err) => {
                                                    if (err) {
                                                        reject(err);
                                                    }
                                                    else {
                                                        resolve(200);
                                                    }
                                                });
                                            });
                                            return eliminarUsuario;
                                            /*=====  End of Eliminar Usuario  ======*/
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
}
module.exports = { registrar, iniciarSesion, actualizarUsuario, cambiarContraseña, subirImagen, obtenerUsuario, obtenerMisVentas, obtenerMisCompras, agregarInformacionEnvio, obtenerInformacionEnvio, actualizarInformacionEnvio, comprobacionConversacion, obtenerMensajesConversacion, comprobacionUsuarioExistente, enviarMensaje, enviarArchivos, obtenerConversaciones, eliminarCuenta };
