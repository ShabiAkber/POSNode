const OrderTypeService = require("../services/OrderTypeService");

/**
 * @swagger
 * tags:
 *   name: OrderTypes
 *   description: Order type management endpoints
 * 
 * /api/order-types:
 *   get:
 *     summary: Get all order types
 *     tags: [OrderTypes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all order types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/OrderType'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server Error
 *         $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Create a new order type
 *     tags: [OrderTypes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OrdT_Name:
 *                 type: string
 *                 example: "Dine In"
 *             required:
 *               - OrdT_Name
 *     responses:
 *       201:
 *         description: Order type created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OrderType'
 *       400:
 *         description: Invalid input
 *         $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 * 
 * /api/order-types/{id}:
 *   get:
 *     summary: Get order type by ID
 *     tags: [OrderTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order Type ID
 *     responses:
 *       200:
 *         description: Order type details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OrderType'
 *       404:
 *         description: Order type not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Update order type
 *     tags: [OrderTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order Type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OrdT_Name:
 *                 type: string
 *                 example: "Take Away"
 *     responses:
 *       200:
 *         description: Order type updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OrderType'
 *       404:
 *         description: Order type not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Delete order type
 *     tags: [OrderTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order Type ID
 *     responses:
 *       200:
 *         description: Order type deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Order type deleted successfully"
 *       404:
 *         description: Order type not found
 *         $ref: '#/components/schemas/Error'
 */

class OrderTypeController {
  async getAll(req, res, next) {
    try {
      const orderTypes = await OrderTypeService.getAll();
      res.json({
        success: true,
        data: orderTypes
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const orderType = await OrderTypeService.getById(req.params.id);
      if (!orderType) {
        return res.status(404).json({
          success: false,
          message: "Order type not found"
        });
      }
      res.json({
        success: true,
        data: orderType
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const orderType = await OrderTypeService.create(req.body);
      res.status(201).json({
        success: true,
        data: orderType
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const orderType = await OrderTypeService.update(req.params.id, req.body);
      if (!orderType) {
        return res.status(404).json({
          success: false,
          message: "Order type not found"
        });
      }
      res.json({
        success: true,
        data: orderType
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await OrderTypeService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Order type not found"
        });
      }
      res.json({
        success: true,
        message: "Order type deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderTypeController(); 