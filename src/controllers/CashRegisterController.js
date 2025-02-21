const CashRegisterService = require("../services/CashRegisterService");

class CashRegisterController {
  async getAll(req, res, next) {
    try {
      const cashRegisters = await CashRegisterService.getAll(req.query);
      res.json({
        success: true,
        data: cashRegisters
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const cashRegister = await CashRegisterService.getById(req.params.id);
      if (!cashRegister) {
        return res.status(404).json({
          success: false,
          message: "Cash Register not found"
        });
      }
      res.json({
        success: true,
        data: cashRegister
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const cashRegister = await CashRegisterService.create(req.body);
      res.status(201).json({
        success: true,
        data: cashRegister
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const cashRegister = await CashRegisterService.update(req.params.id, req.body);
      if (!cashRegister) {
        return res.status(404).json({
          success: false,
          message: "Cash Register not found"
        });
      }
      res.json({
        success: true,
        data: cashRegister
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await CashRegisterService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Cash Register not found"
        });
      }
      res.json({
        success: true,
        message: "Cash Register deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CashRegisterController();
