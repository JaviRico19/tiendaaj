"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
class payPal {
    constructor() {
    }
    configuracion() {
        paypal_rest_sdk_1.default.configure({
            mode: 'sandbox',
            client_id: 'AfdeCm96lLi5rnhYOlHvziatw9XtsYicuSrXmavMowE1JP8PiVKi_-Rr6PMTBAmGlPSVI3jjOzIPIEFj',
            client_secret: 'EApZjrshVGuMnJpy6CM1vcHyujl4577GSBJiAelmqYrj2svTmVMSPBXUEvSI1ubCY8aOBggDD36PxNN_'
        });
        return paypal_rest_sdk_1.default;
    }
}
exports.payPal = payPal;
