const orderService = require("../services/OrderService");

class OrderController {
  async getAll(req, res) {
    try {
      const orders = await orderService.getAll();
      res.status(200).json(orders);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const order = await orderService.getById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json(order);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const order = await orderService.create(req.body);
      res.status(201).json(order);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const order = await orderService.update(req.params.id, req.body);
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json(order);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const order = await orderService.delete(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json({ message: "Order deleted" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new OrderController();
