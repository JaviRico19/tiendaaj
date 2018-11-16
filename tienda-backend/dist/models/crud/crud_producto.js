"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/*======================================================
=      Metodo Agregar-Categorias-Saturar-Bd-Crud            =
======================================================*/
function agregarCategorias(categoria, categoriaSchema) {
    let comprobar = new Promise((resolve, reject) => {
        categoriaSchema.findOne({ nombre: categoria }, (err, categoria) => {
            if (err) {
                reject(err);
            }
            else {
                if (categoria != null) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            }
        });
    });
    return comprobar;
}
/*=====  End of Metodo Agregar-Categorias-Saturar-Bd-Crud  ======*/
/*====================================================================
=            Metodo Agregar-SubCategorias-Saturar-Bd-Crud            =
====================================================================*/
function agregarSubCategorias(subcategoria, subCategoriaSchema) {
    let comprobar = new Promise((resolve, reject) => {
        subCategoriaSchema.findOne({ nombre: subcategoria }, (err, subcategoria) => {
            if (err) {
                reject(err);
            }
            else {
                if (subcategoria != null) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            }
        });
    });
    return comprobar;
}
/*=====  End of Metodo Agregar-SubCategorias-Saturar-Bd-Crud  ======*/
/*=========================================================================
=            Metodo Agregar-Imagenes-Productos-Saturar-Bd-Crud            =
=========================================================================*/
function agregarImagenesProductos(imagen, imagenesSchema, productoSchema) {
    let Imagen = new imagenesSchema();
    let agregar = new Promise((resolve, reject) => {
        if (imagen.producto.subcategoria) {
            productoSchema.find({ nombre: imagen.producto.nombre, subcategoria: imagen.producto.subcategoria }, (err, producto) => {
                if (err) {
                    reject(err);
                }
                else {
                    let a = JSON.parse(JSON.stringify(producto));
                    Imagen.producto = a[0]._id;
                    Imagen.imagen = imagen.imagen;
                    Imagen.save((err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(200);
                        }
                    });
                }
            });
        }
        else {
            productoSchema.find({ nombre: imagen.producto.nombre }, (err, producto) => {
                if (err) {
                    reject(err);
                }
                else {
                    let a = JSON.parse(JSON.stringify(producto));
                    Imagen.producto = a[0]._id;
                    Imagen.imagen = imagen.imagen;
                    Imagen.save((err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(200);
                        }
                    });
                }
            });
        }
    });
    return agregar;
}
/*=====  End of Metodo Agregar-Imagenes-Productos-Saturar-Bd-Crud  ======*/
/*===================================================================
=            Metodo Agregar-Categoria-Administrador-Crud            =
===================================================================*/
function agregarCategoria(categoria, descripcion, categoriaSchema) {
    let comprobar = new Promise((resolve, reject) => {
        categoriaSchema.findOne({ nombre: categoria }, (err, categoria) => {
            if (err) {
                reject(err);
            }
            else {
                if (categoria) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }
        });
    });
    return comprobar;
}
/*=====  End of Metodo Agregar-Categoria-Administrador-Crud  ======*/
/*======================================================================
=            Metodo Agregar-SubCategoria-Administrador-Crud            =
======================================================================*/
function agregarSubCategoria(subcategoria, subCategoriaSchema) {
    let comprobar = new Promise((resolve, reject) => {
        subCategoriaSchema.findOne({ nombre: subcategoria }, (err, subcategoria) => {
            if (err) {
                reject(err);
            }
            if (subcategoria) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    });
    return comprobar;
}
/*=====  End of Metodo Agregar-SubCategoria-Administrador-Crud  ======*/
/*====================================================================
=            Metodo Obtener-Categorias-SubCategorias-Crud            =
====================================================================*/
function obtenerCategoriasSubCategorias(categoriaSchema) {
    let obtener = new Promise((resolve, reject) => {
        categoriaSchema.find({}, (err, categorias) => {
            if (err) {
                reject(err);
            }
            else {
                let arrayCategorias;
                arrayCategorias = [];
                categorias.forEach((object) => {
                    arrayCategorias.push(object);
                });
                resolve(arrayCategorias);
            }
        });
    });
    return obtener;
}
function obtenerCategoriasSubCategorias2(subCategoriaSchema, result) {
    let array;
    array = [];
    let r = new Promise((resolve, reject) => {
        result.forEach((categoria) => {
            subCategoriaSchema.find({ categoria: categoria._id }, (err, subcategorias) => {
                if (err) {
                    reject(err);
                }
                else {
                    let r = {
                        categoria: categoria,
                        subcategorias: subcategorias
                    };
                    // Categoria : Tecnologia 
                    // SubCategoria :Celulares,Tabletas,Computadoras etc. 
                    array.push(r);
                }
            });
        });
        setTimeout(() => {
            resolve(array);
        }, 3000);
    });
    return r;
}
/*=====  End of Metodo Obtener-Categorias-SubCategorias-Crud  ======*/
/*======================================================
=            Metodo Obtener-Categorias-Crud            =
======================================================*/
function obtenerCategorias(categoriaSchema) {
    let obtener = new Promise((resolve, reject) => {
        categoriaSchema.find({}, (err, categorias) => {
            if (err) {
                reject(err);
            }
            else {
                let result = [];
                categorias.forEach((categoria) => {
                    result.push(categoria._doc);
                });
                resolve(result);
            }
        });
    });
    return obtener;
}
/*=====  End of Metodo Obtener-Categorias-Crud  ======*/
/*=========================================================
=            Metodo Obtener-SubCategorias-Crud            =
=========================================================*/
function obtenerSubCategorias(subCategoriaSchema) {
    let obtener = new Promise((resolve, reject) => {
        subCategoriaSchema.find({}, (err, subcategorias) => {
            if (err) {
                reject(err);
            }
            else {
                let result = [];
                subcategorias.forEach((subcategoria) => {
                    result.push(subcategoria._doc);
                });
                resolve(result);
            }
        });
    });
    return obtener;
}
/*=====  End of Metodo Obtener-SubCategorias-Crud  ======*/
/*===============================================================
=            Metodo Obtener-Productos-Categoria-Crud            =
===============================================================*/
function obtenerProductosCategoria(id_categoria, pagina, productoSchema) {
    let pag = pagina;
    let cantProductos = 9;
    let saltos = (cantProductos * pag) - cantProductos;
    let obtener = new Promise((resolve, reject) => {
        productoSchema.find({ categoria: id_categoria }, (err, productos) => {
            if (err) {
                reject(err);
            }
            else {
                productoSchema.count({ categoria: id_categoria }, (err, count) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        let objectProductos = JSON.parse(JSON.stringify(productos));
                        let data = {
                            total: count,
                            paginas: Math.ceil(count / cantProductos),
                            productos: objectProductos
                        };
                        resolve(data);
                    }
                });
            }
        }).skip(saltos).limit(cantProductos);
    });
    return obtener;
}
/*=====  End of Metodo Obtener-Productos-Categoria-Crud  ======*/
/*=============================================================
=            Metodo Obtener-Productos-SubCategoria-Crud      =
=============================================================*/
function obtenerProductosSubCategoria(id_subcategoria, pagina, productoSchema) {
    let pag = pagina;
    let cantProductos = 9;
    let saltos = (cantProductos * pag) - cantProductos;
    let obtener = new Promise((resolve, reject) => {
        productoSchema.find({ subcategoria: id_subcategoria }, (err, productos) => {
            if (err) {
                reject(err);
            }
            else {
                productoSchema.count({ subcategoria: id_subcategoria }, (err, count) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        let objectProductos = JSON.parse(JSON.stringify(productos));
                        let data = {
                            total: count,
                            paginas: Math.ceil(count / cantProductos),
                            productos: objectProductos
                        };
                        resolve(data);
                    }
                });
            }
        }).skip(saltos).limit(cantProductos);
    });
    return obtener;
}
/*=====  End of Metodo Obtener-Productos-SubCategoria-Crud  ======*/
/*==============================================
=         Metodo Obtener-Productos-Crud            =
==============================================*/
function obtenerProductos(pagina, productoSchema) {
    let cantProductos = 9;
    let saltos = (cantProductos * pagina) - cantProductos;
    let obtener = new Promise((resolve, reject) => {
        productoSchema.find({}, (err, productos) => {
            if (err) {
                reject(err);
            }
            else {
                productoSchema.count((err, count) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        let objectProductos = JSON.parse(JSON.stringify(productos));
                        let data = {
                            total: count,
                            paginas: Math.ceil(count / cantProductos),
                            productos: objectProductos
                        };
                        resolve(data);
                    }
                });
            }
        }).skip(saltos).limit(cantProductos);
    });
    return obtener;
}
/*=====  End of Metodo Obtener-Productos-Crud  ======*/
/*=========================================================
=            Metodo Obtener-Informacion-Producto-Crud            =
=========================================================*/
function obtenerProducto(id_producto, productoSchema) {
    let obtener = new Promise((resolve, reject) => {
        productoSchema.findById(id_producto, (err, producto) => {
            if (err) {
                reject(err);
            }
            else {
                let objectProducto = JSON.parse(JSON.stringify(producto));
                resolve(objectProducto);
            }
        });
    });
    return obtener;
}
/*=====  End of Metodo Obtener-Informacion-Producto-Crud  ======*/
/*=========================================================
=            Metodo Obtener-Mis-Productos-Crud            =
=========================================================*/
function obtenerMisProductos(id_usuario, productoSchema) {
    let obtener = new Promise((resolve, reject) => {
        productoSchema.find({ usuario: id_usuario }, (err, productos) => {
            if (err) {
                reject(err);
            }
            else {
                let objectProductos = JSON.parse(JSON.stringify(productos));
                resolve(productos);
            }
        });
    });
    return obtener;
}
/*=====  End of Metodo Obtener-Mis-Productos-Crud  ======*/
/*====================================================
=            Metodo Agregar-Producto-Crud            =
====================================================*/
function agregarProducto(id, producto, productoSchema) {
    let Producto = new productoSchema();
    let categoria = producto.categoria;
    let subcategoria = producto.subcategoria;
    Producto.categoria = categoria;
    Producto.subcategoria = subcategoria;
    Producto.usuario = id;
    Producto.nombre = producto.nombre;
    Producto.precio = producto.precio;
    Producto.descripcion = producto.descripcion;
    Producto.tipo = producto.tipo;
    Producto.oferta = producto.oferta;
    Producto.descuento = producto.descuento;
    Producto.preciodescuento = producto.preciodescuento;
    Producto.ventas = producto.ventas;
    Producto.fecha = producto.fecha;
    let agregar = new Promise(((resolve, reject) => {
        Producto.save((err, producto) => {
            if (err) {
                reject(err);
            }
            else {
                let datos = {
                    categoria: producto.categoria,
                    subcategoria: producto.subcategoria,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    descripcion: producto.descripcion,
                    tipo: producto.tipo,
                    oferta: producto.oferta,
                    descuento: producto.descuento,
                    ventas: producto.ventas,
                    fecha: producto.fecha
                };
                resolve(datos);
            }
        });
    }));
    return agregar;
}
/*=====  End of Metodo Agregar-Producto-Crud  ======*/
/*====================================================
=            Metodo Comprobacion-Producto-Crud            =
====================================================*/
function comprobacionProducto(id, id_producto, productoSchema) {
    let comprobar = new Promise((resolve, reject) => {
        productoSchema.findById(id_producto, (err, producto) => {
            if (err) {
                reject(err);
            }
            else {
                if (producto.usuario == id) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }
        });
    });
    return comprobar;
}
/*=====  End of Metodo Comprobacion-Producto-Crud  ======*/
/*===================================================
=            Metodo Editar-Producto-Crud            =
===================================================*/
function editarProducto(id_producto, producto, productoSchema) {
    let editar = new Promise((resolve, reject) => {
        productoSchema.findByIdAndUpdate(id_producto, producto, { new: true }, (err, producto) => {
            if (err) {
                reject(err);
            }
            else {
                let objectProducto = JSON.parse(JSON.stringify(producto));
                resolve(objectProducto);
            }
        });
    });
    return editar;
}
/*=====  End of Metodo Editar-Producto-Crud  ======*/
/*==================================================================
=            Metodo Comprobacion-Eliminar-Producto-Crud            =
==================================================================*/
function comprobacioneliminarProducto(id, id_producto, productoSchema) {
    let comprobar = new Promise((resolve, reject) => {
        productoSchema.findById(id_producto, (err, producto) => {
            if (err) {
                reject(err);
            }
            else {
                if (producto.usuario == id) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }
        });
    });
    return comprobar;
}
/*=====  End of Metodo Comprobacion-Eliminar-Producto-Crud  ======*/
/*=====================================================
=            Metodo Eliminar-Producto-Crud            =
=====================================================*/
function eliminarProducto(id_producto, productoSchema) {
    let borrar = new Promise((resolve, reject) => {
        productoSchema.findByIdAndRemove(id_producto, (err, producto) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(200);
            }
        });
    });
    return borrar;
}
/*=====  End of Metodo Eliminar-Producto-Crud  ======*/
/*===========================================================
=            Metodo Subir-Imagenes-Producto-Crud            =
===========================================================*/
function subirImagenes(id_producto, imagen, imagenesSchema) {
    let imagenes = new imagenesSchema();
    imagenes.producto = id_producto;
    imagenes.imagen = imagen;
    let subir = new Promise((resolve, reject) => {
        imagenes.save((err, imagen) => {
            if (err) {
                reject(err);
            }
            else {
                let datos = {
                    imagen: imagen
                };
                resolve(datos);
            }
        });
    });
    return subir;
}
/*=====  End of Metodo Subir-Imagenes-Producto-Crud  ======*/
/*=======================================================
=            Metodo de Mostrar-Imagenes-Crud            =
=======================================================*/
function mostrarImagenes(id_producto, imagenesSchema) {
    let mostrar = new Promise((resolve, reject) => {
        imagenesSchema.find({ producto: id_producto }, (err, imagenes) => {
            if (err) {
                reject(err);
            }
            else {
                let images = [];
                imagenes.forEach((image) => {
                    images.push(image.imagen);
                });
                resolve(images);
            }
        });
    });
    return mostrar;
}
/*=====  End of Metodo de Mostrar-Imagenes-Crud  ======*/
/*============================================================
=            Metodo Borrar-Imagenes-Producto-Crud            =
============================================================*/
function borrarImagenes(id_producto, imagenesSchema) {
    let borrarImagenes = new Promise((resolve, reject) => {
        imagenesSchema.find({ producto: id_producto }, (err, imagenes) => {
            if (err) {
                reject(err);
            }
            else {
                let images = [];
                imagenes.forEach((image) => {
                    images.push(image.imagen);
                });
                images.forEach((i) => {
                    let direccion = '../imagenes/productos/' + i;
                    let ruta = path_1.default.resolve(direccion);
                    fs_1.default.unlink(ruta, (err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(true);
                        }
                    });
                });
            }
        });
    });
    return borrarImagenes;
}
/*=====  End of Metodo Borrar-Imagenes-Producto-Crud  ======*/
/*==========================================================
=            Metodo Borrar-Imagen-Producto-Crud            =
==========================================================*/
function borrarImagen(id_imagen, imagenesSchema) {
    let borrarImagen = new Promise((resolve, reject) => {
        imagenesSchema.findById(id_imagen, (err, imagen) => {
            if (err) {
                reject(err);
            }
            else {
                let direccion = '../imagenes/productos/' + imagen.imagen;
                let ruta = path_1.default.resolve(direccion);
                fs_1.default.unlink(ruta, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(true);
                    }
                });
            }
        });
    });
    return borrarImagen;
}
/*=====  End of Metodo Borrar-Imagen-Producto-Crud  ======*/
/*===============================================================
=            Metodo Agregar-Comentario-Producto-Crud            =
===============================================================*/
function agregarComentario(id, id_producto, comentario, comentariosSchema) {
    let Comentario = new comentariosSchema();
    let agregar = new Promise((resolve, reject) => {
        Comentario.producto = id_producto;
        Comentario.usuario = id;
        Comentario.comentario = comentario;
        Comentario.save((err) => {
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
/*=====  End of Metodo Agregar-Comentario-Producto-Crud  ======*/
/*================================================================
=            Metodo Obtener-Comentarios-Producto-Crud            =
================================================================*/
function obtenerComentarios(id_producto, comentariosProductos) {
    let obtener = new Promise((resolve, reject) => {
        comentariosProductos.find({ producto: id_producto }, (err, comentarios) => {
            if (err) {
                reject(err);
            }
            else {
                let objectComentarios = JSON.parse(JSON.stringify(comentarios));
                resolve(comentarios);
            }
        });
    });
    return obtener;
}
/*=====  End of Metodo Obtener-Comentarios-Producto-Crud  ======*/
/*=======================================================
=            Metodo Comprobacion-Editar-Crud            =
=======================================================*/
function comprobacionEditar(id, id_comentario, comentariosProducto) {
    let comprobar = new Promise((resolve, reject) => {
        comentariosProducto.findById(id_comentario, (err, comentario) => {
            if (err) {
                reject(err);
            }
            else {
                if (comentario.usuario == id) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }
        });
    });
    return comprobar;
}
/*=====  End of Metodo Comprobacion-Editar-Crud  ======*/
/*=====================================================
=            Metodo Editar-Comentario-Crud            =
=====================================================*/
function editarComentario(id_comentario, comentario, comentariosProducto) {
    let editar = new Promise((resolve, reject) => {
        comentariosProducto.findByIdAndUpdate(id_comentario, { comentario: comentario.comentario }, { new: true }, (err, comentario) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(200);
            }
        });
    });
    return editar;
}
/*=====  End of Metodo Editar-Comentario-Crud  ======*/
/*================================================
=            Metodo Comprobacion-Crud            =
================================================*/
function comprobacion(id, id_comentario, comentariosProducto) {
    let comprobar = new Promise((resolve, reject) => {
        comentariosProducto.findById(id_comentario, (err, comentario) => {
            if (err) {
                reject(err);
            }
            else {
                if (comentario.usuario == id) {
                    resolve(true);
                }
                else {
                    reject(false);
                }
            }
        });
    });
    return comprobar;
}
/*=====  End of Metodo Comprobacion-Crud  ======*/
/*===================================================
=            Metodo de Obtener-Item-Crud            =
===================================================*/
function obtenerItem(id_producto, productoSchema) {
    let obtener = new Promise((resolve, reject) => {
        productoSchema.findById(id_producto, (err, producto) => {
            if (err) {
                reject(err);
            }
            else {
                let objectProducto = JSON.parse(JSON.stringify(producto));
                resolve(objectProducto);
            }
        });
    });
    return obtener;
}
module.exports = { agregarCategoria, agregarSubCategoria, obtenerCategoriasSubCategorias, obtenerCategoriasSubCategorias2, obtenerCategorias, obtenerSubCategorias, obtenerProductosCategoria, obtenerProductosSubCategoria, obtenerProductos, obtenerProducto, obtenerMisProductos, agregarProducto, comprobacionProducto, editarProducto, comprobacioneliminarProducto, eliminarProducto, subirImagenes, mostrarImagenes, borrarImagenes, borrarImagen, agregarComentario, obtenerComentarios, comprobacionEditar, editarComentario, comprobacion, obtenerItem, agregarCategorias, agregarSubCategorias, agregarImagenesProductos };
