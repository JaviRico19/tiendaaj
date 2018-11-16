"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
//Controladores
//const usuario_controller_1 = require("./controllers/usuario.controller");
//const producto_controller_1 = require("./controllers/producto.controller");
/*=============================================================
=            Creacion y configuracion del servidor            =
=============================================================*/
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
//Configuracion de cabeceras cors 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//routing_controllers_1.useExpressServer(app, {
//    controllers: [usuario_controller_1.UserController, producto_controller_1.ProductoController]
//});
/*=========================================================================================
=            Conexion a la Base de Datos Tienda de MongoDb y Levantar Servidor            =
=========================================================================================*/
//mongoose_1.default.Promise = global.Promise;
//mongoose_1.default.connect('mongodb://127.0.0.1:27017/tienda')
 //   .then(() => {
    console.log('La conexion a la base de datos tienda a sido un exito');
    app.listen(3200, () => {
        console.log('El servidor se encuentra corriendo en el puerto 3200');
    });
//}, (err) => {
 //   console.log(err);
//});

/*=====  End of Conexion a la Base de Datos Tienda de MongoDb y Levantar Servidor  ======*/
/*=====  End of Creacion y configuracion del servidor  ======*/
