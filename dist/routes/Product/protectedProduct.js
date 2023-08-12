"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../../handlers/product");
const proctectedProduct = express_1.default.Router();
proctectedProduct.get('/vendor/allproducts', product_1.getProductForAVendorbyId);
proctectedProduct.get('/vendor/Product', product_1.getProductsById);
proctectedProduct.post('/vendor/products_create', product_1.CreateProduct);
proctectedProduct.put('/vendor/updateProduct', product_1.updateProductbyId);
proctectedProduct.delete('/vendor/deleteProduct', product_1.deleteProductbyId);
exports.default = proctectedProduct;
//# sourceMappingURL=protectedProduct.js.map