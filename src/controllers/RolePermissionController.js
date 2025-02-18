const rolePermissionService = require("../services/RolePermissionService");

/**
 * @swagger
 * tags:
 *   name: RolePermissions
 *   description: Role-Permission mapping management endpoints
 * 
 * /api/role-permissions:
 *   get:
 *     summary: Get all role-permission mappings
 *     tags: [RolePermissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: roleId
 *         schema:
 *           type: string
 *         description: Filter by role ID
 *     responses:
 *       200:
 *         description: List of all role-permission mappings
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
 *                     $ref: '#/components/schemas/RolePermission'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server Error
 *         $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Create a new role-permission mapping
 *     tags: [RolePermissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               RoleP_RoleFK:
 *                 type: string
 *                 example: "ROLE001"
 *               RoleP_PermFK:
 *                 type: string
 *                 example: "PERM001"
 *             required:
 *               - RoleP_RoleFK
 *               - RoleP_PermFK
 *     responses:
 *       201:
 *         description: Role-Permission mapping created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/RolePermission'
 *       400:
 *         description: Invalid input
 *         $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 * 
 * /api/role-permissions/{id}:
 *   get:
 *     summary: Get role-permission mapping by ID
 *     tags: [RolePermissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role-Permission mapping ID
 *     responses:
 *       200:
 *         description: Role-Permission mapping details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/RolePermission'
 *       404:
 *         description: Role-Permission mapping not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Delete role-permission mapping
 *     tags: [RolePermissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role-Permission mapping ID
 *     responses:
 *       200:
 *         description: Role-Permission mapping deleted successfully
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
 *                   example: "Role-Permission mapping deleted successfully"
 *       404:
 *         description: Role-Permission mapping not found
 *         $ref: '#/components/schemas/Error'
 */

class RolePermissionController {
  async getAll(req, res, next) {
    try {
      const rolePermissions = await rolePermissionService.getAll(req.query);
      res.json({
        success: true,
        data: rolePermissions
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const rolePermission = await rolePermissionService.getById(req.params.id);
      if (!rolePermission) {
        return res.status(404).json({
          success: false,
          message: "Role-Permission mapping not found"
        });
      }
      res.json({
        success: true,
        data: rolePermission
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const rolePermission = await rolePermissionService.create(req.body);
      res.status(201).json({
        success: true,
        data: rolePermission
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res) {
    try {
      const rolePermission = await rolePermissionService.update(req.params.id, req.body);
      if (!rolePermission) return res.status(404).json({ message: "RolePermission not found" });
      res.status(200).json(rolePermission);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res, next) {
    try {
      const result = await rolePermissionService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Role-Permission mapping not found"
        });
      }
      res.json({
        success: true,
        message: "Role-Permission mapping deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RolePermissionController();
