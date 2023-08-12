import express from 'express';
import {
  createVendor,
  createVendorStaff,
  deleteVendorStaff,
  disableVendorStaff,
  getAllVendorStaff,
  updateVendorById,
} from '../../handlers/vendor';

const proctectedVendor = express.Router();
//get
proctectedVendor.get('/vendor/get_staff', getAllVendorStaff);

//create vendor
proctectedVendor.post('/create_vendor', createVendor);
proctectedVendor.post('/vendor/create_staff', createVendorStaff);

// Update a vendor's information
proctectedVendor.put('/update_vendor', updateVendorById);
proctectedVendor.put('/vendor/disable_staff', disableVendorStaff);

//delete
proctectedVendor.delete('/vendor/delete_staff', deleteVendorStaff);

export default proctectedVendor;
