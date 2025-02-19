const RoleService = require("../services/RoleService");

class RoleController {
  async getAll(req, res, next) {
    try {
      const roles = await RoleService.getAll(req.query);
      res.json({
        success: true,
        data: roles
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const role = await RoleService.getById(req.params.id);
      if (!role) {
        return res.status(404).json({
          success: false,
          message: "Role not found"
        });
      }
      res.json({
        success: true,
        data: role
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const role = await RoleService.create(req.body);
      res.status(201).json({
        success: true,
        data: role
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const role = await RoleService.update(req.params.id, req.body);
      if (!role) {
        return res.status(404).json({
          success: false,
          message: "Role not found"
        });
      }
      res.json({
        success: true,
        data: role
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await RoleService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Role not found"
        });
      }
      res.json({
        success: true,
        message: "Role deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RoleController();
