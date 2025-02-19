const OrderDetailService = require("../services/OrderDetailService");

class OrderDetailController {
  async getAll(req, res, next) {
    try {
      const orderDetails = await OrderDetailService.getAll(req.query);
      res.json({
        success: true,
        data: orderDetails
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const orderDetail = await OrderDetailService.getById(req.params.id);
      if (!orderDetail) {
        return res.status(404).json({
          success: false,
          message: "Order detail not found"
        });
      }
      res.json({
        success: true,
        data: orderDetail
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const orderDetail = await OrderDetailService.create(req.body);
      res.status(201).json({
        success: true,
        data: orderDetail
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const orderDetail = await OrderDetailService.update(req.params.id, req.body);
      if (!orderDetail) {
        return res.status(404).json({
          success: false,
          message: "Order detail not found"
        });
      }
      res.json({
        success: true,
        data: orderDetail
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await OrderDetailService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Order detail not found"
        });
      }
      res.json({
        success: true,
        message: "Order detail deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderDetailController();
