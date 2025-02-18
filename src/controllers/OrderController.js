const OrderService = require("../services/OrderService");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management endpoints
 * 
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by order status
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by order date
 *     responses:
 *       200:
 *         description: List of all orders
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
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server Error
 *         $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Ord_UserFK:
 *                 type: string
 *                 example: "USR001"
 *               Ord_BranchFK:
 *                 type: string
 *                 example: "BR001"
 *               Ord_TypeFK:
 *                 type: string
 *                 example: "OT001"
 *               Ord_StatusFK:
 *                 type: string
 *                 example: "OS001"
 *               Ord_TotalAmount:
 *                 type: number
 *                 example: 150.50
 *               Ord_PaymentTypeFK:
 *                 type: string
 *                 example: "PT001"
 *               Ord_PaymentStatusFK:
 *                 type: string
 *                 example: "PS001"
 *             required:
 *               - Ord_UserFK
 *               - Ord_BranchFK
 *               - Ord_TypeFK
 *               - Ord_StatusFK
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid input
 *         $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 * 
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Update order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Ord_StatusFK:
 *                 type: string
 *                 example: "OS002"
 *               Ord_PaymentStatusFK:
 *                 type: string
 *                 example: "PS002"
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Delete order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
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
 *                   example: "Order deleted successfully"
 *       404:
 *         description: Order not found
 *         $ref: '#/components/schemas/Error'
 */

class OrderController {
  async getAll(req, res, next) {
    try {
      const orders = await OrderService.getAll(req.query);
      res.json({
        success: true,
        data: orders
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const order = await OrderService.getById(req.params.id);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }
      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const order = await OrderService.create(req.body);
      res.status(201).json({
        success: true,
        data: order
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const order = await OrderService.update(req.params.id, req.body);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }
      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await OrderService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }
      res.json({
        success: true,
        message: "Order deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
