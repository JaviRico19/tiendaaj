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
const paypal_1 = require("./config/paypal");
//Colecciones 
const export_1 = require("./collections/export");
//Crud 
const crud_producto_1 = require("./crud/crud_producto");
//Dependencias o otros
const path_1 = __importDefault(require("path"));
const fs = require("fs");
class repertorioProductos {
    /*=====  End of Variables de instancia  ======*/
    constructor() {
        /*================================================================
        =            Inicializacion de variables de instancia            =
        ================================================================*/
        this.productoSchema = new export_1.productoSchema();
        this.categoriaSchema = new export_1.categoriasProductoSchema();
        this.subCategoriaSchema = new export_1.subCategoriasSchema();
        this.imagenesSchema = new export_1.imagenesProductosSchema();
        this.comentariosSchema = new export_1.comentariosProductoSchema();
        this.ventasSchema = new export_1.ventasSchema();
        this.payPal = new paypal_1.payPal();
        /*=====  End of Inicializacion de variables de instancia  ======*/
    }
    /*async eliminarProductosSubCategoria(id:string):Promise<any>{
      let productoSchema = this.productoSchema.productoSchema()
      let result = await eliminarProductosSubCategoria(id,productoSchema)
      return result
    }*/
    /*=======================================================================
    =            Metodo Agregar-Categorias-Saturar-Bd-Repertorio            =
    =======================================================================*/
    agregarCategorias(categorias) {
        return __awaiter(this, void 0, void 0, function* () {
            let categoriaSchema = this.categoriaSchema.categoriasProducto();
            let iterar = new Promise((resolve, reject) => {
                categorias.forEach((categoria) => {
                    let result = crud_producto_1.agregarCategorias(categoria.categoria, categoriaSchema);
                    if (result) {
                        let Categoria = new categoriaSchema();
                        Categoria.nombre = categoria.categoria;
                        Categoria.descripcion = categoria.descripcion;
                        Categoria.save((err) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(200);
                            }
                        });
                    }
                    else {
                        reject(500);
                    }
                });
            });
            return iterar;
        });
    }
    /*=====  End of Metodo Agregar-Categorias-Saturar-Bd-Repertorio  ======*/
    /*==========================================================================
    =            Metodo Agregar-SubCateogiras-Saturar-Bd-Repertorio            =
    ==========================================================================*/
    agregarSubCategorias(subcategorias) {
        return __awaiter(this, void 0, void 0, function* () {
            let subCategoriaSchema = this.subCategoriaSchema.subCategorias();
            let iterar = new Promise((resolve, reject) => {
                subcategorias.forEach((subcategoria) => {
                    let result = crud_producto_1.agregarSubCategorias(subcategoria.subcategoria, subCategoriaSchema);
                    if (result) {
                        let subCategoria = new subCategoriaSchema();
                        subCategoria.categoria = subcategoria.categoria;
                        subCategoria.nombre = subcategoria.subcategoria;
                        subCategoria.descripcion = subcategoria.descripcion;
                        subCategoria.save((err) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(200);
                            }
                        });
                    }
                    else {
                        reject(500);
                    }
                });
            });
            return iterar;
        });
    }
    /*=====  End of Metodo Agregar-SubCateogiras-Saturar-Bd-Repertorio  ======*/
    /*=====================================================================
    =            Metodo Agregar-Productos-Saturar-Bd-Repetorio            =
    =====================================================================*/
    agregarProductos(id, productos) {
        return __awaiter(this, void 0, void 0, function* () {
            let productoSchema = this.productoSchema.productoSchema();
            let iterar = new Promise((resolve, reject) => {
                productos.forEach((producto) => {
                    let result = crud_producto_1.agregarProducto(id, producto, productoSchema);
                    resolve(result);
                });
            });
            return iterar;
        });
    }
    /*=====  End of Metodo Agregar-Productos-Saturar-Bd-Repetorio  ======*/
    /*==============================================================================
    =            Metodo Agregar-Imagenes-Productos-Saturar-Bd-Repetorio            =
    ==============================================================================*/
    agregarImagenesProductos(imagenes) {
        return __awaiter(this, void 0, void 0, function* () {
            let imagenesSchema = this.imagenesSchema.imagenesProductoSchema();
            let productoSchema = this.productoSchema.productoSchema();
            let iterar = new Promise((resolve, reject) => {
                imagenes.forEach((imagen) => {
                    let result = crud_producto_1.agregarImagenesProductos(imagen, imagenesSchema, productoSchema);
                    resolve(result);
                });
            });
            return iterar;
        });
    }
    /*=====  End of Metodo Agregar-Imagenes-Productos-Saturar-Bd-Repetorio  ======*/
    /*========================================================================
    =            Metodo Agregar-Categoria-Administrador-Repertorio            =
    ========================================================================*/
    agregarCategoria(categoria, descripcion) {
        return __awaiter(this, void 0, void 0, function* () {
            let categoriaSchema = this.categoriaSchema.categoriasProducto();
            let result = yield crud_producto_1.agregarCategoria(categoria, descripcion, categoriaSchema);
            if (result === true) {
                return false;
            }
            else {
                let Categoria = new categoriaSchema();
                Categoria.nombre = categoria;
                Categoria.descripcion = descripcion;
                let guardar = new Promise((resolve, reject) => {
                    Categoria.save((err, categoria) => {
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
        });
    }
    /*=====  End of Metodo Agregar-Categoria-Administrador-Repertorio  ======*/
    /*============================================================================
    =            Metodo Agregar-SubCategoria-Administrador-Repertorio            =
    ============================================================================*/
    agregarSubCategoria(categoria, subcategoria, descripcion) {
        return __awaiter(this, void 0, void 0, function* () {
            let subCategoriaSchema = this.subCategoriaSchema.subCategorias();
            let result = yield crud_producto_1.agregarSubCategoria(subcategoria, subCategoriaSchema);
            if (result === true) {
                return false;
            }
            else {
                let subCategoria = new subCategoriaSchema();
                subCategoria.categoria = categoria;
                subCategoria.nombre = subcategoria;
                subCategoria.descripcion = descripcion;
                let guardar = new Promise((resolve, reject) => {
                    subCategoria.save((err, subcategoria) => {
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
        });
    }
    /*=====  End of Metodo Agregar-SubCategoria-Administrador-Repertorio  ======*/
    /*==========================================================================
    =            Metodo Obtener-Categorias-SubCategorias-Repertorio            =
    ==========================================================================*/
    obtenerCategoriasSubCategorias() {
        return __awaiter(this, void 0, void 0, function* () {
            let categoriaSchema = this.categoriaSchema.categoriasProducto();
            let subCategoriaSchema = this.subCategoriaSchema.subCategorias();
            let result = yield crud_producto_1.obtenerCategoriasSubCategorias(categoriaSchema);
            let r = yield crud_producto_1.obtenerCategoriasSubCategorias2(subCategoriaSchema, result);
            return r;
        });
    }
    /*=====  End of Metodo Obtener-Categorias-SubCategorias-Repertorio  ======*/
    /*============================================================
    =            Metodo Obtener-Categorias-Repertorio            =
    ============================================================*/
    obtenerCategorias() {
        return __awaiter(this, void 0, void 0, function* () {
            let categoriaSchema = this.categoriaSchema.categoriasProducto();
            let result = yield crud_producto_1.obtenerCategorias(categoriaSchema);
            return result;
        });
    }
    /*=====  End of Metodo Obtener-Categorias-Repertorio  ======*/
    /*===============================================================
    =            Metodo Obtener-SubCategorias-Repertorio            =
    ===============================================================*/
    obtenerSubCategorias() {
        return __awaiter(this, void 0, void 0, function* () {
            let subCategoriaSchema = this.subCategoriaSchema.subCategorias();
            let result = yield crud_producto_1.obtenerSubCategorias(subCategoriaSchema);
            return result;
        });
    }
    /*=====  End of Metodo Obtener-SubCategorias-Repertorio  ======*/
    /*========================================================================
     =            Metodo Obtener-Productos-Categoria-Repertorio            =
     ========================================================================*/
    obtenerProductosCategoria(id_categoria, pagina) {
        return __awaiter(this, void 0, void 0, function* () {
            let productoSchema = this.productoSchema.productoSchema();
            let result = yield crud_producto_1.obtenerProductosCategoria(id_categoria, pagina, productoSchema);
            return result;
        });
    }
    /*=====  End of Metodo Obtener-Productos-Categoria-Repertorio  ======*/
    /*========================================================================
      =            Metodo Obtener-Productos-SubCategoria-Repertorio            =
      ========================================================================*/
    obtenerProductosSubCategorias(id_subcategoria, pagina) {
        return __awaiter(this, void 0, void 0, function* () {
            let productoSchema = this.productoSchema.productoSchema();
            let result = yield crud_producto_1.obtenerProductosSubCategoria(id_subcategoria, pagina, productoSchema);
            return result;
        });
    }
    /*=====  End of Metodo Obtener-Productos-SubCategoria-Repertorio  ======*/
    /*===========================================================
        =            Metodo Obtener-Productos-Repertorio            =
      ===========================================================*/
    obtenerProductos(pagina) {
        return __awaiter(this, void 0, void 0, function* () {
            let productoSchema = this.productoSchema.productoSchema();
            let result = yield crud_producto_1.obtenerProductos(pagina, productoSchema);
            return result;
        });
    }
    /*=====  End of Metodo Obtener-Productos-Repertorio  ======*/
    /*=========================================================================
     =            Metodo de Obtener-Informacion-Producto-Repertorio            =
     =========================================================================*/
    obtenerProducto(id_producto) {
        return __awaiter(this, void 0, void 0, function* () {
            let productoSchema = this.productoSchema.productoSchema();
            let result = yield crud_producto_1.obtenerProducto(id_producto, productoSchema);
            return result;
        });
    }
    /*=====  End of Metodo de Obtener-Informacion-Producto-Repertorio  ======*/
    /*=======================================================================
    =            Metodo Obtener-Mis-Productos-Usuario-Repertorio            =
    =======================================================================*/
    obtenerMisProductos(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let productoSchema = this.productoSchema.productoSchema();
            let result = yield crud_producto_1.obtenerMisProductos(id_usuario, productoSchema);
            return result;
        });
    }
    /*=====  End of Metodo Obtener-Mis-Productos-Usuario-Repertorio  ======*/
    /*==================================================================
    =            Metodo Agregar-Producto-Usuario-Repertorio            =
    ==================================================================*/
    agregarProducto(id, producto) {
        return __awaiter(this, void 0, void 0, function* () {
            let productoSchema = this.productoSchema.productoSchema();
            let result = yield crud_producto_1.agregarProducto(id, producto, productoSchema);
            return result;
        });
    }
    /*=====  End of Metodo Agregar-Producto-Usuario-Repertorio  ======*/
    /*=========================================================
    =            Metodo Editar-Producto-Repertorio            =
    =========================================================*/
    editarProducto(id, id_producto, producto) {
        return __awaiter(this, void 0, void 0, function* () {
            let productoSchema = this.productoSchema.productoSchema();
            let comprobacion = yield crud_producto_1.comprobacionProducto(id, id_producto, productoSchema);
            if (comprobacion == true) {
                let result = yield crud_producto_1.editarProducto(id_producto, producto, productoSchema);
                return result;
            }
            else {
                return 500;
            }
        });
    }
    /*=====  End of Metodo Editar-Producto-Repertorio  ======*/
    /*===========================================================
    =            Metodo-Eliminar-Producto-Repertorio            =
    ===========================================================*/
    eliminarProducto(id, id_producto) {
        return __awaiter(this, void 0, void 0, function* () {
            let productoSchema = this.productoSchema.productoSchema();
            let comprobacion = yield crud_producto_1.comprobacioneliminarProducto(id, id_producto, productoSchema);
            if (comprobacion == true) {
                let result = yield crud_producto_1.eliminarProducto(id_producto, productoSchema);
                return result;
            }
            else {
                return 500;
            }
        });
    }
    /*=====  End of Metodo-Eliminar-Producto-Repertorio  ======*/
    /*=================================================================
    =            Metodo-Subir-Imagenes-Producto-Repertorio            =
    =================================================================*/
    subirImagenes(id_producto, imagenes) {
        return __awaiter(this, void 0, void 0, function* () {
            let imagenesSchema = this.imagenesSchema.imagenesProductoSchema();
            let images = imagenes.image;
            let iterar = new Promise((resolve, reject) => {
                images.forEach((image) => {
                    if (image) {
                        let file_path = image.path;
                        let file_split = file_path.split('\\');
                        let file_name = file_split[3];
                        let ext_split = file_name.split('\.');
                        let file_ext = ext_split[1];
                        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
                            let resultado = crud_producto_1.subirImagenes(id_producto, file_name, imagenesSchema);
                            resolve(resultado);
                        }
                        else {
                            fs.unlink(file_path, (err) => {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    reject(new Error('Se eliminaron los archivos y no son del formato adecuado por lo cual no se guardo'));
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
    /*=====  End of Metodo-Subir-Imagenes-Producto-Repertorio  ======*/
    /*===================================================================
    =            Metodo Mostrar-Imagenes-Producto-Repertorio            =
    ===================================================================*/
    mostrarImagenes(id_producto) {
        return __awaiter(this, void 0, void 0, function* () {
            let imagenesSchema = this.imagenesSchema.imagenesProductoSchema();
            let resultado = yield crud_producto_1.mostrarImagenes(id_producto, imagenesSchema);
            let rutas = [];
            let iterar = new Promise((resolve, reject) => {
                resultado.forEach((image) => {
                    let ruta = path_1.default.resolve(image);
                    rutas.push(ruta);
                    resolve(rutas);
                });
            });
            return iterar;
        });
    }
    /*=====  End of Metodo Mostrar-Imagenes-Producto-Repertorio  ======*/
    /*==================================================================
    =            Metodo Borrar-Imagenes-Producto-Repertorio            =
    ==================================================================*/
    borrarImagenes(id_producto) {
        return __awaiter(this, void 0, void 0, function* () {
            let imagenesSchema = this.imagenesSchema.imagenesProductoSchema();
            let resultado = yield crud_producto_1.borrarImagenes(id_producto, imagenesSchema);
            if (resultado == true) {
                let eliminar = new Promise((resolve, reject) => {
                    imagenesSchema.remove({ producto: id_producto }, (err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(200);
                        }
                    });
                });
                return eliminar;
            }
            else {
                return 500;
            }
        });
    }
    /*=====  End of Metodo Borrar-Imagenes-Producto-Repertorio  ======*/
    /*================================================================
    =            Metodo Borrar-Imagen-Producto-Repertorio            =
    ================================================================*/
    borrarImagen(id_imagen) {
        return __awaiter(this, void 0, void 0, function* () {
            let imagenesSchema = this.imagenesSchema.imagenesProductoSchema();
            let resultado = yield crud_producto_1.borrarImagen(id_imagen, imagenesSchema);
            if (resultado == true) {
                let borrarImagen = new Promise((resolve, reject) => {
                    imagenesSchema.findByIdAndRemove(id_imagen, (err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(200);
                        }
                    });
                });
                return borrarImagen;
            }
            else {
                return 500;
            }
        });
    }
    /*=====  End of Metodo Borrar-Imagen-Producto-Repertorio  ======*/
    /*=====================================================================
    =            Metodo Agregar-Comentario-Producto-Repertorio            =
    =====================================================================*/
    agregarComentario(id, id_producto, comentario) {
        return __awaiter(this, void 0, void 0, function* () {
            let comentariosProducto = this.comentariosSchema.comentariosProducto();
            let result = yield crud_producto_1.agregarComentario(id, id_producto, comentario, comentariosProducto);
            return result;
        });
    }
    /*=====  End of Metodo Agregar-Comentario-Producto-Repertorio  ======*/
    /*======================================================================
    =            Metodo Obtener-Comentarios-Producto-Repertorio            =
    ======================================================================*/
    obtenerComentarios(id_producto) {
        return __awaiter(this, void 0, void 0, function* () {
            let comentariosProducto = this.comentariosSchema.comentariosProducto();
            let result = yield crud_producto_1.obtenerComentarios(id_producto, comentariosProducto);
            return result;
        });
    }
    /*=====  End of Metodo Obtener-Comentarios-Producto-Repertorio  ======*/
    /*====================================================================
    =            Metodo Editar-Comentario-Producto-Repertorio            =
    ====================================================================*/
    editarComentario(id, id_comentario, comentario) {
        return __awaiter(this, void 0, void 0, function* () {
            let comentariosProducto = this.comentariosSchema.comentariosProducto();
            let comprobacion = yield crud_producto_1.comprobacionEditar(id, id_comentario, comentariosProducto);
            if (comprobacion == true) {
                let result = yield crud_producto_1.editarComentario(id_comentario, comentario, comentariosProducto);
                return result;
            }
            else {
                return 500;
            }
        });
    }
    /*=====  End of Metodo Editar-Comentario-Producto-Repertorio  ======*/
    /*======================================================================
    =            Metodo Eliminar-Comentario-Producto-Repertorio            =
    ======================================================================*/
    eliminarComentario(id, id_comentario) {
        return __awaiter(this, void 0, void 0, function* () {
            let comentariosProducto = this.comentariosSchema.comentariosProducto();
            let result = yield crud_producto_1.comprobacion(id, id_comentario, comentariosProducto);
            if (result == true) {
                let eliminar = new Promise((resolve, reject) => {
                    comentariosProducto.findByIdAndRemove(id_comentario, (err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(200);
                        }
                    });
                });
                return eliminar;
            }
            else {
                return 500;
            }
        });
    }
    /*=====  End of Metodo Eliminar-Comentario-Producto-Repertorio  ======*/
    /*=======================================================
    =            Metodo Agregar-Venta-Repertorio            =
    =======================================================*/
    agregarVenta(id_comprador, id_vendedor, informacion) {
        return __awaiter(this, void 0, void 0, function* () {
            let productoSchema = this.productoSchema.productoSchema();
            let ventasSchema = this.ventasSchema.ventasSchema();
            let paypal = this.payPal.configuracion();
            let items = [];
            let cantidad = 0;
            let precio = 0;
            if (!Array.isArray(informacion)) {
                let item = yield crud_producto_1.obtenerItem(informacion.id, productoSchema);
                cantidad += informacion.cantidad;
                precio += informacion.precio;
                let guardar = new Promise((resolve, reject) => {
                    let Ventas = new ventasSchema();
                    Ventas.comprador = id_comprador;
                    Ventas.vendedor = id_vendedor;
                    Ventas.producto = informacion.id;
                    Ventas.descripcion = item.descripcion;
                    Ventas.cantidad = cantidad;
                    Ventas.precio = precio;
                    Ventas.save((err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(true);
                        }
                    });
                });
                let result = yield guardar;
                if (result) {
                    let informacionPago = JSON.stringify({
                        intent: 'sale',
                        payer: {
                            payment_method: 'paypal'
                        },
                        redirect_urls: {
                            return_url: 'http://localhost:3200/Producto/Completar-Pago',
                            cancel_url: 'http://localhost:3200/Pruducto/Cancelo-Pago'
                        },
                        transactions: [{
                                amount: {
                                    total: precio.toString(),
                                    currency: 'USD'
                                },
                                description: 'Tienes ' + cantidad + ' productos'
                            }]
                    });
                    console.log(informacionPago);
                    let inicializarCompra = new Promise((resolve, reject) => {
                        paypal.payment.create(informacionPago, (error, payment) => {
                            var links = {};
                            if (error) {
                                console.error(JSON.stringify(error));
                            }
                            else {
                                // Capture HATEOAS links
                                payment.links.forEach((linkObj) => {
                                    links[linkObj.rel] = {
                                        href: linkObj.href,
                                        method: linkObj.method
                                    };
                                });
                                // If redirect url present, redirect user
                                if (links.hasOwnProperty('approval_url')) {
                                    //REDIRECT USER TO links['approval_url'].href
                                    resolve(links['approval_url'].href);
                                }
                                else {
                                    reject(new Error('no redirect URI present'));
                                }
                            }
                        });
                    });
                    return inicializarCompra;
                }
                else {
                    return 500;
                }
            }
            else {
                let iterar = new Promise((resolve, reject) => {
                    informacion.forEach((producto) => {
                        let item = crud_producto_1.obtenerItem(producto.id, productoSchema);
                        items.push(item);
                        cantidad += producto.cantidad;
                        precio += producto.precio;
                        let Ventas = new ventasSchema();
                        Ventas.comprador = id_comprador;
                        Ventas.vendedor = id_vendedor;
                        Ventas.producto = producto.id;
                        Ventas.descripcion = item.descripcion;
                        Ventas.cantidad = cantidad;
                        Ventas.precio = precio;
                        Ventas.save((err) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(true);
                            }
                        });
                    });
                });
                let result = yield iterar;
                if (result) {
                    let informacionPago = JSON.stringify({
                        intent: 'sale',
                        payer: {
                            payment_method: 'paypal'
                        },
                        redirect_urls: {
                            return_url: 'http://localhost:3200/Producto/Completar-Pago',
                            cancel_url: 'http://localhost:3200/Pruducto/Cancelo-Pago'
                        },
                        transactions: [{
                                amount: {
                                    total: precio.toString(),
                                    currency: 'USD'
                                },
                                description: 'Tienes ' + cantidad + ' productos '
                            }]
                    });
                    let iniciarlizarCompra = new Promise((resolve, reject) => {
                        paypal.payment.create(informacionPago, (error, payment) => {
                            var links = {};
                            if (error) {
                                console.error(JSON.stringify(error));
                            }
                            else {
                                // Capture HATEOAS links
                                payment.links.forEach((linkObj) => {
                                    links[linkObj.rel] = {
                                        href: linkObj.href,
                                        method: linkObj.method
                                    };
                                });
                                // If redirect url present, redirect user
                                if (links.hasOwnProperty('approval_url')) {
                                    //REDIRECT USER TO links['approval_url'].href
                                    resolve(links['approval_url'].href);
                                }
                                else {
                                    reject(new Error('no redirect URI present'));
                                }
                            }
                        });
                    });
                    return iniciarlizarCompra;
                }
                else {
                    return 500;
                }
            }
        });
    }
    /*=====  End of Metodo Agregar-Venta-Repertorio  ======*/
    /*========================================================
    =            Metodo Completar-Pago-Repertorio            =
    ========================================================*/
    completarPago(paymentId, payerId) {
        let paypal = this.payPal.configuracion();
        let completar = new Promise((resolve, reject) => {
            paypal.payment.execute(paymentId, payerId, (error, payment) => {
                if (error) {
                    reject(JSON.stringify(error));
                }
                else {
                    if (payment.state == 'approved') {
                        resolve('payment completed successfully');
                    }
                    else {
                        reject('payment not successful');
                    }
                }
            });
        });
        return completar;
    }
}
exports.repertorioProductos = repertorioProductos;
