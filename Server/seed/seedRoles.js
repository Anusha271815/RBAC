const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const connectDB = require('../config/db');
const Role = require('../models/role');

const roles = [
  {
    name: 'admin',
    permissions: ['*']
  },
  {
    name: 'seller',
    permissions: [
      'CREATE_PRODUCT',
      'EDIT_PRODUCT',
      'DELETE_PRODUCT',
      'VIEW_ORDERS'
    ]
  },
  {
    name: 'buyer',
    permissions: [
      'VIEW_PRODUCTS',
      'PLACE_ORDER',
      'CANCEL_ORDER'
    ]
  }
];

const seedRoles = async () => {
  await Role.deleteMany({});
  await Role.insertMany(roles);
  console.log('Roles seeded successfully');
  process.exit();
};

seedRoles();