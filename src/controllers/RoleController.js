const roleService = require("../services/RoleService");

class RoleController {
  async getAll(req, res) {
    try {
      const roles = await roleService.getAll();
      res.status(200).json(roles);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const role = await roleService.getById(req.params.id);
      if (!role) return res.status(404).json({ message: "Role not found" });
      res.status(200).json(role);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const role = await roleService.create(req.body);
      res.status(201).json(role);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const role = await roleService.update(req.params.id, req.body);
      if (!role) return res.status(404).json({ message: "Role not found" });
      res.status(200).json(role);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const role = await roleService.delete(req.params.id);
      if (!role) return res.status(404).json({ message: "Role not found" });
      res.status(200).json({ message: "Role deleted" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new RoleController();
