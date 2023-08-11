import express from 'express';
import { getAllVendor, getVendorById } from '../../handlers/vendor';

const unproctectedVendor = express.Router();

// Get all vendors
unproctectedVendor.get('/allvendors', getAllVendor);

// Get a vendor by ID
unproctectedVendor.get('/vendor', getVendorById);

export default unproctectedVendor;
