const PermissionService = require("../services/PermissionService");

/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Permission management endpoints
 * 
 * /api/permissions:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all permissions
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
 *                     $ref: '#/components/schemas/Permission'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server Error
 *         $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Perm_Name:
 *                 type: string
 *                 example: "CREATE_USER"
 *             required:
 *               - Perm_Name
 *     responses:
 *       201:
 *         description: Permission created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Permission'
 *       400:
 *         description: Invalid input
 *         $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 * 
 * /api/permissions/{id}:
 *   get:
 *     summary: Get permission by ID
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     responses:
 *       200:
 *         description: Permission details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Permission'
 *       404:
 *         description: Permission not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Update permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Perm_Name:
 *                 type: string
 *                 example: "MANAGE_USERS"
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Permission'
 *       404:
 *         description: Permission not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Delete permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     responses:
 *       200:
 *         description: Permission deleted successfully
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
 *                   example: "Permission deleted successfully"
 *       404:
 *         description: Permission not found
 *         $ref: '#/components/schemas/Error'
 */

class PermissionController {
  async getAll(req, res, next) {
    try {
      const permissions = await PermissionService.getAll();
      res.json({
        success: true,
        data: permissions
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const permission = await PermissionService.getById(req.params.id);
      if (!permission) {
        return res.status(404).json({
          success: false,
          message: "Permission not found"
        });
      }
      res.json({
        success: true,
        data: permission
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const permission = await PermissionService.create(req.body);
      res.status(201).json({
        success: true,
        data: permission
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const permission = await PermissionService.update(req.params.id, req.body);
      if (!permission) {
        return res.status(404).json({
          success: false,
          message: "Permission not found"
        });
      }
      res.json({
        success: true,
        data: permission
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await PermissionService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Permission not found"
        });
      }
      res.json({
        success: true,
        message: "Permission deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PermissionController();
