import { Request, Response } from 'express';
import { db } from '../utils/db';

export const createVendor = (req: Request, res: Response) => {
  const vendor = db.vendor.create({
    data: req.body,
  });
  res.json({ vendor });
};

export const getAllVendor = (req: Request, res: Response) => {
  const vendor = db.vendor.findMany();
  res.json({ vendor });
};

export const getVendorById = async (req: Request, res: Response) => {
  const vendor = await db.vendor.findUnique({
    where: {
      id: req.query.vendorId as string,
    },
  });
  res.json({ vendor });
};

export const updateVendorById = async (req: Request, res: Response) => {
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
  const vendor = await db.vendor.findUnique({
    where: {
      id: req.body.vendor,
    },
  });
  if (!vendor) {
    return res.status(400).json({
      message: 'vendor not found',
    });
  }
  const findUser = await db.user.findUnique({
    where: {
      id: req.body.id,
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
          id: req.body.id,
        },
      },
      vendor: {
        connect: {
          id: req.body.vendorId,
        },
      },
    },
  });
  res.json({ vendorStaff });
};

export const getAllVendorStaff = async (req: Request, res: Response) => {
  const vendor = await db.vendor.findUnique({
    where: {
      id: req.params.vendorId,
    },
  });
  if (!vendor) {
    return res.status(400).json({
      message: 'vendor not found',
    });
  }
  const vendorStaff = await db.vendor_staff.findMany({
    where: {
      vendorId: req.params.vendorId,
    },
  });
  res.json({ vendorStaff });
};
export const disableVendorStaff = async (req: Request, res: Response) => {
  const vendor = await db.vendor.findUnique({
    where: {
      id: req.params.vendorId,
    },
  });
  if (!vendor) {
    return res.status(400).json({
      message: 'vendor not found',
    });
  }
  const findVendorStaff = await db.vendor_staff.findUnique({
    where: {
      id: req.params.vendorStaffId,
      vendorId: req.params.vendorId,
    },
  });
  if (!findVendorStaff) {
    return res.status(400).json({
      message: 'vendor staff not found',
    });
  }
  const vendorStaff = await db.vendor_staff.update({
    where: {
      id: req.params.vendorStaffId,
      vendorId: req.params.vendorId,
    },
    data: {
      account_status: req.body.account_status,
    },
  });
  res.json({ vendorStaff });
};

export const deleteVendorStaff = async (req: Request, res: Response) => {
  const vendor = await db.vendor.findUnique({
    where: {
      id: req.params.vendorId,
    },
  });
  if (!vendor) {
    return res.status(400).json({
      message: 'vendor not found',
    });
  }
  const findVendorStaff = await db.vendor_staff.findUnique({
    where: {
      id: req.params.vendorStaffId,
      vendorId: req.params.vendorId,
    },
  });
  if (!findVendorStaff) {
    return res.status(400).json({
      message: 'vendor staff not found',
    });
  }
  const vendorStaff = await db.vendor_staff.delete({
    where: {
      id: req.params.vendorStaffId,
      vendorId: req.params.vendorId,
    },
  });
  res.json({ vendorStaff });
};
