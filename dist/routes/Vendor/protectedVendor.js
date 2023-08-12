"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vendor_1 = require("../../handlers/vendor");
const proctectedVendor = express_1.default.Router();
proctectedVendor.get('/vendor/get_staff', vendor_1.getAllVendorStaff);
proctectedVendor.post('/create_vendor', vendor_1.createVendor);
proctectedVendor.post('/vendor/create_staff', vendor_1.createVendorStaff);
proctectedVendor.put('/update_vendor', vendor_1.updateVendorById);
proctectedVendor.put('/vendor/disable_staff', vendor_1.disableVendorStaff);
proctectedVendor.delete('/vendor/delete_staff', vendor_1.deleteVendorStaff);
exports.default = proctectedVendor;
//# sourceMappingURL=protectedVendor.js.map