const express = require('express');
const { v4: uuidv4 } = require('uuid');
const products = require('./models/products');
const { authenticate, validateProduct } = require('./middleware');
const {
  NotFoundError,
  ValidationError,
  AuthenticationError,
  ForbiddenError,
  BadRequestError
} = require('./utils/errors');

const router = express.Router();

// GET all products with filtering, pagination, and search
router.get('/products', (req, res, next) => {
  let result = [...products];

  // Filtering by category
  if (req.query.category) {
    result = result.filter(p => p.category === req.query.category);
  }

  // Search by name (case-insensitive)
  if (req.query.search) {
    const search = req.query.search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(search));
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || result.length;
  if (page < 1 || limit < 1) {
    return next(new BadRequestError('Page and limit must be positive integers'));
  }
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = result.slice(start, end);

  res.json({
    total: result.length,
    page,
    limit,
    products: paginated
  });
});

// GET product statistics
router.get('/products/stats', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json({ countByCategory: stats, total: products.length });
});

// GET product by ID
router.get('/products/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return next(new NotFoundError('Product not found'));
  }
  res.json(product);
});

// POST create new product
router.post('/products', authenticate, validateProduct, (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = {
      id: uuidv4(),
      name,
      description,
      price,
      category,
      inStock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(new ValidationError('Invalid product data'));
  }
});

// PUT update product
router.put('/products/:id', authenticate, validateProduct, (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return next(new NotFoundError('Product not found'));
  }
  const { name, description, price, category, inStock } = req.body;
  product.name = name;
  product.description = description;
  product.price = price;
  product.category = category;
  product.inStock = inStock;
  res.json(product);
});

// DELETE product
router.delete('/products/:id', authenticate, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return next(new NotFoundError('Product not found'));
  }
  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', product: deleted[0] });
});

// GET product statistics
router.get('/products/stats', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json({ countByCategory: stats, total: products.length });
});

module.exports = router;