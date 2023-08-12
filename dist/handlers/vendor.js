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
exports.deleteVendorStaff = exports.disableVendorStaff = exports.getAllVendorStaff = exports.createVendorStaff = exports.updateVendorById = exports.getVendorById = exports.getAllVendor = exports.createVendor = void 0;
const db_1 = require("../utils/db");
const createVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const vendor = yield db_1.db.vendor.create({
            data: req.body,
        });
        res.json({ vendor });
    }
    catch (err) {
        res.status(400).json({ message: 'name already exist ' });
    }
});
exports.createVendor = createVendor;
const getAllVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield db_1.db.vendor.findMany();
    res.json({ vendor });
});
exports.getAllVendor = getAllVendor;
const getVendorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    res.json({ vendor });
});
exports.getVendorById = getVendorById;
const updateVendorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.vendorId) {
        return res.status(400).json({ message: 'vendor id is required' });
    }
    const findVendor = yield db_1.db.vendor.findUnique({
        where: {
            id: req.query.vendorId,
        },
    });
    if (!findVendor) {
        return res.status(404).json({ message: 'vendor not found' });
    }
    const vendor = yield db_1.db.vendor.update({
        where: {
            id: req.query.vendorId,
        },
        data: req.body,
    });
    res.json({ vendor });
});
exports.updateVendorById = updateVendorById;
const createVendorStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            return res.status(400).json({
                message: 'vendor not found',
            });
        }
        const findUser = yield db_1.db.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if (!findUser) {
            return res.status(400).json({
                message: 'user not found',
            });
        }
        const vendorStaff = yield db_1.db.vendor_staff.create({
            data: {
                account_status: req.body.account_status,
                user: {
                    connect: {
                        id: findUser.id,
                    },
                },
                vendor: {
                    connect: {
                        id: vendor.id,
                    },
                },
            },
        });
        res.json({ vendorStaff });
    }
    catch (_a) {
        res.status(500).json({
            message: 'soemthing went wrong',
        });
    }
});
exports.createVendorStaff = createVendorStaff;
const getAllVendorStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.vendorId) {
        return res.status(400).json({ message: 'vendor id is required' });
    }
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
    const vendorStaff = yield db_1.db.vendor_staff.findMany({
        where: {
            vendorId: req.query.vendorId,
        },
    });
    res.json({ vendorStaff });
});
exports.getAllVendorStaff = getAllVendorStaff;
const disableVendorStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.vendorId) {
        return res.status(400).json({ message: 'vendor id is required' });
    }
    if (!req.query.staffId) {
        return res.status(400).json({ message: 'staff id is required' });
    }
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
    const findVendorStaff = yield db_1.db.vendor_staff.findUnique({
        where: {
            id: req.query.staffId,
            vendorId: req.query.vendorId,
        },
    });
    if (!findVendorStaff) {
        return res.status(400).json({
            message: 'vendor staff not found',
        });
    }
    const vendorStaff = yield db_1.db.vendor_staff.update({
        where: {
            id: req.query.staffId,
            vendorId: req.query.vendorId,
        },
        data: {
            account_status: req.body.account_status,
        },
    });
    res.json({ vendorStaff });
});
exports.disableVendorStaff = disableVendorStaff;
const deleteVendorStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.vendorId) {
        return res.status(400).json({ message: 'vendor id is required' });
    }
    if (!req.query.staffId) {
        return res.status(400).json({ message: 'staff id is required' });
    }
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
    const findVendorStaff = yield db_1.db.vendor_staff.findUnique({
        where: {
            id: req.query.staffId,
            vendorId: req.query.vendorId,
        },
    });
    if (!findVendorStaff) {
        return res.status(400).json({
            message: 'vendor staff not found',
        });
    }
    const vendorStaff = yield db_1.db.vendor_staff.delete({
        where: {
            id: req.query.staffId,
            vendorId: req.query.vendorId,
        },
    });
    res.json({ vendorStaff, message: 'vendor staff deleted' });
});
exports.deleteVendorStaff = deleteVendorStaff;
//# sourceMappingURL=vendor.js.map