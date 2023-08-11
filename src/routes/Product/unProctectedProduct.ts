import express from 'express';
import { getProductForAVendorbyId } from '../../handlers/product';

// custom.d.ts (or any other .d.ts file in your project)

const unproctectedProduct = express.Router();

unproctectedProduct.get('/vendorProducts', getProductForAVendorbyId);

export default unproctectedProduct;
