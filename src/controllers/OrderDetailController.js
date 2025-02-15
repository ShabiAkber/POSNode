const orderDetailService = require("../services/OrderDetailService");

class OrderDetailController {
  async getAll(req, res) {
    try {
      const orderDetails = await orderDetailService.getAll();
      res.status(200).json(orderDetails);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const orderDetail = await orderDetailService.getById(req.params.id);
      if (!orderDetail) return res.status(404).json({ message: "Order Detail not found" });
      res.status(200).json(orderDetail);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const orderDetail = await orderDetailService.create(req.body);
      res.status(201).json(orderDetail);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const orderDetail = await orderDetailService.update(req.params.id, req.body);
      if (!orderDetail) return res.status(404).json({ message: "Order Detail not found" });
      res.status(200).json(orderDetail);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const orderDetail = await orderDetailService.delete(req.params.id);
      if (!orderDetail) return res.status(404).json({ message: "Order Detail not found" });
      res.status(200).json({ message: "Order Detail deleted" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new OrderDetailController();
