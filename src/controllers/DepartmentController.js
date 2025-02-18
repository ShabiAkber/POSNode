const DepartmentService = require("../services/DepartmentService");

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Department management endpoints
 * 
 * /api/departments:
 *   get:
 *     summary: Get all departments
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all departments
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
 *                     $ref: '#/components/schemas/Department'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server Error
 *         $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Create a new department
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Dept_Name:
 *                 type: string
 *                 example: "Sales Department"
 *               Dept_Description:
 *                 type: string
 *                 example: "Handles all sales operations"
 *               IsActive:
 *                 type: boolean
 *                 example: true
 *             required:
 *               - Dept_Name
 *     responses:
 *       201:
 *         description: Department created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Department'
 *       400:
 *         description: Invalid input
 *         $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 * 
 * /api/departments/{id}:
 *   get:
 *     summary: Get department by ID
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Department ID
 *     responses:
 *       200:
 *         description: Department details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Department'
 *       404:
 *         description: Department not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Update department
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Department ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Dept_Name:
 *                 type: string
 *                 example: "Updated Sales Department"
 *               Dept_Description:
 *                 type: string
 *                 example: "Updated department description"
 *               IsActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Department updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Department'
 *       404:
 *         description: Department not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Delete department
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Department ID
 *     responses:
 *       200:
 *         description: Department deleted successfully
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
 *                   example: "Department deleted successfully"
 *       404:
 *         description: Department not found
 *         $ref: '#/components/schemas/Error'
 */

class DepartmentController {
  async getAll(req, res, next) {
    try {
      const departments = await DepartmentService.getAll();
      res.json({
        success: true,
        data: departments
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const department = await DepartmentService.getById(req.params.id);
      if (!department) {
        return res.status(404).json({
          success: false,
          message: "Department not found"
        });
      }
      res.json({
        success: true,
        data: department
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const department = await DepartmentService.create(req.body);
      res.status(201).json({
        success: true,
        data: department
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const department = await DepartmentService.update(req.params.id, req.body);
      if (!department) {
        return res.status(404).json({
          success: false,
          message: "Department not found"
        });
      }
      res.json({
        success: true,
        data: department
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await DepartmentService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Department not found"
        });
      }
      res.json({
        success: true,
        message: "Department deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DepartmentController();
