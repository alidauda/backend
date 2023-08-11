import { Request, Response } from 'express';
import { db } from '../utils/db';

export const createCategory = async (req: Request, res: Response) => {
  const findVendor = await db.vendor.findUnique({
    where: {
      id: req.body.vendor,
    },
  });
  if (!findVendor) {
    return res.status(400).json({
      message: 'vendor not found',
    });
  }
  const category = await db.category.create({
    data: {
      name: req.body.name,
      vendor: {
        connect: {
          id: req.body.vendorId,
        },
      },
    },
  });
  res.json({ category });
};

export const getVendorCategory = async (req: Request, res: Response) => {
  const findVendor = await db.vendor.findUnique({
    where: {
      id: req.query.vendorId as string,
    },
  });
  if (!findVendor) {
    return res.status(400).json({
      message: 'vendor not found',
    });
  }
  const allCategory = await db.category.findMany({
    where: {
      vendorId: req.query.vendorId as string,
    },
  });
  res.json({ allCategory });
};
export const getCategoryById = async (req: Request, res: Response) => {
  const findVendor = await db.vendor.findUnique({
    where: {
      id: req.query.vendorId as string,
    },
  });
  if (!findVendor) {
    return res.status(400).json({
      message: 'vendor not found',
    });
  }
  const category = await db.category.findUnique({
    where: {
      id: req.params.categoryId,
      vendorId: req.params.vendorId,
    },
  });
  res.json({ category });
};

export const updateCategoryById = async (req: Request, res: Response) => {
  const findVendor = await db.vendor.findUnique({
    where: {
      id: req.query.vendorId as string,
    },
  });
  if (!findVendor) {
    return res.status(400).json({
      message: 'vendor not found',
    });
  }
  const findCategory = await db.category.findUnique({
    where: {
      id: req.query.categoryId as string,
      vendorId: req.query.vendorId as string,
    },
  });
  if (!findCategory) {
    return res.status(400).json({
      message: 'category not found',
    });
  }
  const category = await db.category.update({
    where: {
      id: req.query.categoryId as string,
      vendorId: req.query.vendorId as string,
    },
    data: req.body.category,
  });
  res.json({ category });
};

export const deleteCategoryById = async (req: Request, res: Response) => {
  const findVendor = await db.vendor.findUnique({
    where: {
      id: req.query.vendorId as string,
    },
  });
  if (!findVendor) {
    return res.status(400).json({
      message: 'vendor not found',
    });
  }
  const findCategory = await db.category.findUnique({
    where: {
      id: req.query.categoryId as string,
      vendorId: req.query.vendorId as string,
    },
  });
  if (!findCategory) {
    return res.status(400).json({
      message: 'category not found',
    });
  }
  const category = await db.category.delete({
    where: {
      id: req.query.categoryId as string,
      vendorId: req.query.vendorId as string,
    },
  });
  res.json({ category });
};
