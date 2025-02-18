const UserTypeService = require("../services/UserTypeService");

/**
 * @swagger
 * tags:
 *   name: UserTypes
 *   description: User type management endpoints
 * 
 * /api/usertypes:
 *   get:
 *     summary: Get all user types
 *     tags: [UserTypes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all user types
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
 *                     $ref: '#/components/schemas/UserType'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server Error
 *         $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Create a new user type
 *     tags: [UserTypes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UsrT_Name:
 *                 type: string
 *                 example: "Manager"
 *             required:
 *               - UsrT_Name
 *     responses:
 *       201:
 *         description: User type created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/UserType'
 *       400:
 *         description: Invalid input
 *         $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 * 
 * /api/usertypes/{id}:
 *   get:
 *     summary: Get user type by ID
 *     tags: [UserTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User Type ID
 *     responses:
 *       200:
 *         description: User type details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/UserType'
 *       404:
 *         description: User type not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Update user type
 *     tags: [UserTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User Type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UsrT_Name:
 *                 type: string
 *                 example: "Senior Manager"
 *     responses:
 *       200:
 *         description: User type updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/UserType'
 *       404:
 *         description: User type not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Delete user type
 *     tags: [UserTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User Type ID
 *     responses:
 *       200:
 *         description: User type deleted successfully
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
 *                   example: "User type deleted successfully"
 *       404:
 *         description: User type not found
 *         $ref: '#/components/schemas/Error'
 */

class UserTypeController {
  async getAll(req, res, next) {
    try {
      const userTypes = await UserTypeService.getAll();
      res.json({
        success: true,
        data: userTypes
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const userType = await UserTypeService.getById(req.params.id);
      if (!userType) {
        return res.status(404).json({
          success: false,
          message: "User type not found"
        });
      }
      res.json({
        success: true,
        data: userType
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const userType = await UserTypeService.create(req.body);
      res.status(201).json({
        success: true,
        data: userType
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const userType = await UserTypeService.update(req.params.id, req.body);
      if (!userType) {
        return res.status(404).json({
          success: false,
          message: "User type not found"
        });
      }
      res.json({
        success: true,
        data: userType
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await UserTypeService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "User type not found"
        });
      }
      res.json({
        success: true,
        message: "User type deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserTypeController();
