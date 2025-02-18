const UserRoleService = require("../services/UserRoleService");

/**
 * @swagger
 * tags:
 *   name: UserRoles
 *   description: User-Role mapping management endpoints
 * 
 * /api/user-roles:
 *   get:
 *     summary: Get all user-role mappings
 *     tags: [UserRoles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: roleId
 *         schema:
 *           type: string
 *         description: Filter by role ID
 *     responses:
 *       200:
 *         description: List of all user-role mappings
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
 *                     $ref: '#/components/schemas/UserRole'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server Error
 *         $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Create a new user-role mapping
 *     tags: [UserRoles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UR_UserFK:
 *                 type: string
 *                 example: "USR001"
 *               UR_RoleFK:
 *                 type: string
 *                 example: "ROLE001"
 *             required:
 *               - UR_UserFK
 *               - UR_RoleFK
 *     responses:
 *       201:
 *         description: User-Role mapping created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/UserRole'
 *       400:
 *         description: Invalid input
 *         $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 * 
 * /api/user-roles/{id}:
 *   get:
 *     summary: Get user-role mapping by ID
 *     tags: [UserRoles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User-Role mapping ID
 *     responses:
 *       200:
 *         description: User-Role mapping details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/UserRole'
 *       404:
 *         description: User-Role mapping not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Delete user-role mapping
 *     tags: [UserRoles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User-Role mapping ID
 *     responses:
 *       200:
 *         description: User-Role mapping deleted successfully
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
 *                   example: "User-Role mapping deleted successfully"
 *       404:
 *         description: User-Role mapping not found
 *         $ref: '#/components/schemas/Error'
 */

class UserRoleController {
  async getAll(req, res, next) {
    try {
      const userRoles = await UserRoleService.getAll(req.query);
      res.json({
        success: true,
        data: userRoles
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const userRole = await UserRoleService.getById(req.params.id);
      if (!userRole) {
        return res.status(404).json({
          success: false,
          message: "User-Role mapping not found"
        });
      }
      res.json({
        success: true,
        data: userRole
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const userRole = await UserRoleService.create(req.body);
      res.status(201).json({
        success: true,
        data: userRole
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res) {
    try {
      const userRole = await UserRoleService.update(req.params.id, req.body);
      if (!userRole) return res.status(404).json({ message: "UserRole not found" });
      res.status(200).json(userRole);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res, next) {
    try {
      const result = await UserRoleService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "User-Role mapping not found"
        });
      }
      res.json({
        success: true,
        message: "User-Role mapping deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserRoleController();
