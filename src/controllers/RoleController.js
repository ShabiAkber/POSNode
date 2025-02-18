const RoleService = require("../services/RoleService");

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management endpoints
 * 
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all roles
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
 *                     $ref: '#/components/schemas/Role'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server Error
 *         $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Role_Name:
 *                 type: string
 *                 example: "Admin"
 *             required:
 *               - Role_Name
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Role'
 *       400:
 *         description: Invalid input
 *         $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 * 
 * /api/roles/{id}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Update role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Role_Name:
 *                 type: string
 *                 example: "Super Admin"
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Delete role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role deleted successfully
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
 *                   example: "Role deleted successfully"
 *       404:
 *         description: Role not found
 *         $ref: '#/components/schemas/Error'
 */

class RoleController {
  async getAll(req, res, next) {
    try {
      const roles = await RoleService.getAll();
      res.json({
        success: true,
        data: roles
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const role = await RoleService.getById(req.params.id);
      if (!role) {
        return res.status(404).json({
          success: false,
          message: "Role not found"
        });
      }
      res.json({
        success: true,
        data: role
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const role = await RoleService.create(req.body);
      res.status(201).json({
        success: true,
        data: role
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const role = await RoleService.update(req.params.id, req.body);
      if (!role) {
        return res.status(404).json({
          success: false,
          message: "Role not found"
        });
      }
      res.json({
        success: true,
        data: role
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await RoleService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Role not found"
        });
      }
      res.json({
        success: true,
        message: "Role deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RoleController();
