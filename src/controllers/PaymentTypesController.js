const paymentTypesService = require("../services/PaymentTypesService");

class PaymentTypesController {
  async getAll(req, res) {
    try {
      const paymentTypes = await paymentTypesService.getAll();
      res.status(200).json(paymentTypes);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const paymentType = await paymentTypesService.getById(req.params.id);
      if (!paymentType) return res.status(404).json({ message: "Payment Type not found" });
      res.status(200).json(paymentType);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const paymentType = await paymentTypesService.create(req.body);
      res.status(201).json(paymentType);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const paymentType = await paymentTypesService.update(req.params.id, req.body);
      if (!paymentType) return res.status(404).json({ message: "Payment Type not found" });
      res.status(200).json(paymentType);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const paymentType = await paymentTypesService.delete(req.params.id);
      if (!paymentType) return res.status(404).json({ message: "Payment Type not found" });
      res.status(200).json({ message: "Payment Type deleted" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new PaymentTypesController();
