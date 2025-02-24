const paymentStatusesService = require("../services/PaymentStatusesService");

class PaymentStatusesController {
  async getAll(req, res, next) {
    try {
      const statuses = await paymentStatusesService.getAll(req.query);
      res.status(200).json({
        success: true,
        data: statuses
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res, next) {
    try {
      const status = await paymentStatusesService.getById(req.params.id);
      if (!status) return res.status(404).json({ message: "Payment Status not found" });
      res.status(200).json({
        success: true,
        data: status
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res, next) {
    try {
      const status = await paymentStatusesService.create(req.body);
      res.status(201).json({
        success: true,
        data: status
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res, next) {
    try {
      const status = await paymentStatusesService.update(req.params.id, req.body);
      if (!status) return res.status(404).json({ message: "Payment Status not found" });
      res.status(200).json({
        success: true,
        data: status
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res, next) {
    try {
      const status = await paymentStatusesService.delete(req.params.id);
      if (!status) return res.status(404).json({ message: "Payment Status not found" });
      res.status(200).json({
        success: true,
        message: "Payment Status deleted"
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new PaymentStatusesController();
