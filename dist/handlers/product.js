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
exports.deleteProductbyId = exports.updateProductbyId = exports.getProductForAVendorbyId = exports.CreateProduct = exports.getProductsById = void 0;
const db_1 = require("../utils/db");
const productValidation_1 = require("../utils/productValidation");
const getProductsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.id || !req.query.vendorName) {
        return res
            .status(400)
            .json({ message: 'product id or vendor id is required' });
    }
    const vendor = yield db_1.db.vendor.findUnique({
        where: {
            name: req.query.vendorName,
        },
    });
    if (!vendor) {
        return res.status(404).json({ message: 'vendor not found' });
    }
    const product = yield db_1.db.product.findUnique({
        where: {
            id: req.query.id,
            vendor: {
                name: vendor.name,
            },
        },
    });
    if (!product) {
        return res.status(404).json({ message: 'product not found' });
    }
    res.json({ product });
});
exports.getProductsById = getProductsById;
const CreateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.vendorId) {
        return res.status(400).json({ message: 'vendor id is required' });
    }
    if (!req.query.categoriesId) {
        return res.status(400).json({ message: 'categories id is required' });
    }
    (0, productValidation_1.porductValidation)(req, res);
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
            categories: {
                connect: {
                    id: req.query.categoriesId,
                },
            },
            vendor: {
                connect: {
                    id: req.query.vendorId,
                },
            },
        },
        include: {
            categories: true,
        },
    });
    res.json({ product });
});
exports.CreateProduct = CreateProduct;
const getProductForAVendorbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.vendorName) {
        return res.status(400).json({ message: 'vendor name is required' });
    }
    try {
        const vendor = yield db_1.db.vendor.findUnique({
            where: {
                name: req.query.vendorName,
            },
        });
        if (!vendor) {
            return res.status(404).json({ message: 'vendor not found' });
        }
        const product = yield db_1.db.product.findMany({
            where: {
                vendorId: vendor.id,
            },
            include: {
                categories: true,
                reviews: true,
            },
        });
        res.json({ product });
    }
    catch (_a) {
        res.status(400).json({ message: 'something went wrong' });
    }
});
exports.getProductForAVendorbyId = getProductForAVendorbyId;
const updateProductbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.vendorId) {
        return res.status(400).json({ message: 'vendor id is required' });
    }
    try {
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
                vendorId: vendor.id,
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
    }
    catch (_b) {
        res.status(400).json({ message: 'something went wrong' });
    }
});
exports.updateProductbyId = updateProductbyId;
const deleteProductbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.vendorId) {
            return res.status(400).json({ message: 'vendor id is required' });
        }
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
                vendorId: vendor.id,
            },
        });
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }
        const deleteProduct = yield db_1.db.product.delete({
            where: {
                id: req.query.productId,
                vendorId: vendor.id,
            },
        });
        res.json({ deleteProduct, message: 'nuked succefully' });
    }
    catch (_c) {
        res.status(400).json({ message: 'something went wrong' });
    }
});
exports.deleteProductbyId = deleteProductbyId;
//# sourceMappingURL=product.js.map