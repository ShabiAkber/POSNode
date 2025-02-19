const swaggerJsdoc = require('swagger-jsdoc');
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Helper function to convert Sequelize data types to Swagger types
function getSwaggerType(sequelizeType) {
  if (!sequelizeType) return 'string';
  
  const type = sequelizeType.key || sequelizeType.constructor.key;
  switch (type) {
    case 'STRING':
    case 'TEXT':
    case 'UUID':
    case 'DATE':
      return 'string';
    case 'INTEGER':
    case 'BIGINT':
      return 'integer';
    case 'FLOAT':
    case 'DOUBLE':
    case 'DECIMAL':
      return 'number';
    case 'BOOLEAN':
      return 'boolean';
    default:
      return 'string';
  }
}

// Generate tags from controller files
function generateTags() {
  const controllerMappings = {
    'Auth': 'Authentication endpoints',
    'Branch': 'Branch management',
    'CashRegister': 'Cash Register management',
    'CashTransaction': 'Cash Transaction management',
    'Category': 'Category management',
    'Department': 'Department management',
    'GenAddon': 'General Addon management',
    'GenModifire': 'General Modifiers management',
    'Inventory': 'Inventory management',
    'GiftCardDetail': 'Gift Card Detail management',
    'KitchenSection': 'Kitchen Section management',
    'KitWiseCat': 'Kit Wise Category management',
    'Order': 'Order management',
    'OrderDetail': 'Order detail management',
    'OrderStatus': 'Order status management',
    'OrderType': 'Order type management',
    'PaymentStatus': 'Payment status management',
    'PaymentType': 'Payment type management',
    'Permission': 'Permission management',
    'Role': 'Role management',
    'RolePermission': 'Role Permission management',
    'User': 'User management',
    'UserRole': 'User Role management',
    'UserType': 'User type management',
    'WageType': 'Wage type management',
    
  };

  return Object.entries(controllerMappings).map(([name, description]) => ({
    name,
    description
  }));
}

