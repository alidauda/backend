import { Request, Response } from 'express';
import { db } from '../utils/db';
import { porductValidation } from '../utils/productValidation';

export const getProductsById = async (req: Request, res: Response) => {
  if (!req.query.id || !req.query.vendorName) {
    return res
      .status(400)
      .json({ message: 'product id or vendor id is required' });
  }
  const vendor = await db.vendor.findUnique({
    where: {
      name: req.query.vendorName as string,
    },
  });
  if (!vendor) {
    return res.status(404).json({ message: 'vendor not found' });
  }

  const product = await db.product.findUnique({
    where: {
      id: req.query.id as string,
      vendor: {
        name: vendor.name,
      },
    },
  });
  if (!product) {
    return res.status(404).json({ message: 'product not found' });
  }

  res.json({ product });
};

export const CreateProduct = async (req: Request, res: Response) => {
  if (!req.query.vendorId) {
    return res.status(400).json({ message: 'vendor id is required' });
  }
  if (!req.query.categoriesId) {
    return res.status(400).json({ message: 'categories id is required' });
  }
  porductValidation(req, res);

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
  const product = await db.product.create({
    data: {
      description: req.body.description,
      price: req.body.price,
      product_image: req.body.product_image,
      product_name: req.body.product_name,
      quantity: req.body.quantity,
      categories: {
        connect: {
          id: req.query.categoriesId as string,
        },
      },
      vendor: {
        connect: {
          id: req.query.vendorId as string,
        },
      },
    },
    include: {
      categories: true,
    },
  });
  res.json({ product });
};

export const getProductForAVendorbyId = async (req: Request, res: Response) => {
  if (!req.query.vendorName) {
    return res.status(400).json({ message: 'vendor name is required' });
  }
  try {
    const vendor = await db.vendor.findUnique({
      where: {
        name: req.query.vendorName as string,
      },
    });
    if (!vendor) {
      return res.status(404).json({ message: 'vendor not found' });
    }
    const product = await db.product.findMany({
      where: {
        vendorId: vendor.id,
      },
      include: {
        categories: true,
        reviews: true,
      },
    });
    res.json({ product });
  } catch {
    res.status(400).json({ message: 'something went wrong' });
  }
};
export const updateProductbyId = async (req: Request, res: Response) => {
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
      return res.status(404).json({ message: 'vendor not found' });
    }
    const product = await db.product.findUnique({
      where: {
        id: req.query.productId as string,
        vendorId: vendor.id,
      },
    });
    if (!product) {
      return res.status(404).json({ message: 'product not found' });
    }
    const updatedProduct = await db.product.update({
      where: {
        id: req.query.productId as string,
      },
      data: req.body,
    });
    res.json({ updatedProduct });
  } catch {
    res.status(400).json({ message: 'something went wrong' });
  }
};

export const deleteProductbyId = async (req: Request, res: Response) => {
  try {
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
    const product = await db.product.findUnique({
      where: {
        id: req.query.productId as string,
        vendorId: vendor.id,
      },
    });
    if (!product) {
      return res.status(404).json({ message: 'product not found' });
    }
    const deleteProduct = await db.product.delete({
      where: {
        id: req.query.productId as string,
        vendorId: vendor.id,
      },
    });
    res.json({ deleteProduct, message: 'nuked succefully' });
  } catch {
    res.status(400).json({ message: 'something went wrong' });
  }
};
