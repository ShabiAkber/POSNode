const express = require("express");
const BranchService = require("../services/BranchService");

/**
 * @swagger
 * tags:
 *   name: Branches
 *   description: Branch management endpoints
 * 
 * /api/branches:
 *   get:
 *     summary: Get all branches
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all branches
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
 *                     $ref: '#/components/schemas/Branch'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server Error
 *         $ref: '#/components/schemas/Error'
 * 
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Branch_Name:
 *                 type: string
 *                 example: "Main Branch"
 *               Branch_Address:
 *                 type: string
 *                 example: "123 Main Street"
 *               Branch_City:
 *                 type: string
 *                 example: "New York"
 *               Branch_State:
 *                 type: string
 *                 example: "NY"
 *               Branch_Country:
 *                 type: string
 *                 example: "USA"
 *               IsActive:
 *                 type: boolean
 *                 example: true
 *             required:
 *               - Branch_Name
 *     responses:
 *       201:
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid input
 *         $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         $ref: '#/components/schemas/Error'
 * 
 * /api/branches/{id}:
 *   get:
 *     summary: Get branch by ID
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID
 *     responses:
 *       200:
 *         description: Branch details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Branch'
 *       404:
 *         description: Branch not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   put:
 *     summary: Update branch
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BranchInput'
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Branch'
 *       404:
 *         description: Branch not found
 *         $ref: '#/components/schemas/Error'
 * 
 *   delete:
 *     summary: Delete branch
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID
 *     responses:
 *       200:
 *         description: Branch deleted successfully
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
 *                   example: "Branch deleted successfully"
 *       404:
 *         description: Branch not found
 *         $ref: '#/components/schemas/Error'
 */

class BranchController {
  async getAll(req, res, next) {
    try {
      const branches = await BranchService.getAll();
      res.json({
        success: true,
        data: branches
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const branch = await BranchService.getById(req.params.id);
      if (!branch) {
        return res.status(404).json({
          success: false,
          message: "Branch not found"
        });
      }
      res.json({
        success: true,
        data: branch
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const branch = await BranchService.create(req.body);
      res.status(201).json({
        success: true,
        data: branch
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const branch = await BranchService.update(req.params.id, req.body);
      if (!branch) {
        return res.status(404).json({
          success: false,
          message: "Branch not found"
        });
      }
      res.json({
        success: true,
        data: branch
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await BranchService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Branch not found"
        });
      }
      res.json({
        success: true,
        message: "Branch deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BranchController();
