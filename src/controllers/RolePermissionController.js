const rolePermissionService = require("../services/RolePermissionService");

class RolePermissionController {
  async getAll(req, res) {
    try {
      const rolePermissions = await rolePermissionService.getAll();
      res.status(200).json(rolePermissions);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const rolePermission = await rolePermissionService.getById(req.params.id);
      if (!rolePermission) return res.status(404).json({ message: "RolePermission not found" });
      res.status(200).json(rolePermission);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const rolePermission = await rolePermissionService.create(req.body);
      res.status(201).json(rolePermission);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
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

  async delete(req, res) {
    try {
      const rolePermission = await rolePermissionService.delete(req.params.id);
      if (!rolePermission) return res.status(404).json({ message: "RolePermission not found" });
      res.status(200).json({ message: "RolePermission deleted" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new RolePermissionController();
