"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_1 = require("../handlers/cart");
const proctectedCart = express_1.default.Router();
proctectedCart.post('/create_cart', cart_1.addToCart);
proctectedCart.post('/update_cart', cart_1.addToCart);
proctectedCart.delete('/delete_cart', cart_1.deleteCart);
proctectedCart.get('/get_cart', cart_1.getCart);
exports.default = proctectedCart;
//# sourceMappingURL=cart.js.map