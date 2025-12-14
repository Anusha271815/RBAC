const express = require('express');
const router = express.Router();

const authenticateToken = require('../middlewares/auth');
const checkPermission = require('../middlewares/role');
const orderController = require('../controllers/order_controller');

router.post(
  '/orders',
  authenticateToken,
  checkPermission('PLACE_ORDER'),
  orderController.placeOrder
);

router.delete(
  '/orders/:id',
  authenticateToken,
  checkPermission('CANCEL_ORDER'),
  orderController.cancelOrder
);

router.get(
  '/orders',
  authenticateToken,
  checkPermission('VIEW_ORDERS'),
  orderController.getOrders
);

module.exports = router;
