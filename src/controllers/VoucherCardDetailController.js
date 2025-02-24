const VoucherCardDetailService = require("../services/VoucherCardDetailService");

class VoucherCardDetailController {
  async getAll(req, res, next) {
    try {
      const data = await VoucherCardDetailService.getAll(req.query);
      res.status(200).json({
        success: true,
        data: data
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res, next) {
    try {
      const data = await VoucherCardDetailService.getById(req.params.id);
      if (!data) return res.status(404).json({ message: "Voucher Card not found" });
      res.status(200).json({
        success: true,
        data: data
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res, next) {
    try {
      const data = await VoucherCardDetailService.create(req.body);
      res.status(201).json({
        success: true,
        data: data
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res, next) {
    try {
      const data = await VoucherCardDetailService.update(req.params.id, req.body);
      if (!data) return res.status(404).json({ message: "Voucher Card not found" });
      res.status(200).json({
        success: true,
        data: data
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res, next) {
    try {
      const data = await VoucherCardDetailService.delete(req.params.id);
      if (!data) return res.status(404).json({ message: "Voucher Card not found" });
      res.status(200).json({
        success: true,
        message: "Voucher Card deleted successfully"
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new VoucherCardDetailController();
