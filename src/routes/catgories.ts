import express from 'express';
import {
  createCategory,
  deleteCategoryById,
  getCategoryById,
  getVendorCategory,
  updateCategoryById,
} from '../handlers/catgories';

const protectedCatgories = express.Router();
//get all categories
protectedCatgories.get('/vendor/allcategories', getVendorCategory);
protectedCatgories.get('/vendor/categories', getCategoryById);
// create categories
protectedCatgories.post('/vendor/create_categories', createCategory);

// update categories
protectedCatgories.put('/vendor/update_categories', updateCategoryById);

// delete categories
protectedCatgories.delete('/vendor/delete_categories', deleteCategoryById);

export default protectedCatgories;
