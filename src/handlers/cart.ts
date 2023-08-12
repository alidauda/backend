import { Request, Response } from 'express';

import { db } from '../utils/db';
export const addToCart = async (req: Request, res: Response) => {
  const cartItem = await db.cartItem.findUnique({
    where: {
      productId: req.body.productId,

      cart: {
        userId: req.user.id,
      },
    },
  });
  if (cartItem) {
    const cartItemToUpdate = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: cartItem.quantity + 1,
      },
    });
    return res.json({ cartItem: cartItemToUpdate });
  }
  const cartItemToCreate = await db.cartItem.create({
    data: {
      quantity: 1,
      product: {
        connect: {
          id: req.body.productId,
        },
      },
      cart: {
        connect: {
          userId: req.query.userId as string,
        },
      },
    },
  });
  res.json({ cartItem: cartItemToCreate });
};

export const getCart = async (req: Request, res: Response) => {
  const cart = await db.cart.findUnique({
    where: {
      userId: req.params.userId,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });
  res.json({ cart });
};

export const deleteCart = async (req: Request, res: Response) => {
  const findUser = await db.user.findUnique({
    where: {
      id: req.params.userId,
    },
  });
  if (!findUser) {
    return res.status(400).json({
      message: 'user not found',
    });
  }
  const cart = await db.cartItem.findUnique({
    where: {
      id: req.params.cartId,
    },
  });
  if (!cart) {
    return res.status(400).json({
      message: 'cart not found',
    });
  }
  const deleteCart = await db.cartItem.delete({
    where: {
      id: req.params.cartId,
    },
  });
  res.json({ deleteCart });
};
