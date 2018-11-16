"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/*=============================================================================
=            Modulos por defecto requeridos por Routing-Controllers-TypeScript            =
=============================================================================*/
const routing_controllers_1 = require("routing-controllers");
//Request and Response 
const routing_controllers_2 = require("routing-controllers");
/*=====  End of Modulos por defecto requeridos Routing-Controllers-TypeScript  ======*/
//Modelo 
const export_1 = require("../models/export");
//Middlewares
const autenticacion_1 = require("../middlewares/autenticacion");
const subirImagenes_1 = require("../middlewares/productos/subirImagenes");
//Definimos un nombre de la ruta de nuestra Api 
// Ejemplo localhost/Producto/MetodoX  
let ProductoController = class ProductoController {
    constructor() {
        //Inicializamos nuestra variable de instancia como un nuevo miembro de repertorioProductos
        this.repertorio = new export_1.repertorioProductos();
    }
    /*@Delete("/Eliminar-Productos-SubCategoria/:id_subcategoria")
     eliminarProductosSubCategoria(@Param("id_subcategoria") id_subcategoria:string,@Req() request:Request,@Res() response:Response){
       return this.repertorio.eliminarProductosSubCategoria(id_subcategoria)
     }*/
    /*========================================================================
    =            Metodo Agregar-Categorias-Saturar-Bd-Controlador            =
    ========================================================================*/
    agregarCategorias(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let informacion = request.body;
            return yield this.repertorio.agregarCategorias(informacion.categorias);
        });
    }
    /*=====  End of Metodo Agregar-Categorias-Saturar-Bd-Controlador  ======*/
    /*===========================================================================
    =            Metodo Agregar-SubCategorias-Saturar-Bd-Controlador            =
    ===========================================================================*/
    agregarSubCategorias(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let informacion = request.body;
            return yield this.repertorio.agregarSubCategorias(informacion.subcategorias);
        });
    }
    /*=====  End of Metodo Agregar-SubCategorias-Saturar-Bd-Controlador  ======*/
    /*=======================================================================
    =            Metodo Agregar-Productos-Saturar-Bd-Controlador            =
    =======================================================================*/
    agregarProductos(id, request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let informacion = request.body;
            return yield this.repertorio.agregarProductos(id, informacion.productos);
        });
    }
    /*=====  End of Metodo Agregar-Productos-Saturar-Bd-Controlador  ======*/
    /*================================================================================
    =            Metodo Agregar-Imagenes-Productos-Saturar-Bd-Controlador            =
    ================================================================================*/
    agregarImagenesProductos(request, response) {
        let informacion = request.body;
        return this.repertorio.agregarImagenesProductos(informacion.imagenes);
    }
    /*=====  End of Metodo Agregar-Imagenes-Productos-Saturar-Bd-Controlador  ======*/
    /*==========================================================================
    =            Metodo Agregar-Categoria-Administrador-Controlador            =
    ==========================================================================*/
    agregarCategoria(id, request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let info = request.body;
            let categoria = info.categoria;
            let descripcion = info.descripcion;
            let sub = request.user.sub;
            if (id == sub) {
                return yield this.repertorio.agregarCategoria(categoria, descripcion);
            }
            else {
                return response.sendStatus(500);
            }
        });
    }
    /*=====  End of Metodo Agregar-Categoria-Administrador-Controlador  ======*/
    /*=============================================================================
    =            Metodo Agregar-SubCategoria-Administrador-Controlador            =
    =============================================================================*/
    agregarSubCategoria(id, request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let info = request.body;
            let categoria = info.categoria;
            let subcategoria = info.subcategoria;
            let descripcion = info.descripcion;
            let sub = request.user.sub;
            if (id == sub) {
                return yield this.repertorio.agregarSubCategoria(categoria, subcategoria, descripcion);
            }
            else {
                return response.sendStatus(500);
            }
        });
    }
    /*=====  End of Metodo Agregar-SubCategoria-Administrador-Controlador  ======*/
    /*===========================================================================
    =            Metodo Obtener-Categorias-SubCategorias-Controlador            =
    ===========================================================================*/
    obtenerCategoriasSubCategorias(request, response) {
        let result = this.repertorio.obtenerCategoriasSubCategorias();
        return result;
    }
    /*=====  End of Metodo Obtener-Categorias-SubCategorias-Controlador  ======*/
    /*=============================================================
     =            Metodo Obtener-Categorias-Controlador            =
     =============================================================*/
    obtenerCategorias(request, response) {
        return this.repertorio.obtenerCategorias();
    }
    /*=====  End of Metodo Obtener-Categorias-Controlador  ======*/
    /*================================================================
      =            Metodo Obtener-SubCategorias-Controlador            =
      ================================================================*/
    obtenerSubCategorias(request, response) {
        return this.repertorio.obtenerSubCategorias();
    }
    /*=====  End of Metodo Obtener-SubCategorias-Controlador  ======*/
    /*======================================================================
        =            Metodo Obtener-Productos-Categoria-Controlador            =
    ======================================================================*/
    obtenerProductosCategoria(params, request, response) {
        let id_categoria = params.id_categoria;
        let pagina = params.pagina;
        return this.repertorio.obtenerProductosCategoria(id_categoria, pagina);
    }
    /*=====  End of Metodo Obtener-Productos-Categoria-Controlador  ======*/
    /*=========================================================================
    =            Metodo Obtener-Productos-SubCategoria-Controlador            =
    =========================================================================*/
    obtenerProductosSubCategorias(params, request, response) {
        let id_subcategoria = params.id_subcategoria;
        let pagina = params.pagina;
        return this.repertorio.obtenerProductosSubCategorias(id_subcategoria, pagina);
    }
    /*=====  End of Metodo Obtener-Productos-SubCategoria-Controlador  ======*/
    /*============================================================
    =            Metodo Obtener-Productos-Controlador            =
    ============================================================*/
    obtenerProductos(pagina, request, response) {
        return this.repertorio.obtenerProductos(pagina);
    }
    /*=====  End of Metodo Obtener-Productos-Controlador  ======*/
    /*===========================================================
    =            Metodo Obtener-Informacion-Producto            =
    ===========================================================*/
    obtenerProducto(id_producto, request, response) {
        return this.repertorio.obtenerProducto(id_producto);
    }
    /*=====  End of Metodo Obtener-Informacion-Producto  ======*/
    /*========================================================================
    =            Metodo Obtener-Mis-Productos-Usuario-Controlador            =
    ========================================================================*/
    obtenerMisProductos(id_usuario, request, response) {
        let sub = request.user.sub;
        if (id_usuario == sub) {
            return this.repertorio.obtenerMisProductos(id_usuario);
        }
        else {
            return response.sendStatus(500);
        }
    }
    /*=====  End of Metodo Obtener-Mis-Productos-Usuario-Controlador  ======*/
    /*====================================================================
    =            Metodo Agregar-Productos-Usuario-Controlador            =
    ====================================================================*/
    agregarProducto(id, response, request) {
        let producto = request.body;
        let sub = request.user.sub;
        if (id == sub) {
            return this.repertorio.agregarProducto(id, producto);
        }
        else {
            return response.sendStatus(500);
        }
    }
    /*=====  End of Metodo Agregar-Productos-Usuario-Controlador  ======*/
    /*===================================================================
    =            Metodo Editar-Productos-Usuario-Controlador            =
    ===================================================================*/
    editarProducto(params, request, response) {
        let producto = request.body;
        let sub = request.user.sub;
        let id = params.id;
        let id_producto = params.id_producto;
        if (id == sub) {
            let result = this.repertorio.editarProducto(id, id_producto, producto);
            return result;
        }
        else {
            return response.sendStatus(500);
        }
    }
    /*=====  End of Metodo Editar-Productos-Usuario-Controlador  ======*/
    /*=====================================================================
    =            Metodo Eliminar-Productos-Usuario-Controlador            =
    =====================================================================*/
    eliminarProducto(params, request, response) {
        let sub = request.user.sub;
        let id = params.id;
        let id_producto = params.id_producto;
        if (id == sub) {
            return this.repertorio.eliminarProducto(id, id_producto);
        }
        else {
            return response.sendStatus(500);
        }
    }
    /*=====  End of Metodo Eliminar-Productos-Usuario-Controlador  ======*/
    /*==================================================================
        =            Metodo Subir-Imagenes-Producto-Controlador            =
    ==================================================================*/
    subirImagenes(params, request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let images = request.files;
            let id = params.id;
            let id_producto = params.id_producto;
            let sub = request.user.sub;
            if (id == sub) {
                return this.repertorio.subirImagenes(id_producto, images);
            }
            else {
                return response.sendStatus(500);
            }
        });
    }
    /*=====  End of Metodo Subir-Imagenes-Producto-Controlador  ======*/
    /*====================================================================
    =            Metodo Mostrar-Imagenes-Producto-Controlador            =
    ====================================================================*/
    mostrarImagenes(id_producto, request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repertorio.mostrarImagenes(id_producto);
        });
    }
    /*=====  End of Metodo Mostrar-Imagenes-Producto-Controlador  ======*/
    /*===================================================================
    =            Metodo Borrar-Imagenes-Producto-Controlador            =
    ===================================================================*/
    borrarImagenes(params, request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = params.id;
            let id_producto = params.id_producto;
            let sub = request.user.sub;
            if (id == sub) {
                let result = yield this.repertorio.borrarImagenes(id_producto);
                return result;
            }
            else {
                return response.sendStatus(500);
            }
        });
    }
    /*=====  End of Metodo Borrar-Imagenes-Producto-Controlador  ======*/
    /*=================================================================
    =            Metodo Borrar-Imagen-Producto-Controlador            =
    =================================================================*/
    borrarImagen(params, request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = params.id;
            let id_producto = params.id_producto;
            let id_imagen = params.id_imagen;
            let sub = request.user.sub;
            if (id == sub) {
                let result = yield this.repertorio.borrarImagen(id_imagen);
                return result;
            }
            else {
                return response.sendStatus(500);
            }
        });
    }
    /*=====  End of Metodo Borrar-Imagen-Producto-Controlador  ======*/
    /*==============================================================================
    =            Metodo Agregar-Comentario-Producto-Usuario-Controlador            =
    ==============================================================================*/
    agregarComentario(params, request, response) {
        let id = params.id;
        let id_producto = params.id_producto;
        let comentario = request.body;
        let sub = request.user.sub;
        if (id == sub) {
            return this.repertorio.agregarComentario(id, id_producto, comentario.comentario);
        }
        else {
            return response.sendStatus(500);
        }
    }
    /*=====  End of Metodo Agregar-Comentario-Producto-Usuario-Controlador  ======*/
    /*=======================================================================
    =            Metodo Obtener-Comentarios-Producto-Controlador            =
    =======================================================================*/
    obtenerComentarios(id_producto, request, response) {
        return this.repertorio.obtenerComentarios(id_producto);
    }
    /*=====  End of Metodo Obtener-Comentarios-Producto-Controlador  ======*/
    /*============================================================
    =            Metodo Editar-Comentario-Controlador            =
    ============================================================*/
    editarComentario(params, request, response) {
        let comentario = request.body;
        let id = params.id;
        let id_comentario = params.id_comentario;
        let sub = request.user.sub;
        if (id == sub) {
            return this.repertorio.editarComentario(id, id_comentario, comentario);
        }
        else {
            return response.sendStatus(500);
        }
    }
    /*=====  End of Metodo Editar-Comentario-Controlador  ======*/
    /*==============================================================
    =            Metodo Eliminar-Comentario-Controlador            =
    ==============================================================*/
    eliminarComentario(params, request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = params.id;
            let id_comentario = params.id_comentario;
            let sub = request.user.sub;
            if (id == sub) {
                let result = yield this.repertorio.eliminarComentario(id, id_comentario);
                return result;
            }
            else {
                return response.sendStatus(500);
            }
        });
    }
    /*=====  End of Metodo Eliminar-Comentario-Controlador  ======*/
    /*========================================================
    =            Metodo Agregar-Venta-Controlador            =
    ========================================================*/
    agregarVenta(params, request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let id_comprador = params.id_comprador;
            let id_vendedor = params.id_vendedor;
            let informacion = request.body;
            let sub = request.user.sub;
            if (id_comprador == sub) {
                return yield this.repertorio.agregarVenta(id_comprador, id_vendedor, informacion.productos);
            }
            else {
                return response.sendStatus(500);
            }
        });
    }
    /*=====  End of Metodo Agregar-Venta-Controlador  ======*/
    /*=========================================================
    =            Metodo Completar-Pago-Controlador            =
    =========================================================*/
    completarPago(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let paymentId = request.query.paymentId;
            let payerId = { payer_id: request.query.PayerID };
            return yield this.repertorio.completarPago(paymentId, payerId);
        });
    }
    /*=====  End of Metodo Completar-Pago-Controlador  ======*/
    canceloPago(request, response) {
        return 500; // Url 
    }
};
__decorate([
    routing_controllers_1.Post("/Agregar-Categorias"),
    __param(0, routing_controllers_2.Req()), __param(1, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "agregarCategorias", null);
__decorate([
    routing_controllers_1.Post("/Agregar-SubCategorias"),
    __param(0, routing_controllers_2.Req()), __param(1, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "agregarSubCategorias", null);
__decorate([
    routing_controllers_1.Post("/Agregar-Productos/:id"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "agregarProductos", null);
__decorate([
    routing_controllers_1.Post("/Agregar-Imagenes-Productos"),
    __param(0, routing_controllers_2.Req()), __param(1, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "agregarImagenesProductos", null);
__decorate([
    routing_controllers_1.Post("/Agregar-Categoria/:id"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "agregarCategoria", null);
__decorate([
    routing_controllers_1.Post("/Agregar-SubCategoria/:id"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "agregarSubCategoria", null);
__decorate([
    routing_controllers_1.Get("/Obtener-CategoriasSubCategorias"),
    __param(0, routing_controllers_2.Req()), __param(1, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "obtenerCategoriasSubCategorias", null);
__decorate([
    routing_controllers_1.Get("/Obtener-Categorias"),
    __param(0, routing_controllers_2.Req()), __param(1, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "obtenerCategorias", null);
__decorate([
    routing_controllers_1.Get("/Obtener-SubCategorias"),
    __param(0, routing_controllers_2.Req()), __param(1, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "obtenerSubCategorias", null);
__decorate([
    routing_controllers_1.Get("/Obtener-Productos-Categoria/:id_categoria/:pagina"),
    __param(0, routing_controllers_1.Params()), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "obtenerProductosCategoria", null);
__decorate([
    routing_controllers_1.Get("/Obtener-Productos-SubCategoria/:id_subcategoria/:pagina"),
    __param(0, routing_controllers_1.Params()), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "obtenerProductosSubCategorias", null);
__decorate([
    routing_controllers_1.Get("/Obtener-Productos/:pagina"),
    __param(0, routing_controllers_1.Param("pagina")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "obtenerProductos", null);
__decorate([
    routing_controllers_1.Get("/Obtener-Producto/:id_producto"),
    __param(0, routing_controllers_1.Param("id_producto")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "obtenerProducto", null);
__decorate([
    routing_controllers_1.Get("/Obtener-Mis-Productos/:id_usuario"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Param("id_usuario")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "obtenerMisProductos", null);
__decorate([
    routing_controllers_1.Post("/Agregar-Producto/:id"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_2.Res()), __param(2, routing_controllers_2.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "agregarProducto", null);
__decorate([
    routing_controllers_1.Put("/Editar-Producto/:id/:id_producto"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Params()), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "editarProducto", null);
__decorate([
    routing_controllers_1.Delete("/Eliminar-Producto/:id/:id_producto"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Params()), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "eliminarProducto", null);
__decorate([
    routing_controllers_1.Post("/Subir-Imagenes/:id/:id_producto"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    routing_controllers_1.UseBefore(subirImagenes_1.upload),
    __param(0, routing_controllers_1.Params()), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "subirImagenes", null);
__decorate([
    routing_controllers_1.Get("/Mostrar-Imagenes/:id_producto"),
    __param(0, routing_controllers_1.Param("id_producto")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "mostrarImagenes", null);
__decorate([
    routing_controllers_1.Delete("/Borrar-Imagenes/:id/:id_producto"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Params()), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "borrarImagenes", null);
__decorate([
    routing_controllers_1.Delete("/Borrar-Imagen/:id/:id_producto/:id_imagen"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Params()), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "borrarImagen", null);
__decorate([
    routing_controllers_1.Post("/Agregar-Comentario/:id/:id_producto"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Params()), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "agregarComentario", null);
__decorate([
    routing_controllers_1.Get("/Obtener-Comentarios/:id_producto"),
    __param(0, routing_controllers_1.Param("id_producto")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "obtenerComentarios", null);
__decorate([
    routing_controllers_1.Put("/Editar-Comentario/:id/:id_comentario"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Params()), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "editarComentario", null);
__decorate([
    routing_controllers_1.Delete("/Eliminar-Comentario/:id/:id_comentario"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Params()), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "eliminarComentario", null);
__decorate([
    routing_controllers_1.Post("/Agregar-Venta/:id_comprador/:id_vendedor"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Params()), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "agregarVenta", null);
__decorate([
    routing_controllers_1.Get("/Completar-Pago"),
    __param(0, routing_controllers_2.Req()), __param(1, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "completarPago", null);
__decorate([
    routing_controllers_1.Get("/Cancelo-Pago"),
    __param(0, routing_controllers_2.Req()), __param(1, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "canceloPago", null);
ProductoController = __decorate([
    routing_controllers_1.Controller("/Producto"),
    __metadata("design:paramtypes", [])
], ProductoController);
exports.ProductoController = ProductoController;
