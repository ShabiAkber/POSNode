const paymentTypesService = require("../services/PaymentTypesService");

class PaymentTypesController {
  async getAll(req, res, next) {

    try {
      const paymentTypes = await paymentTypesService.getAll(req.query);
      res.status(200).json({
        success: true,
        data: paymentTypes
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res, next) {
    try {
      const paymentType = await paymentTypesService.getById(req.params.id);
      if (!paymentType) return res.status(404).json({ message: "Payment Type not found" });
      res.status(200).json({
        success: true,
        data: paymentType
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res, next) {
    try {
      const paymentType = await paymentTypesService.create(req.body);
      res.status(201).json({
        success: true,
        data: paymentType
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res, next) {
    try {
      const paymentType = await paymentTypesService.update(req.params.id, req.body);
      if (!paymentType) return res.status(404).json({ message: "Payment Type not found" });
      res.status(200).json({
        success: true,
        data: paymentType
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res, next) {
    try {
      const paymentType = await paymentTypesService.delete(req.params.id);
      if (!paymentType) return res.status(404).json({ message: "Payment Type not found" });
      res.status(200).json({
        success: true,
        message: "Payment Type deleted"
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new PaymentTypesController();
