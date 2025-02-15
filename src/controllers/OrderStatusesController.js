const orderStatusesService = require("../services/OrderStatusesService");

class OrderStatusesController {
  async getAll(req, res) {
    try {
      const orderStatuses = await orderStatusesService.getAll();
      res.status(200).json(orderStatuses);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const orderStatus = await orderStatusesService.getById(req.params.id);
      if (!orderStatus) return res.status(404).json({ message: "Order Status not found" });
      res.status(200).json(orderStatus);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const orderStatus = await orderStatusesService.create(req.body);
      res.status(201).json(orderStatus);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const orderStatus = await orderStatusesService.update(req.params.id, req.body);
      if (!orderStatus) return res.status(404).json({ message: "Order Status not found" });
      res.status(200).json(orderStatus);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const orderStatus = await orderStatusesService.delete(req.params.id);
      if (!orderStatus) return res.status(404).json({ message: "Order Status not found" });
      res.status(200).json({ message: "Order Status deleted" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new OrderStatusesController();
