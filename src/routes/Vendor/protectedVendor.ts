import express from 'express';
import { createVendor, updateVendorById } from '../../handlers/vendor';

const proctectedVendor = express.Router();
//create vendor
proctectedVendor.post('/create_vendor', createVendor);

// Update a vendor's information
proctectedVendor.put('/update_vendor', updateVendorById);

export default proctectedVendor;
