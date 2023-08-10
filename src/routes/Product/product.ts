import express, { Request } from 'express';
import { CreateProductInput } from 'src/types/ProductInterface';
import { ISession } from 'src/types/express';
//databse helper which is prisma
import { db } from 'src/utils/db';
import { isVendorAuthenticated } from '../authRouth';

// custom.d.ts (or any other .d.ts file in your project)

const router = express.Router();

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await db.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Get all products for a vendor
router.get('/products', async (req, res) => {
  try {
    const products = await db.product.findMany({
      where: {
        vendorId: (req.session as ISession).vendor_id,
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Get a product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new product
router.post(
  '/products_create',
  isVendorAuthenticated,
  async (req: Request<{}, {}, CreateProductInput>, res) => {
    const { description, image_url, name, price, catgergory_id } = req.body;
    const vendor_id = (req.session as ISession).vendor_id;
    try {
      const newProduct = await db.product.create({
        data: {
          product_name: name,
          price,
          product_image: image_url,
          description,
          quantity: 1,
          vendor: {
            connect: {
              id: vendor_id,
            },
          },
          categories: {
            connect: {
              id: catgergory_id,
            },
          },
        },
      });

      res.json(newProduct);
    } catch (error) {
      res.status(400).json({ error: 'Bad request' });
    }
  }
);

// Update a product
router.put('/products/:id', isVendorAuthenticated, async (req, res) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const updatedProduct = await db.product.update({
      where: {
        id: req.params.id,
      },
      data: {},
    });
    return res.json(updatedProduct);
  } catch (error) {
    return res.status(400).json({ error: 'Bad request' });
  }
});

// Delete a product
router.delete('/products/:id', isVendorAuthenticated, async (req, res) => {
  try {
    const product = await db.product.findUnique({
      where: { id: req.params.id },
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await db.product.delete({ where: { id: req.params.id } });
    return res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
