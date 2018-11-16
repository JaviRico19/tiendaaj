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
            client_id: 'AYZTgA0pYlLLCzqG0R9cswWdYLdFFBlhFU6u9pRhQ0WCmnKZDDCmh6I8YiUEEH-O10NZkcYniR_tAqya',
            client_secret: 'ELfWzlGQB4bYRQwtZ0Cp48paJMouB71nt96TWMzY7mQWnhfKoKGcUeFSN9A7JxfFWWXItITnbYFL-Bhe'
        });
        return paypal_rest_sdk_1.default;
    }
}
exports.payPal = payPal;
