const PaymentStatusService = require("../services/PaymentStatusService");

/**
 * @swagger
 * tags:
 *   name: PaymentStatuses
 *   description: Payment status management endpoints
 * 
 * /api/payment-statuses:
 *   get:
 *     summary: Get all payment statuses
 *     tags: [PaymentStatuses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all payment statuses
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
 *                     $ref: '#/components/schemas/PaymentStatus'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server Error
 *         $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Create a new payment status
 *     tags: [PaymentStatuses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               PayS_Name:
 *                 type: string
 *                 example: "Pending"
 *             required:
 *               - PayS_Name
 *     responses:
 *       201:
 *         description: Payment status created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PaymentStatus'
 *       400:
 *         description: Invalid input
 *         $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 * 
 * /api/payment-statuses/{id}:
 *   get:
 *     summary: Get payment status by ID
 *     tags: [PaymentStatuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment Status ID
 *     responses:
 *       200:
 *         description: Payment status details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PaymentStatus'
 *       404:
 *         description: Payment status not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Update payment status
 *     tags: [PaymentStatuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment Status ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               PayS_Name:
 *                 type: string
 *                 example: "Completed"
 *     responses:
 *       200:
 *         description: Payment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PaymentStatus'
 *       404:
 *         description: Payment status not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Delete payment status
 *     tags: [PaymentStatuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment Status ID
 *     responses:
 *       200:
 *         description: Payment status deleted successfully
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
 *                   example: "Payment status deleted successfully"
 *       404:
 *         description: Payment status not found
 *         $ref: '#/components/schemas/Error'
 */

class PaymentStatusController {
  async getAll(req, res, next) {
    try {
      const paymentStatuses = await PaymentStatusService.getAll();
      res.json({
        success: true,
        data: paymentStatuses
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const paymentStatus = await PaymentStatusService.getById(req.params.id);
      if (!paymentStatus) {
        return res.status(404).json({
          success: false,
          message: "Payment status not found"
        });
      }
      res.json({
        success: true,
        data: paymentStatus
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const paymentStatus = await PaymentStatusService.create(req.body);
      res.status(201).json({
        success: true,
        data: paymentStatus
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const paymentStatus = await PaymentStatusService.update(req.params.id, req.body);
      if (!paymentStatus) {
        return res.status(404).json({
          success: false,
          message: "Payment status not found"
        });
      }
      res.json({
        success: true,
        data: paymentStatus
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await PaymentStatusService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Payment status not found"
        });
      }
      res.json({
        success: true,
        message: "Payment status deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PaymentStatusController(); 