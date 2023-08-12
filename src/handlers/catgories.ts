import { Request, Response } from 'express';
import { db } from '../utils/db';

export const createCategory = async (req: Request, res: Response) => {
  if (!req.query.vendorId) {
    return res.status(400).json({ message: 'vendor id is required' });
  }
  if (!req.body.name || req.body.name <= 3) {
    return res.status(400).json({ message: 'name is required' });
  }
  try {
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
    const category = await db.category.create({
      data: {
        name: req.body.name,
        vendor: {
          connect: {
            id: findVendor.id,
          },
        },
      },
    });
    res.json({ category });
  } catch {
    res.status(501).json({ message: 'something went wrong' });
  }
};

export const getVendorCategory = async (req: Request, res: Response) => {
  if (!req.query.vendorId) {
    return res.status(400).json({ message: 'vendor id is required' });
  }
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
  if (!req.query.vendorName) {
    return res.status(400).json({ message: 'vendor name is required' });
  }
  if (!req.query.categoryId) {
    return res.status(400).json({ message: 'category id is required' });
  }
  try {
    const findVendor = await db.vendor.findUnique({
      where: {
        name: req.query.vendorName as string,
      },
    });
    if (!findVendor) {
      return res.status(400).json({
        message: 'vendor not found',
      });
    }
    const category = await db.category.findUnique({
      where: {
        id: req.query.categoryId as string,
        vendorId: findVendor.id,
      },
    });
    if (!category) {
      return res.status(400).json({
        message: 'category not found',
      });
    }
    res.json({ category });
  } catch {
    res.status(501).json({ message: 'something went wrong' });
  }
};

export const updateCategoryById = async (req: Request, res: Response) => {
  if (!req.query.vendorId) {
    return res.status(400).json({ message: 'vendor id is required' });
  }
  if (!req.query.categoryId) {
    return res.status(400).json({ message: 'category id is required' });
  }
  try {
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
        vendorId: findVendor.id,
      },
      data: req.body,
    });
    res.json({ category });
  } catch {
    res.status(501).json({ message: 'something went wrong' });
  }
};

export const deleteCategoryById = async (req: Request, res: Response) => {
  if (!req.query.vendorId) {
    return res.status(400).json({ message: 'vendor id is required' });
  }
  if (!req.query.categoryId) {
    return res.status(400).json({ message: 'category id is required' });
  }
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
  res.json({ category, message: 'category deleted' });
};
