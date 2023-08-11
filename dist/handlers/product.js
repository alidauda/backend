"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductbyId = exports.updateProductbyId = exports.getProductForAVendorbyId = exports.CreateProduct = exports.getProductsByIdForVendor = exports.getProductsById = void 0;
const db_1 = require("../utils/db");
const getProductsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield db_1.db.product.findUnique({
        where: {
            id: req.params.id,
        },
    });
    res.json({ product });
});
exports.getProductsById = getProductsById;
const getProductsByIdForVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield db_1.db.vendor.findUnique({
        where: {
            id: req.query.vendorId,
        },
    });
    if (!vendor) {
        return res.status(404).json({ message: 'vendor not found' });
    }
    const product = yield db_1.db.product.findUnique({
        where: {
            id: req.query.productId,
            vendorId: req.query.vendorId,
        },
    });
    res.json({ product });
});
exports.getProductsByIdForVendor = getProductsByIdForVendor;
const CreateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield db_1.db.vendor.findUnique({
        where: {
            id: req.query.vendorId,
        },
    });
    if (!vendor) {
        return res.status(400).json({
            message: 'vendor not found',
        });
    }
    const product = yield db_1.db.product.create({
        data: {
            description: req.body.description,
            price: req.body.price,
            product_image: req.body.product_image,
            product_name: req.body.product_name,
            quantity: req.body.quantity,
            categories: req.body.categories,
            vendor: {
                connect: {
                    id: req.query.vendorId,
                },
            },
        },
    });
    res.json({ product });
});
exports.CreateProduct = CreateProduct;
const getProductForAVendorbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield db_1.db.product.findMany({
        where: {
            vendorId: req.query.vendorId,
        },
    });
    res.json({ product });
});
exports.getProductForAVendorbyId = getProductForAVendorbyId;
const updateProductbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield db_1.db.product.findUnique({
        where: {
            id: req.query.productId,
            vendorId: req.query.vendorId,
        },
    });
    if (!product) {
        return res.status(404).json({ message: 'product not found' });
    }
    const updatedProduct = yield db_1.db.product.update({
        where: {
            id: req.query.productId,
        },
        data: req.body,
    });
    res.json({ updatedProduct });
});
exports.updateProductbyId = updateProductbyId;
const deleteProductbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield db_1.db.product.findUnique({
        where: {
            id: req.query.productId,
            vendorId: req.query.vendorId,
        },
    });
    if (!product) {
        return res.status(404).json({ message: 'product not found' });
    }
    const deleteProduct = yield db_1.db.product.delete({
        where: {
            id: req.query.productId,
            vendorId: req.query.vendorId,
        },
    });
    res.json({ deleteProduct });
});
exports.deleteProductbyId = deleteProductbyId;
//# sourceMappingURL=product.js.map