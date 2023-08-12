import express from 'express';
import {
  CreateProduct,
  deleteProductbyId,
  getProductForAVendorbyId,
  getProductsById,
  updateProductbyId,
} from '../../handlers/product';

// custom.d.ts (or any other .d.ts file in your project)

const proctectedProduct = express.Router();

// Get all products
proctectedProduct.get('/vendor/allproducts', getProductForAVendorbyId);
// Get all products for a vendor

// Get a product by ID
proctectedProduct.get('/vendor/Product', getProductsById);

// Create a new product
proctectedProduct.post('/vendor/products_create', CreateProduct);

// Update a product
proctectedProduct.put('/vendor/updateProduct', updateProductbyId);

// Delete a product
proctectedProduct.delete('/vendor/deleteProduct', deleteProductbyId);

export default proctectedProduct;
