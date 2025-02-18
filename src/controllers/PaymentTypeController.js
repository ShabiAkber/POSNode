const PaymentTypeService = require("../services/PaymentTypeService");

/**
 * @swagger
 * tags:
 *   name: PaymentTypes
 *   description: Payment type management endpoints
 * 
 * /api/payment-types:
 *   get:
 *     summary: Get all payment types
 *     tags: [PaymentTypes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all payment types
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
 *                     $ref: '#/components/schemas/PaymentType'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server Error
 *         $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Create a new payment type
 *     tags: [PaymentTypes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               PayT_Name:
 *                 type: string
 *                 example: "Credit Card"
 *             required:
 *               - PayT_Name
 *     responses:
 *       201:
 *         description: Payment type created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PaymentType'
 *       400:
 *         description: Invalid input
 *         $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 * 
 * /api/payment-types/{id}:
 *   get:
 *     summary: Get payment type by ID
 *     tags: [PaymentTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment Type ID
 *     responses:
 *       200:
 *         description: Payment type details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PaymentType'
 *       404:
 *         description: Payment type not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Update payment type
 *     tags: [PaymentTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment Type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               PayT_Name:
 *                 type: string
 *                 example: "Debit Card"
 *     responses:
 *       200:
 *         description: Payment type updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PaymentType'
 *       404:
 *         description: Payment type not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Delete payment type
 *     tags: [PaymentTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment Type ID
 *     responses:
 *       200:
 *         description: Payment type deleted successfully
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
 *                   example: "Payment type deleted successfully"
 *       404:
 *         description: Payment type not found
 *         $ref: '#/components/schemas/Error'
 */

class PaymentTypeController {
  async getAll(req, res, next) {
    try {
      const paymentTypes = await PaymentTypeService.getAll();
      res.json({
        success: true,
        data: paymentTypes
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const paymentType = await PaymentTypeService.getById(req.params.id);
      if (!paymentType) {
        return res.status(404).json({
          success: false,
          message: "Payment type not found"
        });
      }
      res.json({
        success: true,
        data: paymentType
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const paymentType = await PaymentTypeService.create(req.body);
      res.status(201).json({
        success: true,
        data: paymentType
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const paymentType = await PaymentTypeService.update(req.params.id, req.body);
      if (!paymentType) {
        return res.status(404).json({
          success: false,
          message: "Payment type not found"
        });
      }
      res.json({
        success: true,
        data: paymentType
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await PaymentTypeService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Payment type not found"
        });
      }
      res.json({
        success: true,
        message: "Payment type deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PaymentTypeController(); 