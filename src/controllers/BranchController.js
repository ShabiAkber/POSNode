const express = require("express");
const BranchService = require("../services/BranchService");

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
