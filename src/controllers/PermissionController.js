const PermissionService = require("../services/PermissionService");

class PermissionController {
  async getAll(req, res, next) {
    try {
      const permissions = await PermissionService.getAll(req.query);
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
