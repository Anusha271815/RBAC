const express = require('express');
const router = express.Router();

const authenticateToken = require('../middlewares/auth');
const checkPermission = require('../middlewares/role');
const productController = require('../controllers/product_controller');

router.get('/products',
  authenticateToken,
  checkPermission('VIEW_PRODUCTS'),
  productController.getProducts
);

router.post('/products',
  authenticateToken,
  checkPermission('CREATE_PRODUCT'),
  productController.createProduct
);

router.put('/products/:id',
  authenticateToken,
  checkPermission('EDIT_PRODUCT'),
  productController.updateProduct
);

router.delete('/products/:id',
  authenticateToken,
  checkPermission('DELETE_PRODUCT'),
  productController.deleteProduct
);

module.exports = router;

