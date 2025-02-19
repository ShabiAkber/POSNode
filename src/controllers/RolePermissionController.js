const rolePermissionService = require("../services/RolePermissionService");

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
