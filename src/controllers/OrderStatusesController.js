const orderStatusesService = require("../services/OrderStatusesService");

class OrderStatusesController {
  async getAll(req, res, next) {
    try {
      const orderStatuses = await orderStatusesService.getAll(req.query);
      res.status(200).json({
        success: true,
        data: orderStatuses
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res, next) {
    try {
      const orderStatus = await orderStatusesService.getById(req.params.id);
      if (!orderStatus) return res.status(404).json({ message: "Order Status not found" });
      res.status(200).json({
        success: true,
        data: orderStatus
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res, next) {
    try {
      const orderStatus = await orderStatusesService.create(req.body);
      res.status(201).json({
        success: true,
        data: orderStatus
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res, next) {
    try {
      const orderStatus = await orderStatusesService.update(req.params.id, req.body);
      if (!orderStatus) return res.status(404).json({ message: "Order Status not found" });
      res.status(200).json({
        success: true,
        data: orderStatus
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res, next) {
    try {
      const orderStatus = await orderStatusesService.delete(req.params.id);
      if (!orderStatus) return res.status(404).json({ message: "Order Status not found" });
      res.status(200).json({
        success: true,
        message: "Order Status deleted"
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new OrderStatusesController();
