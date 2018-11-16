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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*=========================================================================================
=     Modulos por defecto requeridos por Routing-Controllers-TypeScript            =
=========================================================================================*/
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_2 = require("routing-controllers");
/*=====  Modulos por defecto requeridos por Routing-Controllers-TypeScript  ======*/
/*================================
=            Modelos             =
================================*/
const export_1 = require("../models/export");
/*=====  End of Modelos   ======*/
/*====================================================================================
=            Middlewares requeridos por los metodos de Usuario-Controller            =
====================================================================================*/
const autenticacion_1 = require("../middlewares/autenticacion");
const subirImagenes_1 = require("../middlewares/usuario/subirImagenes");
const subirArchivos_1 = require("../middlewares/mensajes/subirArchivos");
/*=====  End of Middlewares requeridos por los metodos de Usuario-Controller  ======*/
//Otros
const path_1 = __importDefault(require("path"));
//Definimos un nombre de la ruta de nuestra Api 
// Ejemplo localhost/Usuario/MetodoX  
let UserController = class UserController {
    constructor() {
        // Inicializamos nuestra variable como un nuevo miembro de la clase cliente
        this.cliente = new export_1.Cliente();
    }
    /*====================================================
    =            Metodo Registrar-Controlador            =
    ====================================================*/
    //Definimos el metodo por post y definimos un nombre de ruta
    registrar(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = request.body;
            let result = yield this.cliente.registrar(user);
            return result;
        });
    }
    /*=====  End of Metodo Registrar-Controlador  ======*/
    /*=============================================
  =          Metodo Iniciar-Sesion-Controlador       =
  =============================================*/
    iniciarSesion(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = request.body;
            return yield this.cliente.iniciarSesion(user);
        });
    }
    /*=====  Metodo Iniciar-Sesion-Controlador  ======*/
    /*=========================================================================
    =            Metodo Actualizar-Informacion-Usuario-Controlador            =
    =========================================================================*/
    actualizarUsuario(id, request, response) {
        let user = request.body;
        let sub = request.user.sub;
        if (id == sub) {
            return this.cliente.actualizarUsuario(id, user);
        }
        else {
            return false;
        }
    }
    /*=====  End of Metodo Actualizar-Informacion-Usuario-Controlador  ======*/
    /*=============================================================
    =            Metodo Cambiar-Contraseña-Controlador            =
    =============================================================*/
    cambiarContraseña(id_usuario, request, response) {
        let sub = request.user.sub;
        let contraseña = request.body;
        if (id_usuario == sub) {
            return this.cliente.cambiarContraseña(id_usuario, contraseña.contraseña);
        }
        else {
            return response.sendStatus(500);
        }
    }
    /*=====  End of Metodo Cambiar-Contraseña-Controlador  ======*/
    /*============================================================================
    =            Metodo Agregar-Informacion-Envio-Usuario-Controlador            =
    ============================================================================*/
    agregarInformacionEnvio(id_usuario, request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let sub = request.user.sub;
            let informacion = request.body;
            if (id_usuario == sub) {
                return yield this.cliente.agregarInformacionEnvio(id_usuario, informacion);
            }
            else {
                console.log('Credenciales incorrectas');
                return response.sendStatus(500);
            }
        });
    }
    /*=====  End of Metodo Agregar-Informacion-Envio-Usuario-Controlador  ======*/
    /*============================================================================
    =            Metodo Obtener-Informacion-Envio-Usuario-Controlador            =
    ============================================================================*/
    obtenerInformacionEnvio(id_usuario, request, response) {
        let sub = request.user.sub;
        if (id_usuario == sub) {
            return this.cliente.obtenerInformacionEnvio(id_usuario);
        }
        else {
            return response.sendStatus(500);
        }
    }
    /*=====  End of Metodo Obtener-Informacion-Envio-Usuario-Controlador  ======*/
    /*=======================================================================
    =            Metodo Actualizar-Informacion-Envio-Controlador            =
    =======================================================================*/
    actualizarInformacionEnvio(params, request, response) {
        let informacion = request.body;
        let sub = request.user.sub;
        let id_usuario = params.id_usuario;
        let id_info = params.id_info;
        if (id_usuario == sub) {
            return this.cliente.actualizarInformacionEnvio(id_info, informacion);
        }
        else {
            return response.sendStatus(500);
        }
    }
    /*=====  End of Metodo Actualizar-Informacion-Envio-Controlador  ======*/
    /*======================================================================
    =            Metodo Subir-Imagen-Perfil-Usuario-Controlador            =
    ======================================================================*/
    subirImagen(id, request, response) {
        let imagen = request.files;
        let sub = request.user.sub;
        if (id == sub) {
            return this.cliente.subirImagen(id, imagen);
        }
        else {
            return false;
        }
    }
    /*=====  End of Metodo Subir-Imagen-Perfil-Usuario-Controlador  ======*/
    /*===========================================================================
      =            Metodo de Obtener-Imagen-Perfil-Usuario-Controlador            =
    ===========================================================================*/
    obtenerImagen(imagen, request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.cliente.obtenerImagen(imagen);
            let archivo = result;
            return path_1.default.resolve(archivo);
        });
    }
    /*=====  End of Metodo de Obtener-Imagen-Perfil-Usuario-Controlador  ======*/
    /*======================================================================
    =            Metodo Obtener-Informacion-Usuario-Controlador            =
    ======================================================================*/
    obtenerUsuario(id, request, response) {
        return this.cliente.obtenerUsuario(id);
    }
    /*=====  End of Metodo Obtener-Informacion-Usuario-Controlador  ======*/
    /*=============================================
      =            Sistema de Mensajeria            =
    =============================================*/
    sistemaMensajeria(params, request, response) {
        let usuario1 = params.usuario1;
        let usuario2 = params.usuario2;
        let contenido = request.body;
        let sub = request.user.sub;
        if (sub == usuario1) {
            return this.cliente.sistemaMensajeria(usuario1, usuario2, contenido);
        }
        else {
            return response.sendStatus(500);
        }
    }
    enviarMensaje(params, request, response) {
        let sub = request.user.sub;
        let id_usuario = params.id_usuario;
        let id_conversacion = params.id_conversacion;
        let informacion = request.body;
        let codigo = informacion.codigo;
        let mensaje = informacion.mensaje;
        if (id_usuario == sub) {
            return this.cliente.enviarMensaje(id_conversacion, codigo, mensaje);
        }
        else {
            return response.sendStatus(500);
        }
    }
    enviarArchivos(params, request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let id_usuario = params.id_usuario;
            let id_conversacion = params.id_conversacion;
            let files = request.files;
            let informacion = request.body;
            let sub = request.user.sub;
            if (sub == id_usuario) {
                return yield this.cliente.enviarArchivos(id_conversacion, files, informacion);
            }
            else {
                return response.sendStatus(500);
            }
        });
    }
    obtenerConversaciones(id_usuario, request, response) {
        let sub = request.user.sub;
        if (id_usuario == sub) {
            return this.cliente.obtenerConversaciones(id_usuario);
        }
        else {
            return response.sendStatus(500);
        }
    }
    /*=====  End of Sistema de Mensajeria  ======*/
    /*=====================================================================
    =            Metodo Obtener-Mis-Ventas-Usuario-Controlador            =
    =====================================================================*/
    obtenerMisVentas(id_usuario, request, response) {
        let sub = request.user.sub;
        if (id_usuario == sub) {
            return this.cliente.obtenerMisVentas(id_usuario);
        }
        else {
            return 500;
        }
    }
    /*=====  End of Metodo Obtener-Mis-Ventas-Usuario-Controlador  ======*/
    /*======================================================================
    =            Metodo Obtener-Mis-Compras-Usuario-Controlador            =
    ======================================================================*/
    obtenerMisCompras(id_usuario, request, response) {
        let sub = request.user.sub;
        if (id_usuario == sub) {
            return this.cliente.obtenerMisCompras(id_usuario);
        }
        else {
            return 500;
        }
    }
    /*=====  End of Metodo Obtener-Mis-Compras-Usuario-Controlador  ======*/
    /*==================================================================
    =            Metodo Eliminar-Cuenta-Usuario-Controlador            =
    ==================================================================*/
    eliminarCuenta(id_usuario, request, response) {
        let sub = request.user.sub;
        if (id_usuario == sub) {
            return this.cliente.eliminarCuenta(id_usuario);
        }
        else {
            return response.sendStatus(500);
        }
    }
};
__decorate([
    routing_controllers_1.Post("/Registrar"),
    __param(0, routing_controllers_2.Req()), __param(1, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registrar", null);
__decorate([
    routing_controllers_1.Post("/Iniciar-Sesion"),
    __param(0, routing_controllers_2.Req()), __param(1, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "iniciarSesion", null);
__decorate([
    routing_controllers_1.Put("/Actualizar/:id_usuario"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Param("id_usuario")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "actualizarUsuario", null);
__decorate([
    routing_controllers_1.Put("/Cambiar-Password/:id_usuario"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Param("id_usuario")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "cambiarContrase\u00F1a", null);
__decorate([
    routing_controllers_1.Post("/Agregar-Informacion-Envio/:id_usuario"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Param("id_usuario")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "agregarInformacionEnvio", null);
__decorate([
    routing_controllers_1.Get("/Obtener-Informacion-Envio/:id_usuario"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Param("id_usuario")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "obtenerInformacionEnvio", null);
__decorate([
    routing_controllers_1.Put("/Actualizar-Informacion-Envio/:id_usuario/:id_info"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Params()), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "actualizarInformacionEnvio", null);
__decorate([
    routing_controllers_1.Post("/Subir-Imagen/:id_usuario"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    routing_controllers_1.UseBefore(subirImagenes_1.upload),
    __param(0, routing_controllers_1.Param("id_usuario")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "subirImagen", null);
__decorate([
    routing_controllers_1.Get("/Obtener-Imagen/:imagen"),
    __param(0, routing_controllers_1.Param("imagen")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "obtenerImagen", null);
__decorate([
    routing_controllers_1.Get("/Obtener-Usuario/:id_usuario"),
    __param(0, routing_controllers_1.Param("id_usuario")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "obtenerUsuario", null);
__decorate([
    routing_controllers_1.Post("/Sistema-Mensajeria/:usuario1/:usuario2"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Params()), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "sistemaMensajeria", null);
__decorate([
    routing_controllers_1.Post("/Enviar-Mensaje/:id_usuario/:id_conversacion"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Params()), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "enviarMensaje", null);
__decorate([
    routing_controllers_1.Post("/Enviar-Archivos/:id_usuario/:id_conversacion"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    routing_controllers_1.UseBefore(subirArchivos_1.uploadFiles),
    __param(0, routing_controllers_1.Params()), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "enviarArchivos", null);
__decorate([
    routing_controllers_1.Get("/Obtener-Conversaciones/:id_usuario"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Param("id_usuario")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "obtenerConversaciones", null);
__decorate([
    routing_controllers_1.Get("/Obtener-Mis-Ventas/:id_usuario"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Param("id_usuario")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "obtenerMisVentas", null);
__decorate([
    routing_controllers_1.Get("/Obtener-Mis-Compras/:id_usuario"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Param("id_usuario")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "obtenerMisCompras", null);
__decorate([
    routing_controllers_1.Delete("/Eliminar-Cuenta/:id_usuario"),
    routing_controllers_1.UseBefore(autenticacion_1.Autenticacion),
    __param(0, routing_controllers_1.Param("id_usuario")), __param(1, routing_controllers_2.Req()), __param(2, routing_controllers_2.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "eliminarCuenta", null);
UserController = __decorate([
    routing_controllers_1.Controller("/Usuario"),
    __metadata("design:paramtypes", [])
], UserController);
exports.UserController = UserController;
