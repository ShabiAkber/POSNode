const OrderService = require("../services/OrderService");

class OrderController {
  async getAll(req, res, next) {
    try {
      const orders = await OrderService.getAll(req.query);
      res.json({
        success: true,
        data: orders
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const order = await OrderService.getById(req.params.id);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }
      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const order = await OrderService.create(req.body);
      res.status(201).json({
        success: true,
        data: order
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const order = await OrderService.update(req.params.id, req.body);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }
      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await OrderService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }
      res.json({
        success: true,
        message: "Order deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
