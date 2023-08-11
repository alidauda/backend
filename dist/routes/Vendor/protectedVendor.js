"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vendor_1 = require("../../handlers/vendor");
const proctectedVendor = express_1.default.Router();
proctectedVendor.post('/create_vendor', vendor_1.createVendor);
proctectedVendor.put('/update_vendor', vendor_1.updateVendorById);
exports.default = proctectedVendor;
//# sourceMappingURL=protectedVendor.js.map