const UserTypeService = require("../services/UserTypeService");

class UserTypeController {
  async getAll(req, res, next) {
    try {
      const userTypes = await UserTypeService.getAll(req.query);
      res.json({
        success: true,
        data: userTypes
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const userType = await UserTypeService.getById(req.params.id);
      if (!userType) {
        return res.status(404).json({
          success: false,
          message: "User type not found"
        });
      }
      res.json({
        success: true,
        data: userType
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const userType = await UserTypeService.create(req.body);
      res.status(201).json({
        success: true,
        data: userType
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const userType = await UserTypeService.update(req.params.id, req.body);
      if (!userType) {
        return res.status(404).json({
          success: false,
          message: "User type not found"
        });
      }
      res.json({
        success: true,
        data: userType
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await UserTypeService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "User type not found"
        });
      }
      res.json({
        success: true,
        message: "User type deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserTypeController();
