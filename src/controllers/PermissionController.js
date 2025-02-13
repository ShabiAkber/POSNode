const permissionService = require("../services/PermissionService");

class PermissionController {
  async getAll(req, res) {
    try {
      const permissions = await permissionService.getAll();
      res.status(200).json(permissions);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const permission = await permissionService.getById(req.params.id);
      if (!permission) return res.status(404).json({ message: "Permission not found" });
      res.status(200).json(permission);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const permission = await permissionService.create(req.body);
      res.status(201).json(permission);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const permission = await permissionService.update(req.params.id, req.body);
      if (!permission) return res.status(404).json({ message: "Permission not found" });
      res.status(200).json(permission);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const permission = await permissionService.delete(req.params.id);
      if (!permission) return res.status(404).json({ message: "Permission not found" });
      res.status(200).json({ message: "Permission deleted" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new PermissionController();
