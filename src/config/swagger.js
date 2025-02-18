const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'POS API Documentation',
      version: '1.0.0',
      description: 'API documentation for Point of Sale System',
      contact: {
        name: 'Your Name',
        email: 'your.email@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      }
    ],
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Users', description: 'User management' },
      { name: 'Branches', description: 'Branch management' },
      { name: 'Departments', description: 'Department management' },
      { name: 'WageTypes', description: 'Wage type management' },
      { name: 'UserTypes', description: 'User type management' },
      { name: 'Roles', description: 'Role management' },
      { name: 'UserRoles', description: 'User Role management' },
      { name: 'Permissions', description: 'Permission management' },
      { name: 'RolePermissions', description: 'Role Permission management' },
      { name: 'Orders', description: 'Order management' },
      { name: 'PaymentTypes', description: 'Payment type management' },
      { name: 'PaymentStatuses', description: 'Payment status management' },
      { name: 'OrderTypes', description: 'Order type management' },
      { name: 'OrderStatuses', description: 'Order status management' },
      { name: 'OrderDetails', description: 'Order detail management' },
      { name: 'VoucherCardDetails', description: 'Voucher card detail management' },
      { name: 'GiftCardDetails', description: 'Gift card detail management' },
      { name: 'MenuVersions', description: 'Menu version management' },
      { name: 'MenuGroups', description: 'Menu group management' },
      { name: 'Categories', description: 'Category management' },
      { name: 'GenModifires', description: 'General modifire management' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme. Enter Bearer [space] and then your token in the text input below.Example: Bearer 12345abcdef'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              example: 'Error message'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object'
            }
          }
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: [
    './src/routes/*.js',
    './src/models/*.js',
    './src/controllers/*.js'
  ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec; 