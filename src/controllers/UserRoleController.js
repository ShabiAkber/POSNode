const userRoleService = require("../services/UserRoleService");

class UserRoleController {
  async getAll(req, res) {
    try {
      const userRoles = await userRoleService.getAll();
      res.status(200).json(userRoles);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const userRole = await userRoleService.getById(req.params.id);
      if (!userRole) return res.status(404).json({ message: "UserRole not found" });
      res.status(200).json(userRole);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const userRole = await userRoleService.create(req.body);
      res.status(201).json(userRole);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const userRole = await userRoleService.update(req.params.id, req.body);
      if (!userRole) return res.status(404).json({ message: "UserRole not found" });
      res.status(200).json(userRole);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const userRole = await userRoleService.delete(req.params.id);
      if (!userRole) return res.status(404).json({ message: "UserRole not found" });
      res.status(200).json({ message: "UserRole deleted" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new UserRoleController();
