const tableDineInService = require("../services/TableDineInService");

class TableDineInController {
  async getAll(req, res, next) {
    try {
      const rolePermissions = await tableDineInService.getAll(req.query);
      res.status(200).json({
        success: true,
        data: rolePermissions
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res, next) {
    try {
      const rolePermission = await tableDineInService.getById(req.params.id);
      if (!rolePermission) return res.status(404).json({ message: "RolePermission not found" });
      res.status(200).json({
        success: true,
        data: rolePermission
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res, next) {
    try {
      const rolePermission = await tableDineInService.create(req.body);
      res.status(201).json({
        success: true,
        data: rolePermission
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res, next) {
    try {
      const rolePermission = await tableDineInService.update(req.params.id, req.body);
      if (!rolePermission) return res.status(404).json({ message: "RolePermission not found" });
      res.status(200).json({
        success: true,
        data: rolePermission
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res, next) {
    try {
      const rolePermission = await tableDineInService.delete(req.params.id);
      if (!rolePermission) return res.status(404).json({ message: "RolePermission not found" });
      res.status(200).json({
        success: true,
        message: "RolePermission deleted"
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new TableDineInController();
