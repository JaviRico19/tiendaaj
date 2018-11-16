"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const moment_1 = __importDefault(require("moment"));
class Autenticacion {
    use(request, response, next) {
        const secret = 'key-secret';
        if (!request.headers.authorization) {
            return response.sendStatus(404).send({ message: 'La peticion no tiene la cabezera de autenticacion' });
        }
        else {
            let token = request.headers.authorization;
            let payload = jwt_simple_1.default.decode(token, secret);
            try {
                if (payload.exp <= moment_1.default().unix()) {
                    return response.sendStatus(401).send({ message: 'El token a expirado' });
                }
            }
            catch (ex) {
                console.log('Catch');
                return response.sendStatus(404).send({ message: 'El token no es valido' });
            }
            request.user = payload;
            next();
        }
    }
}
exports.Autenticacion = Autenticacion;
