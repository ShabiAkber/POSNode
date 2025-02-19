const DepartmentService = require("../services/DepartmentService");

class DepartmentController {
  async getAll(req, res, next) {
    try {
      const departments = await DepartmentService.getAll(req.query);
      res.json({
        success: true,
        data: departments
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const department = await DepartmentService.getById(req.params.id);
      if (!department) {
        return res.status(404).json({
          success: false,
          message: "Department not found"
        });
      }
      res.json({
        success: true,
        data: department
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const department = await DepartmentService.create(req.body);
      res.status(201).json({
        success: true,
        data: department
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const department = await DepartmentService.update(req.params.id, req.body);
      if (!department) {
        return res.status(404).json({
          success: false,
          message: "Department not found"
        });
      }
      res.json({
        success: true,
        data: department
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await DepartmentService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Department not found"
        });
      }
      res.json({
        success: true,
        message: "Department deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DepartmentController();