// Generate API paths from controllers
function generateApiPaths() {
  const paths = {};
  const controllersPath = path.join(__dirname, '../controllers');
  
  // Map controller names to their expected file names
  const controllerMappings = {
    'Auth': 'AuthController.js',
    'Branch': 'BranchController.js',
    'CashRegister': 'CashRegisterController.js',
    'CashTransaction': 'CashTransactionController.js',
    'Category': 'CategoryController.js',
    'Department': 'DepartmentController.js',
    'GenAddon': 'GenAddonController.js',
    'GenModifire': 'GenModifireController.js',
    'GiftCardDetail': 'GiftCardDetailController.js',
    'Inventory': 'InventoriesController.js',
    'KitchenSection': 'KitchenSectionController.js',
    'KitWiseCat': 'KitWiseCatController.js',
    'Order': 'OrderController.js',
    'OrderDetail': 'OrderDetailController.js',
    'OrderStatus': 'OrderStatusesController.js',
    'OrderType': 'OrderTypesController.js',
    'PaymentStatus': 'PaymentStatusesController.js',
    'PaymentType': 'PaymentTypesController.js',
    'Permission': 'PermissionController.js',
    'Role': 'RoleController.js',
    'RolePermission': 'RolePermissionController.js',
    'User': 'UserController.js',
    'UserRole': 'UserRoleController.js',
    'UserType': 'UserTypeController.js',
    'WageType': 'WageTypeController.js',
    
  };

  Object.entries(controllerMappings).forEach(([resourceName, fileName]) => {
    try {
      const filePath = path.join(controllersPath, fileName);
      if (!fs.existsSync(filePath)) {
        console.warn(`Warning: Controller file ${fileName} not found`);
        return;
      }

      const Controller = require(filePath);
      const controller = typeof Controller === 'function' ? new Controller() : Controller;
      
      // Handle special cases for path naming
      let basePath;
      switch(resourceName) {
        default:
          basePath = `/api/${resourceName.toLowerCase()}s`;
      }

      // Special handling for Auth endpoints
      if (resourceName === 'Auth') {
        // Register endpoint
        paths[`${basePath}/register`] = {
          post: {
            summary: 'Register new user',
            tags: ['Auth'],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      Usr_UserName: { type: 'string', example: 'john.doe' },
                      Usr_Password: { type: 'string', example: 'password123' },
                      Usr_FirstName: { type: 'string', example: 'John' },
                      Usr_LastName: { type: 'string', example: 'Doe' },
                      Usr_Email: { type: 'string', example: 'john.doe@example.com' },
                      Usr_ContactNo: { type: 'string', example: '+1234567890' },
                      Usr_Address: { type: 'string', example: '123 Main St' },
                      Usr_City: { type: 'string', example: 'New York' },
                      Usr_States: { type: 'string', example: 'NY' },
                      Usr_Country: { type: 'string', example: 'USA' },
                      Usr_BranchFK: { type: 'string', example: 'BR001' },
                      Usr_UsrTFK: { type: 'string', example: 'UT001' },
                      Usr_DeptFK: { type: 'string', example: 'DP001' },
                      Usr_WageTFK: { type: 'string', example: 'WT001' }
                    },
                    required: ['Usr_UserName', 'Usr_Password', 'Usr_Email', 'Usr_BranchFK']
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'User registered successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'User registered successfully' },
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                        user: { $ref: '#/components/schemas/UserDetails' }
                      }
                    }
                  }
                }
              },
              400: {
                description: 'Bad request',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: false },
                        message: { type: 'string', example: 'User already exists' }
                      }
                    }
                  }
                }
              }
            }
          }
        };

        // Login endpoint
        paths[`${basePath}/login`] = {
          post: {
            summary: 'Login user',
            tags: ['Auth'],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      email: { type: 'string', example: 'john.doe@example.com' },
                      password: { type: 'string', example: 'password123' }
                    },
                    required: ['email', 'password']
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'Login successful',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'Login successful' },
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                        user: { $ref: '#/components/schemas/UserDetails' }
                      }
                    }
                  }
                }
              },
              400: {
                description: 'Bad request',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: false },
                        message: { type: 'string', example: 'Invalid email or password' }
                      }
                    }
                  }
                }
              }
            }
          }
        };
        return;
      }

      // Handle CRUD endpoints
      paths[basePath] = {};

      // GET /api/resources
      if (typeof controller.getAll === 'function') {
        paths[basePath].get = {
          summary: `Get all ${resourceName}`,
          tags: [resourceName],
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: {
                        type: 'array',
                        items: {
                          $ref: `#/components/schemas/${resourceName}s`
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        };
      }

      // POST /api/resources
      if (typeof controller.create === 'function') {
        paths[basePath].post = {
          summary: `Create new ${resourceName}`,
          tags: [resourceName],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: `#/components/schemas/${resourceName}s`
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: {
                        $ref: `#/components/schemas/${resourceName}s`
                      }
                    }
                  }
                }
              }
            }
          }
        };
      }

      // Individual resource endpoints
      if (controller.getById || controller.update || controller.delete) {
        paths[`${basePath}/{id}`] = {};
      }

      // GET /api/resources/{id}
      if (typeof controller.getById === 'function') {
        paths[`${basePath}/{id}`].get = {
          summary: `Get ${resourceName} by ID`,
          tags: [resourceName],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: {
                        $ref: `#/components/schemas/${resourceName}s`
                      }
                    }
                  }
                }
              }
            }
          }
        };
      }

      // PUT /api/resources/{id}
      if (typeof controller.update === 'function') {
        paths[`${basePath}/{id}`].put = {
          summary: `Update ${resourceName}`,
          tags: [resourceName],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'string' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: `#/components/schemas/${resourceName}s`
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Updated successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: {
                        $ref: `#/components/schemas/${resourceName}s`
                      }
                    }
                  }
                }
              }
            }
          }
        };
      }

      // DELETE /api/resources/{id}
      if (typeof controller.delete === 'function') {
        paths[`${basePath}/{id}`].delete = {
          summary: `Delete ${resourceName}`,
          tags: [resourceName],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: {
              description: 'Deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Resource deleted successfully' }
                    }
                  }
                }
              }
            }
          }
        };
      }

      // For User controller specifically
      if (resourceName === 'User') {
        // GET /api/user
        if (typeof controller.getAll === 'function') {
          paths[basePath].get = {
            summary: 'Get all Users',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/UserDetails'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // POST /api/user
        if (typeof controller.create === 'function') {
          paths[basePath].post = {
            summary: 'Create new User',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserDetails'
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'Created successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/UserDetails'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // GET /api/user/{id}
        if (typeof controller.getById === 'function') {
          paths[`${basePath}/{id}`].get = {
            summary: 'Get User by ID',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/UserDetails'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // PUT /api/user/{id}
        if (typeof controller.update === 'function') {
          paths[`${basePath}/{id}`].put = {
            summary: 'Update User',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserDetails'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'Updated successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/UserDetails'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }
      }

      // For Branch controller specifically
      if (resourceName === 'Branch') {
        // GET /api/branches
        if (typeof controller.getAll === 'function') {
          paths[basePath].get = {
            summary: 'Get all Branches',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/Branches'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // POST /api/branches
        if (typeof controller.create === 'function') {
          paths[basePath].post = {
            summary: 'Create new Branch',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Branches'
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'Created successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/Branches'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // GET /api/branches/{id}
        if (typeof controller.getById === 'function') {
          paths[`${basePath}/{id}`].get = {
            summary: 'Get Branch by ID',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/Branches'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // PUT /api/branches/{id}
        if (typeof controller.update === 'function') {
          paths[`${basePath}/{id}`].put = {
            summary: 'Update Branch',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Branches'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'Updated successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/Branches'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // DELETE /api/branches/{id}
        if (typeof controller.delete === 'function') {
          paths[`${basePath}/{id}`].delete = {
            summary: 'Delete Branch',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Deleted successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'Branch deleted successfully' }
                      }
                    }
                  }
                }
              }
            }
          };
        }
      }

      // For Category controller specifically
      if (resourceName === 'Category') {
        // GET /api/categories
        if (typeof controller.getAll === 'function') {
          paths[basePath].get = {
            summary: 'Get all Categories',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/Categories'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // POST /api/categories
        if (typeof controller.create === 'function') {
          paths[basePath].post = {
            summary: 'Create new Category',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Categories'
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'Created successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/Categories'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // GET /api/categories/{id}
        if (typeof controller.getById === 'function') {
          paths[`${basePath}/{id}`].get = {
            summary: 'Get Category by ID',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/Categories'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // PUT /api/categories/{id}
        if (typeof controller.update === 'function') {
          paths[`${basePath}/{id}`].put = {
            summary: 'Update Category',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Categories'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'Updated successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/Categories'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // DELETE /api/categories/{id}
        if (typeof controller.delete === 'function') {
          paths[`${basePath}/{id}`].delete = {
            summary: 'Delete Category',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Deleted successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'Category deleted successfully' }
                      }
                    }
                  }
                }
              }
            }
          };
        }
      }

      // For OrderStatus controller specifically
      if (resourceName === 'OrderStatus') {
        // GET /api/order-statuses
        if (typeof controller.getAll === 'function') {
          paths[basePath].get = {
            summary: 'Get all Order Statuses',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/OrderStatuses'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // POST /api/order-statuses
        if (typeof controller.create === 'function') {
          paths[basePath].post = {
            summary: 'Create new Order Status',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/OrderStatuses'
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'Created successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/OrderStatuses'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // GET /api/order-statuses/{id}
        if (typeof controller.getById === 'function') {
          paths[`${basePath}/{id}`].get = {
            summary: 'Get Order Status by ID',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/OrderStatuses'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // PUT /api/order-statuses/{id}
        if (typeof controller.update === 'function') {
          paths[`${basePath}/{id}`].put = {
            summary: 'Update Order Status',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/OrderStatuses'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'Updated successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/OrderStatuses'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // DELETE /api/order-statuses/{id}
        if (typeof controller.delete === 'function') {
          paths[`${basePath}/{id}`].delete = {
            summary: 'Delete Order Status',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Deleted successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'Order Status deleted successfully' }
                      }
                    }
                  }
                }
              }
            }
          };
        }
      }

      // For PaymentStatus controller specifically
      if (resourceName === 'PaymentStatus') {
        // GET /api/payment-statuses
        if (typeof controller.getAll === 'function') {
          paths[basePath].get = {
            summary: 'Get all Payment Statuses',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/PaymentStatuses'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // POST /api/payment-statuses
        if (typeof controller.create === 'function') {
          paths[basePath].post = {
            summary: 'Create new Payment Status',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/PaymentStatuses'
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'Created successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/PaymentStatuses'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // GET /api/payment-statuses/{id}
        if (typeof controller.getById === 'function') {
          paths[`${basePath}/{id}`].get = {
            summary: 'Get Payment Status by ID',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/PaymentStatuses'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // PUT /api/payment-statuses/{id}
        if (typeof controller.update === 'function') {
          paths[`${basePath}/{id}`].put = {
            summary: 'Update Payment Status',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/PaymentStatuses'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'Updated successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/PaymentStatuses'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // DELETE /api/payment-statuses/{id}
        if (typeof controller.delete === 'function') {
          paths[`${basePath}/{id}`].delete = {
            summary: 'Delete Payment Status',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Deleted successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'Payment Status deleted successfully' }
                      }
                    }
                  }
                }
              }
            }
          };
        }
      }

      // For CashRegister controller specifically
      if (resourceName === 'CashRegister') {
        // GET /api/cash-registers
        if (typeof controller.getAll === 'function') {
          paths[basePath].get = {
            summary: 'Get all Cash Registers',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/CashRegisters'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // POST /api/cash-registers
        if (typeof controller.create === 'function') {
          paths[basePath].post = {
            summary: 'Create new Cash Register',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CashRegisters'
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'Created successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/CashRegisters'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // GET /api/cash-registers/{id}
        if (typeof controller.getById === 'function') {
          paths[`${basePath}/{id}`].get = {
            summary: 'Get Cash Register by ID',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/CashRegisters'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // PUT /api/cash-registers/{id}
        if (typeof controller.update === 'function') {
          paths[`${basePath}/{id}`].put = {
            summary: 'Update Cash Register',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CashRegisters'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'Updated successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/CashRegisters'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // DELETE /api/cash-registers/{id}
        if (typeof controller.delete === 'function') {
          paths[`${basePath}/{id}`].delete = {
            summary: 'Delete Cash Register',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Deleted successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'Cash Register deleted successfully' }
                      }
                    }
                  }
                }
              }
            }
          };
        }
      }

      // For CashTransaction controller specifically
      if (resourceName === 'CashTransaction') {
        // GET /api/cash-transactions
        if (typeof controller.getAll === 'function') {
          paths[basePath].get = {
            summary: 'Get all Cash Transactions',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/CashTransactions'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // POST /api/cash-transactions
        if (typeof controller.create === 'function') {
          paths[basePath].post = {
            summary: 'Create new Cash Transaction',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CashTransactions'
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'Created successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/CashTransactions'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // GET /api/cash-transactions/{id}
        if (typeof controller.getById === 'function') {
          paths[`${basePath}/{id}`].get = {
            summary: 'Get Cash Transaction by ID',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/CashTransactions'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // PUT /api/cash-transactions/{id}
        if (typeof controller.update === 'function') {
          paths[`${basePath}/{id}`].put = {
            summary: 'Update Cash Transaction',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CashTransactions'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'Updated successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/CashTransactions'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // DELETE /api/cash-transactions/{id}
        if (typeof controller.delete === 'function') {
          paths[`${basePath}/{id}`].delete = {
            summary: 'Delete Cash Transaction',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Deleted successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'Cash Transaction deleted successfully' }
                      }
                    }
                  }
                }
              }
            }
          };
        }
      }

      // For Department controller specifically
      if (resourceName === 'Department') {
        // GET /api/departments
        if (typeof controller.getAll === 'function') {
          paths[basePath].get = {
            summary: 'Get all Departments',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/Departments'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // POST /api/departments
        if (typeof controller.create === 'function') {
          paths[basePath].post = {
            summary: 'Create new Department',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Departments'
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'Created successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/Departments'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // GET /api/departments/{id}
        if (typeof controller.getById === 'function') {
          paths[`${basePath}/{id}`].get = {
            summary: 'Get Department by ID',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/Departments'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // PUT /api/departments/{id}
        if (typeof controller.update === 'function') {
          paths[`${basePath}/{id}`].put = {
            summary: 'Update Department',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Departments'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'Updated successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/Departments'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // DELETE /api/departments/{id}
        if (typeof controller.delete === 'function') {
          paths[`${basePath}/{id}`].delete = {
            summary: 'Delete Department',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Deleted successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'Department deleted successfully' }
                      }
                    }
                  }
                }
              }
            }
          };
        }
      }

      // For GenAddon controller specifically
      if (resourceName === 'GenAddon') {
        // GET /api/gen-addons
        if (typeof controller.getAll === 'function') {
          paths[basePath].get = {
            summary: 'Get all General Addons',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/GenAddons'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // POST /api/gen-addons
        if (typeof controller.create === 'function') {
          paths[basePath].post = {
            summary: 'Create new General Addon',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/GenAddons'
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'Created successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/GenAddons'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // GET /api/gen-addons/{id}
        if (typeof controller.getById === 'function') {
          paths[`${basePath}/{id}`].get = {
            summary: 'Get General Addon by ID',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/GenAddons'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // PUT /api/gen-addons/{id}
        if (typeof controller.update === 'function') {
          paths[`${basePath}/{id}`].put = {
            summary: 'Update General Addon',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/GenAddons'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'Updated successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/GenAddons'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // DELETE /api/gen-addons/{id}
        if (typeof controller.delete === 'function') {
          paths[`${basePath}/{id}`].delete = {
            summary: 'Delete General Addon',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Deleted successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'General Addon deleted successfully' }
                      }
                    }
                  }
                }
              }
            }
          };
        }
      }

      // For GenModifire controller specifically
      if (resourceName === 'GenModifire') {
        // GET /api/gen-modifires
        if (typeof controller.getAll === 'function') {
          paths[basePath].get = {
            summary: 'Get all General Modifiers',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/GenModifires'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // POST /api/gen-modifires
        if (typeof controller.create === 'function') {
          paths[basePath].post = {
            summary: 'Create new General Modifier',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/GenModifires'
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'Created successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/GenModifires'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // GET /api/gen-modifires/{id}
        if (typeof controller.getById === 'function') {
          paths[`${basePath}/{id}`].get = {
            summary: 'Get General Modifier by ID',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/GenModifires'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // PUT /api/gen-modifires/{id}
        if (typeof controller.update === 'function') {
          paths[`${basePath}/{id}`].put = {
            summary: 'Update General Modifier',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/GenModifires'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'Updated successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/GenModifires'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // DELETE /api/gen-modifires/{id}
        if (typeof controller.delete === 'function') {
          paths[`${basePath}/{id}`].delete = {
            summary: 'Delete General Modifier',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Deleted successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'General Modifier deleted successfully' }
                      }
                    }
                  }
                }
              }
            }
          };
        }
      }

      // For GiftCardDetail controller specifically
      if (resourceName === 'GiftCardDetail') {
        // GET /api/gift-cards
        if (typeof controller.getAll === 'function') {
          paths[basePath].get = {
            summary: 'Get all Gift Cards',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/GiftCardDetails'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // POST /api/gift-cards
        if (typeof controller.create === 'function') {
          paths[basePath].post = {
            summary: 'Create new Gift Card',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/GiftCardDetails'
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'Created successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/GiftCardDetails'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // GET /api/gift-cards/{id}
        if (typeof controller.getById === 'function') {
          paths[`${basePath}/{id}`].get = {
            summary: 'Get Gift Card by ID',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/GiftCardDetails'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // PUT /api/gift-cards/{id}
        if (typeof controller.update === 'function') {
          paths[`${basePath}/{id}`].put = {
            summary: 'Update Gift Card',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/GiftCardDetails'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'Updated successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/GiftCardDetails'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // DELETE /api/gift-cards/{id}
        if (typeof controller.delete === 'function') {
          paths[`${basePath}/{id}`].delete = {
            summary: 'Delete Gift Card',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Deleted successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'Gift Card deleted successfully' }
                      }
                    }
                  }
                }
              }
            }
          };
        }
      }

      // For Inventory controller specifically
      if (resourceName === 'Inventory') {
        // GET /api/inventories
        if (typeof controller.getAll === 'function') {
          paths[basePath].get = {
            summary: 'Get all Inventories',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/Inventories'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // POST /api/inventories
        if (typeof controller.create === 'function') {
          paths[basePath].post = {
            summary: 'Create new Inventory',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Inventories'
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'Created successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/Inventories'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // GET /api/inventories/{id}
        if (typeof controller.getById === 'function') {
          paths[`${basePath}/{id}`].get = {
            summary: 'Get Inventory by ID',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/Inventories'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // PUT /api/inventories/{id}
        if (typeof controller.update === 'function') {
          paths[`${basePath}/{id}`].put = {
            summary: 'Update Inventory',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Inventories'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'Updated successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/Inventories'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // DELETE /api/inventories/{id}
        if (typeof controller.delete === 'function') {
          paths[`${basePath}/{id}`].delete = {
            summary: 'Delete Inventory',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Deleted successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'Inventory deleted successfully' }
                      }
                    }
                  }
                }
              }
            }
          };
        }
      }

      // For KitchenSection controller specifically
      if (resourceName === 'KitchenSection') {
        // GET /api/kitchen-sections
        if (typeof controller.getAll === 'function') {
          paths[basePath].get = {
            summary: 'Get all Kitchen Sections',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/KitchenSections'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // POST /api/kitchen-sections
        if (typeof controller.create === 'function') {
          paths[basePath].post = {
            summary: 'Create new Kitchen Section',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/KitchenSections'
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'Created successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/KitchenSections'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // GET /api/kitchen-sections/{id}
        if (typeof controller.getById === 'function') {
          paths[`${basePath}/{id}`].get = {
            summary: 'Get Kitchen Section by ID',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/KitchenSections'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // PUT /api/kitchen-sections/{id}
        if (typeof controller.update === 'function') {
          paths[`${basePath}/{id}`].put = {
            summary: 'Update Kitchen Section',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/KitchenSections'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'Updated successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/KitchenSections'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // DELETE /api/kitchen-sections/{id}
        if (typeof controller.delete === 'function') {
          paths[`${basePath}/{id}`].delete = {
            summary: 'Delete Kitchen Section',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Deleted successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'Kitchen Section deleted successfully' }
                      }
                    }
                  }
                }
              }
            }
          };
        }
      }

      // For KitWiseCat controller specifically
      if (resourceName === 'KitWiseCat') {
        // GET /api/kit-wise-cats
        if (typeof controller.getAll === 'function') {
          paths[basePath].get = {
            summary: 'Get all Kitchen Wise Categories',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/KitWiseCats'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // POST /api/kit-wise-cats
        if (typeof controller.create === 'function') {
          paths[basePath].post = {
            summary: 'Create new Kitchen Wise Category',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/KitWiseCats'
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'Created successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/KitWiseCats'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // GET /api/kit-wise-cats/{id}
        if (typeof controller.getById === 'function') {
          paths[`${basePath}/{id}`].get = {
            summary: 'Get Kitchen Wise Category by ID',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/KitWiseCats'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // PUT /api/kit-wise-cats/{id}
        if (typeof controller.update === 'function') {
          paths[`${basePath}/{id}`].put = {
            summary: 'Update Kitchen Wise Category',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/KitWiseCats'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'Updated successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        data: {
                          $ref: '#/components/schemas/KitWiseCats'
                        }
                      }
                    }
                  }
                }
              }
            }
          };
        }

        // DELETE /api/kit-wise-cats/{id}
        if (typeof controller.delete === 'function') {
          paths[`${basePath}/{id}`].delete = {
            summary: 'Delete Kitchen Wise Category',
            tags: [resourceName],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                in: 'path',
                name: 'id',
                required: true,
                schema: { type: 'string' }
              }
            ],
            responses: {
              200: {
                description: 'Deleted successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'Kitchen Wise Category deleted successfully' }
                      }
                    }
                  }
                }
              }
            }
          };
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not generate API paths for ${fileName}:`, error.message);
    }
  });

  return paths;
}

// Dynamically generate schemas from models
function generateModelSchemas() {
  const schemas = {
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
  };

  const modelsPath = path.join(__dirname, '../models');
  const modelFiles = fs.readdirSync(modelsPath)
    .filter(file => file.endsWith('.js'));

  modelFiles.forEach(file => {
    try {
      const model = require(path.join(modelsPath, file));
      
      if (model && model.getAttributes) {
        const modelName = model.name;
        const attributes = model.getAttributes();
        
        const properties = {};
        const required = [];

        Object.entries(attributes).forEach(([key, attribute]) => {
          properties[key] = {
            type: getSwaggerType(attribute.type),
            description: attribute.comment || `${key} field`
          };
          
          if (attribute.allowNull === false) {
            required.push(key);
          }
        });

        schemas[modelName] = {
          type: 'object',
          properties,
          required: required.length > 0 ? required : undefined
        };
      }
    } catch (error) {
      console.warn(`Warning: Could not generate schema for ${file}:`, error.message);
    }
  });

  return schemas;
}

// Create the Swagger options object
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
    tags: generateTags(),
    paths: generateApiPaths(),
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme. Enter Bearer [space] and then your token in the text input below.Example: Bearer 12345abcdef'
        }
      },
      schemas: generateModelSchemas()
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: [] // We don't need this anymore since we're generating paths dynamically
};

module.exports = swaggerJsdoc(options); 