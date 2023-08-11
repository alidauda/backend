"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catgories_1 = require("../handlers/catgories");
const protectedCatgories = express_1.default.Router();
protectedCatgories.get('/allcategories', catgories_1.getVendorCategory);
protectedCatgories.post('/create_categories', catgories_1.createCategory);
protectedCatgories.put('/update_categories', catgories_1.updateCategoryById);
protectedCatgories.delete('/delete_categories', catgories_1.deleteCategoryById);
exports.default = protectedCatgories;
//# sourceMappingURL=catgories.js.map