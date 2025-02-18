const OrderStatusService = require("../services/OrderStatusService");

/**
 * @swagger
 * tags:
 *   name: OrderStatuses
 *   description: Order status management endpoints
 * 
 * /api/order-statuses:
 *   get:
 *     summary: Get all order statuses
 *     tags: [OrderStatuses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all order statuses
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
 *                     $ref: '#/components/schemas/OrderStatus'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server Error
 *         $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Create a new order status
 *     tags: [OrderStatuses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OrdS_Name:
 *                 type: string
 *                 example: "Pending"
 *             required:
 *               - OrdS_Name
 *     responses:
 *       201:
 *         description: Order status created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OrderStatus'
 *       400:
 *         description: Invalid input
 *         $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 * 
 * /api/order-statuses/{id}:
 *   get:
 *     summary: Get order status by ID
 *     tags: [OrderStatuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order Status ID
 *     responses:
 *       200:
 *         description: Order status details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OrderStatus'
 *       404:
 *         description: Order status not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Update order status
 *     tags: [OrderStatuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order Status ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OrdS_Name:
 *                 type: string
 *                 example: "Completed"
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OrderStatus'
 *       404:
 *         description: Order status not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Delete order status
 *     tags: [OrderStatuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order Status ID
 *     responses:
 *       200:
 *         description: Order status deleted successfully
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
 *                   example: "Order status deleted successfully"
 *       404:
 *         description: Order status not found
 *         $ref: '#/components/schemas/Error'
 */

class OrderStatusController {
  async getAll(req, res, next) {
    try {
      const orderStatuses = await OrderStatusService.getAll();
      res.json({
        success: true,
        data: orderStatuses
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const orderStatus = await OrderStatusService.getById(req.params.id);
      if (!orderStatus) {
        return res.status(404).json({
          success: false,
          message: "Order status not found"
        });
      }
      res.json({
        success: true,
        data: orderStatus
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const orderStatus = await OrderStatusService.create(req.body);
      res.status(201).json({
        success: true,
        data: orderStatus
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const orderStatus = await OrderStatusService.update(req.params.id, req.body);
      if (!orderStatus) {
        return res.status(404).json({
          success: false,
          message: "Order status not found"
        });
      }
      res.json({
        success: true,
        data: orderStatus
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await OrderStatusService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Order status not found"
        });
      }
      res.json({
        success: true,
        message: "Order status deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderStatusController(); 