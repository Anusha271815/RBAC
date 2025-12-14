const express = require('express');
const router = express.Router();

const authenticateToken = require('../middlewares/auth');
const checkPermission = require('../middlewares/role');
const adminController = require('../controllers/admin_controller');

router.get(
  '/admin/users',
  authenticateToken,
  checkPermission('*'),
  adminController.getAllUsers
);

router.post(
  '/admin/roles',
  authenticateToken,
  checkPermission('*'),
  adminController.createRole
);

module.exports = router;
