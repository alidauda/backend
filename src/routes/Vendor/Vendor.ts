import express, { Request } from 'express';
import { db } from 'src/utils/db';
import { isUserAuthenticated } from '../authRouth';
import { VendorInput } from 'src/types/VendorInterFace';

const router = express.Router();
//create vendor
router.post(
  '/create',
  isUserAuthenticated,
  async (req: Request<{}, {}, VendorInput>, res) => {
    const newVendorData = req.body;

    try {
      const createdVendor = await db.vendor.create({
        data: newVendorData,
      });

      res.status(201).json(createdVendor);
    } catch (error) {
      res.status(500).json({ error: 'Error creating vendor' });
    }
  }
);

// Get all vendors
router.get('/vendors', async (req, res) => {
  try {
    const vendors = await db.vendor.findMany();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching vendors' });
  }
});

// Get a vendor by ID
router.get('/vendors/:id', async (req, res) => {
  const vendorId = req.params.id;

  try {
    const vendor = await db.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    return res.json(vendor);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching vendor' });
  }
});

// Update a vendor's information
router.put('/vendors/:id', async (req, res) => {
  const vendorId = req.params.id;
  const updatedVendorData = req.body;

  try {
    const updatedVendor = await db.vendor.update({
      where: { id: vendorId },
      data: updatedVendorData,
      // This will only update the fields provided in    the request
    });

    res.json(updatedVendor);
  } catch (error) {
    res.status(500).json({ error: 'Error updating vendor' });
  }
});

// Delete a vendor
router.delete('/vendors/:id', async (req, res) => {
  const vendorId = req.params.id;

  try {
    await db.vendor.delete({
      where: { id: vendorId },
    });

    res.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting vendor' });
  }
});
