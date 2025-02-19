const WageTypeService = require("../services/WageTypeService");

class WageTypeController {
  async getAll(req, res, next) {
    try {
      const wageTypes = await WageTypeService.getAll(req.query);
      res.json({
        success: true,
        data: wageTypes
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const wageType = await WageTypeService.getById(req.params.id);
      if (!wageType) {
        return res.status(404).json({
          success: false,
          message: "Wage type not found"
        });
      }
      res.json({
        success: true,
        data: wageType
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const wageType = await WageTypeService.create(req.body);
      res.status(201).json({
        success: true,
        data: wageType
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const wageType = await WageTypeService.update(req.params.id, req.body);
      if (!wageType) {
        return res.status(404).json({
          success: false,
          message: "Wage type not found"
        });
      }
      res.json({
        success: true,
        data: wageType
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await WageTypeService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Wage type not found"
        });
      }
      res.json({
        success: true,
        message: "Wage type deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WageTypeController();
