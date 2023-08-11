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
exports.deleteCategoryById = exports.updateCategoryById = exports.getCategoryById = exports.getVendorCategory = exports.createCategory = void 0;
const db_1 = require("../utils/db");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findVendor = yield db_1.db.vendor.findUnique({
        where: {
            id: req.body.vendor,
        },
    });
    if (!findVendor) {
        return res.status(400).json({
            message: 'vendor not found',
        });
    }
    const category = yield db_1.db.category.create({
        data: {
            name: req.body.name,
            vendor: {
                connect: {
                    id: req.body.vendorId,
                },
            },
        },
    });
    res.json({ category });
});
exports.createCategory = createCategory;
const getVendorCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findVendor = yield db_1.db.vendor.findUnique({
        where: {
            id: req.query.vendorId,
        },
    });
    if (!findVendor) {
        return res.status(400).json({
            message: 'vendor not found',
        });
    }
    const allCategory = yield db_1.db.category.findMany({
        where: {
            vendorId: req.query.vendorId,
        },
    });
    res.json({ allCategory });
});
exports.getVendorCategory = getVendorCategory;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findVendor = yield db_1.db.vendor.findUnique({
        where: {
            id: req.query.vendorId,
        },
    });
    if (!findVendor) {
        return res.status(400).json({
            message: 'vendor not found',
        });
    }
    const category = yield db_1.db.category.findUnique({
        where: {
            id: req.params.categoryId,
            vendorId: req.params.vendorId,
        },
    });
    res.json({ category });
});
exports.getCategoryById = getCategoryById;
const updateCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findVendor = yield db_1.db.vendor.findUnique({
        where: {
            id: req.query.vendorId,
        },
    });
    if (!findVendor) {
        return res.status(400).json({
            message: 'vendor not found',
        });
    }
    const findCategory = yield db_1.db.category.findUnique({
        where: {
            id: req.query.categoryId,
            vendorId: req.query.vendorId,
        },
    });
    if (!findCategory) {
        return res.status(400).json({
            message: 'category not found',
        });
    }
    const category = yield db_1.db.category.update({
        where: {
            id: req.query.categoryId,
            vendorId: req.query.vendorId,
        },
        data: req.body.category,
    });
    res.json({ category });
});
exports.updateCategoryById = updateCategoryById;
const deleteCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findVendor = yield db_1.db.vendor.findUnique({
        where: {
            id: req.query.vendorId,
        },
    });
    if (!findVendor) {
        return res.status(400).json({
            message: 'vendor not found',
        });
    }
    const findCategory = yield db_1.db.category.findUnique({
        where: {
            id: req.query.categoryId,
            vendorId: req.query.vendorId,
        },
    });
    if (!findCategory) {
        return res.status(400).json({
            message: 'category not found',
        });
    }
    const category = yield db_1.db.category.delete({
        where: {
            id: req.query.categoryId,
            vendorId: req.query.vendorId,
        },
    });
    res.json({ category });
});
exports.deleteCategoryById = deleteCategoryById;
//# sourceMappingURL=catgories.js.map