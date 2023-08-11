import express from 'express';
import {
  CreateProduct,
  deleteProductbyId,
  getProductForAVendorbyId,
  getProductsByIdForVendor,
  updateProductbyId,
} from '../../handlers/product';

// custom.d.ts (or any other .d.ts file in your project)

const proctectedProduct = express.Router();

// Get all products
proctectedProduct.get('/allproducts', getProductForAVendorbyId);
// Get all products for a vendor

// Get a product by ID
proctectedProduct.get('/Product', getProductsByIdForVendor);

// Create a new product
proctectedProduct.post('/products_create', CreateProduct);

// Update a product
proctectedProduct.put('/updateProduct', updateProductbyId);

// Delete a product
proctectedProduct.delete('/deleteProduct', deleteProductbyId);

export default proctectedProduct;
