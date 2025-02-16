const tableDineInService = require("../services/TableDineInService");

class TableDineInController {
  async getAll(req, res) {
    try {
      const rolePermissions = await tableDineInService.getAll();
      res.status(200).json(rolePermissions);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const rolePermission = await tableDineInService.getById(req.params.id);
      if (!rolePermission) return res.status(404).json({ message: "RolePermission not found" });
      res.status(200).json(rolePermission);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const rolePermission = await tableDineInService.create(req.body);
      res.status(201).json(rolePermission);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const rolePermission = await tableDineInService.update(req.params.id, req.body);
      if (!rolePermission) return res.status(404).json({ message: "RolePermission not found" });
      res.status(200).json(rolePermission);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const rolePermission = await tableDineInService.delete(req.params.id);
      if (!rolePermission) return res.status(404).json({ message: "RolePermission not found" });
      res.status(200).json({ message: "RolePermission deleted" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new TableDineInController();
