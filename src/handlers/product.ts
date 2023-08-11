import { Request, Response } from 'express';
import { db } from '../utils/db';

export const getProductsById = async (req: Request, res: Response) => {
  const product = await db.product.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json({ product });
};
export const getProductsByIdForVendor = async (req: Request, res: Response) => {
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
      vendorId: req.query.vendorId as string,
    },
  });
  res.json({ product });
};
export const CreateProduct = async (req: Request, res: Response) => {
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
      categories: req.body.categories,
      vendor: {
        connect: {
          id: req.query.vendorId as string,
        },
      },
    },
  });
  res.json({ product });
};

export const getProductForAVendorbyId = async (req: Request, res: Response) => {
  const product = await db.product.findMany({
    where: {
      vendorId: req.query.vendorId as string,
    },
  });
  res.json({ product });
};
export const updateProductbyId = async (req: Request, res: Response) => {
  const product = await db.product.findUnique({
    where: {
      id: req.query.productId as string,
      vendorId: req.query.vendorId as string,
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
};

export const deleteProductbyId = async (req: Request, res: Response) => {
  const product = await db.product.findUnique({
    where: {
      id: req.query.productId as string,
      vendorId: req.query.vendorId as string,
    },
  });
  if (!product) {
    return res.status(404).json({ message: 'product not found' });
  }
  const deleteProduct = await db.product.delete({
    where: {
      id: req.query.productId as string,
      vendorId: req.query.vendorId as string,
    },
  });
  res.json({ deleteProduct });
};
