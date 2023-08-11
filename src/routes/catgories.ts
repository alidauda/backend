import express from 'express';
import {
  createCategory,
  deleteCategoryById,
  getVendorCategory,
  updateCategoryById,
} from '../handlers/catgories';

const protectedCatgories = express.Router();
//get all categories
protectedCatgories.get('/allcategories', getVendorCategory);
// create categories
protectedCatgories.post('/create_categories', createCategory);

// update categories
protectedCatgories.put('/update_categories', updateCategoryById);

// delete categories
protectedCatgories.delete('/delete_categories', deleteCategoryById);

export default protectedCatgories;
