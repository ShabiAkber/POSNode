const UserRoleService = require("../services/UserRoleService");

class UserRoleController {
  async getAll(req, res, next) {
    try {
      const userRoles = await UserRoleService.getAll(req.query);
      res.json({
        success: true,
        data: userRoles
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const userRole = await UserRoleService.getById(req.params.id);
      if (!userRole) {
        return res.status(404).json({
          success: false,
          message: "User-Role mapping not found"
        });
      }
      res.json({
        success: true,
        data: userRole
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const userRole = await UserRoleService.create(req.body);
      res.status(201).json({
        success: true,
        data: userRole
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res) {
    try {
      const userRole = await UserRoleService.update(req.params.id, req.body);
      if (!userRole) return res.status(404).json({ message: "UserRole not found" });
      res.status(200).json(userRole);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res, next) {
    try {
      const result = await UserRoleService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "User-Role mapping not found"
        });
      }
      res.json({
        success: true,
        message: "User-Role mapping deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserRoleController();
