const paymentStatusesService = require("../services/PaymentStatusesService");

class PaymentStatusesController {
  async getAll(req, res) {
    try {
      const statuses = await paymentStatusesService.getAll(req.query);
      res.status(200).json(statuses);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const status = await paymentStatusesService.getById(req.params.id);
      if (!status) return res.status(404).json({ message: "Payment Status not found" });
      res.status(200).json(status);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const status = await paymentStatusesService.create(req.body);
      res.status(201).json(status);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const status = await paymentStatusesService.update(req.params.id, req.body);
      if (!status) return res.status(404).json({ message: "Payment Status not found" });
      res.status(200).json(status);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const status = await paymentStatusesService.delete(req.params.id);
      if (!status) return res.status(404).json({ message: "Payment Status not found" });
      res.status(200).json({ message: "Payment Status deleted" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new PaymentStatusesController();
