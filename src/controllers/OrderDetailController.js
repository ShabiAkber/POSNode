const OrderDetailService = require("../services/OrderDetailService");

/**
 * @swagger
 * tags:
 *   name: OrderDetails
 *   description: Order detail management endpoints
 * 
 * /api/order-details:
 *   get:
 *     summary: Get all order details
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: string
 *         description: Filter by order ID
 *     responses:
 *       200:
 *         description: List of all order details
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
 *                     $ref: '#/components/schemas/OrderDetail'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server Error
 *         $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Create a new order detail
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OrdD_OrderFK:
 *                 type: string
 *                 example: "ORD001"
 *               OrdD_Quantity:
 *                 type: number
 *                 example: 2
 *               OrdD_UnitPrice:
 *                 type: number
 *                 example: 10.99
 *               OrdD_TotalAmount:
 *                 type: number
 *                 example: 21.98
 *             required:
 *               - OrdD_OrderFK
 *               - OrdD_Quantity
 *               - OrdD_UnitPrice
 *               - OrdD_TotalAmount
 *     responses:
 *       201:
 *         description: Order detail created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OrderDetail'
 *       400:
 *         description: Invalid input
 *         $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 * 
 * /api/order-details/{id}:
 *   get:
 *     summary: Get order detail by ID
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order Detail ID
 *     responses:
 *       200:
 *         description: Order detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OrderDetail'
 *       404:
 *         description: Order detail not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Update order detail
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order Detail ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OrdD_Quantity:
 *                 type: number
 *                 example: 3
 *               OrdD_TotalAmount:
 *                 type: number
 *                 example: 32.97
 *     responses:
 *       200:
 *         description: Order detail updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OrderDetail'
 *       404:
 *         description: Order detail not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Delete order detail
 *     tags: [OrderDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order Detail ID
 *     responses:
 *       200:
 *         description: Order detail deleted successfully
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
 *                   example: "Order detail deleted successfully"
 *       404:
 *         description: Order detail not found
 *         $ref: '#/components/schemas/Error'
 */

class OrderDetailController {
  async getAll(req, res, next) {
    try {
      const orderDetails = await OrderDetailService.getAll(req.query);
      res.json({
        success: true,
        data: orderDetails
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const orderDetail = await OrderDetailService.getById(req.params.id);
      if (!orderDetail) {
        return res.status(404).json({
          success: false,
          message: "Order detail not found"
        });
      }
      res.json({
        success: true,
        data: orderDetail
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const orderDetail = await OrderDetailService.create(req.body);
      res.status(201).json({
        success: true,
        data: orderDetail
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const orderDetail = await OrderDetailService.update(req.params.id, req.body);
      if (!orderDetail) {
        return res.status(404).json({
          success: false,
          message: "Order detail not found"
        });
      }
      res.json({
        success: true,
        data: orderDetail
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await OrderDetailService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Order detail not found"
        });
      }
      res.json({
        success: true,
        message: "Order detail deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderDetailController();
