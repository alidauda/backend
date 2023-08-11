"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vendor_1 = require("../../handlers/vendor");
const unproctectedVendor = express_1.default.Router();
unproctectedVendor.get('/allvendors', vendor_1.getAllVendor);
unproctectedVendor.get('/vendor', vendor_1.getVendorById);
exports.default = unproctectedVendor;
//# sourceMappingURL=unprotectedVendor.js.map