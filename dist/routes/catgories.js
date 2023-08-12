"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catgories_1 = require("../handlers/catgories");
const protectedCatgories = express_1.default.Router();
protectedCatgories.get('/vendor/allcategories', catgories_1.getVendorCategory);
protectedCatgories.get('/vendor/categories', catgories_1.getCategoryById);
protectedCatgories.post('/vendor/create_categories', catgories_1.createCategory);
protectedCatgories.put('/vendor/update_categories', catgories_1.updateCategoryById);
protectedCatgories.delete('/vendor/delete_categories', catgories_1.deleteCategoryById);
exports.default = protectedCatgories;
//# sourceMappingURL=catgories.js.map