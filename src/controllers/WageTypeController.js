const WageTypeService = require("../services/WageTypeService");

/**
 * @swagger
 * tags:
 *   name: WageTypes
 *   description: Wage type management endpoints
 * 
 * /api/wagetypes:
 *   get:
 *     summary: Get all wage types
 *     tags: [WageTypes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all wage types
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
 *                     $ref: '#/components/schemas/WageType'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server Error
 *         $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Create a new wage type
 *     tags: [WageTypes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               WageT_Name:
 *                 type: string
 *                 example: "Hourly"
 *             required:
 *               - WageT_Name
 *     responses:
 *       201:
 *         description: Wage type created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/WageType'
 *       400:
 *         description: Invalid input
 *         $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 * 
 * /api/wagetypes/{id}:
 *   get:
 *     summary: Get wage type by ID
 *     tags: [WageTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Wage Type ID
 *     responses:
 *       200:
 *         description: Wage type details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/WageType'
 *       404:
 *         description: Wage type not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Update wage type
 *     tags: [WageTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Wage Type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               WageT_Name:
 *                 type: string
 *                 example: "Updated Hourly"
 *     responses:
 *       200:
 *         description: Wage type updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/WageType'
 *       404:
 *         description: Wage type not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Delete wage type
 *     tags: [WageTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Wage Type ID
 *     responses:
 *       200:
 *         description: Wage type deleted successfully
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
 *                   example: "Wage type deleted successfully"
 *       404:
 *         description: Wage type not found
 *         $ref: '#/components/schemas/Error'
 */

class WageTypeController {
  async getAll(req, res, next) {
    try {
      const wageTypes = await WageTypeService.getAll();
      res.json({
        success: true,
        data: wageTypes
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const wageType = await WageTypeService.getById(req.params.id);
      if (!wageType) {
        return res.status(404).json({
          success: false,
          message: "Wage type not found"
        });
      }
      res.json({
        success: true,
        data: wageType
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const wageType = await WageTypeService.create(req.body);
      res.status(201).json({
        success: true,
        data: wageType
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const wageType = await WageTypeService.update(req.params.id, req.body);
      if (!wageType) {
        return res.status(404).json({
          success: false,
          message: "Wage type not found"
        });
      }
      res.json({
        success: true,
        data: wageType
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await WageTypeService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Wage type not found"
        });
      }
      res.json({
        success: true,
        message: "Wage type deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WageTypeController();
