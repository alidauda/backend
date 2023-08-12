import { Request, Response } from 'express';
import { db } from '../utils/db';

export const createVendor = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const vendor = await db.vendor.create({
      data: req.body,
    });
    res.json({ vendor });
  } catch (err) {
    res.status(400).json({ message: 'name already exist ' });
  }
};

export const getAllVendor = async (req: Request, res: Response) => {
  const vendor = await db.vendor.findMany();
  res.json({ vendor });
};

export const getVendorById = async (req: Request, res: Response) => {
  if (!req.query.vendorId) {
    return res.status(400).json({ message: 'vendor id is required' });
  }
  const vendor = await db.vendor.findUnique({
    where: {
      id: req.query.vendorId as string,
    },
  });
  if (!vendor) {
    return res.status(404).json({ message: 'vendor not found' });
  }
  res.json({ vendor });
};

export const updateVendorById = async (req: Request, res: Response) => {
  if (!req.query.vendorId!) {
    return res.status(400).json({ message: 'vendor id is required' });
  }
  const findVendor = await db.vendor.findUnique({
    where: {
      id: req.query.vendorId as string,
    },
  });
  if (!findVendor) {
    return res.status(404).json({ message: 'vendor not found' });
  }
  const vendor = await db.vendor.update({
    where: {
      id: req.query.vendorId as string,
    },
    data: req.body,
  });

  res.json({ vendor });
};

export const createVendorStaff = async (req: Request, res: Response) => {
  if (!req.query.vendorId) {
    return res.status(400).json({ message: 'vendor id is required' });
  }
  try {
    const vendor = await db.vendor.findUnique({
      where: {
        id: req.query.vendorId as string,
      },
    });
    if (!vendor) {
      return res.status(400).json({
        message: 'vendor not found',
      });
    }
    const findUser = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!findUser) {
      return res.status(400).json({
        message: 'user not found',
      });
    }
    const vendorStaff = await db.vendor_staff.create({
      data: {
        account_status: req.body.account_status,
        user: {
          connect: {
            id: findUser.id,
          },
        },
        vendor: {
          connect: {
            id: vendor.id,
          },
        },
      },
    });
    res.json({ vendorStaff });
  } catch {
    res.status(500).json({
      message: 'soemthing went wrong',
    });
  }
};

export const getAllVendorStaff = async (req: Request, res: Response) => {
  if (!req.query.vendorId) {
    return res.status(400).json({ message: 'vendor id is required' });
  }
  const vendor = await db.vendor.findUnique({
    where: {
      id: req.query.vendorId as string,
    },
  });
  if (!vendor) {
    return res.status(400).json({
      message: 'vendor not found',
    });
  }
  const vendorStaff = await db.vendor_staff.findMany({
    where: {
      vendorId: req.query.vendorId as string,
    },
  });
  res.json({ vendorStaff });
};
export const disableVendorStaff = async (req: Request, res: Response) => {
  if (!req.query.vendorId) {
    return res.status(400).json({ message: 'vendor id is required' });
  }
  if (!req.query.staffId) {
    return res.status(400).json({ message: 'staff id is required' });
  }

  const vendor = await db.vendor.findUnique({
    where: {
      id: req.query.vendorId as string,
    },
  });
  if (!vendor) {
    return res.status(400).json({
      message: 'vendor not found',
    });
  }
  const findVendorStaff = await db.vendor_staff.findUnique({
    where: {
      id: req.query.staffId as string,
      vendorId: req.query.vendorId as string,
    },
  });
  if (!findVendorStaff) {
    return res.status(400).json({
      message: 'vendor staff not found',
    });
  }
  const vendorStaff = await db.vendor_staff.update({
    where: {
      id: req.query.staffId as string,
      vendorId: req.query.vendorId as string,
    },
    data: {
      account_status: req.body.account_status,
    },
  });
  res.json({ vendorStaff });
};

export const deleteVendorStaff = async (req: Request, res: Response) => {
  if (!req.query.vendorId) {
    return res.status(400).json({ message: 'vendor id is required' });
  }
  if (!req.query.staffId) {
    return res.status(400).json({ message: 'staff id is required' });
  }
  const vendor = await db.vendor.findUnique({
    where: {
      id: req.query.vendorId as string,
    },
  });
  if (!vendor) {
    return res.status(400).json({
      message: 'vendor not found',
    });
  }
  const findVendorStaff = await db.vendor_staff.findUnique({
    where: {
      id: req.query.staffId as string,
      vendorId: req.query.vendorId as string,
    },
  });
  if (!findVendorStaff) {
    return res.status(400).json({
      message: 'vendor staff not found',
    });
  }
  const vendorStaff = await db.vendor_staff.delete({
    where: {
      id: req.query.staffId as string,
      vendorId: req.query.vendorId as string,
    },
  });
  res.json({ vendorStaff, message: 'vendor staff deleted' });
};
