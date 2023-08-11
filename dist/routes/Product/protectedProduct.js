"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../../handlers/product");
const proctectedProduct = express_1.default.Router();
proctectedProduct.get('/allproducts', product_1.getProductForAVendorbyId);
proctectedProduct.get('/Product', product_1.getProductsByIdForVendor);
proctectedProduct.post('/products_create', product_1.CreateProduct);
proctectedProduct.put('/updateProduct', product_1.updateProductbyId);
proctectedProduct.delete('/deleteProduct', product_1.deleteProductbyId);
exports.default = proctectedProduct;
//# sourceMappingURL=protectedProduct.js.map