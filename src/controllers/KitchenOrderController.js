const KitchenOrderService = require("../services/KitchenOrderService");

class KitchenOrderController {
  async getAll(req, res, next) {
    try {
      const kitchenOrders = await KitchenOrderService.getAll(req.query);
      res.json({
        success: true,
        data: kitchenOrders
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const kitchenOrder = await KitchenOrderService.getById(req.params.id);
      if (!kitchenOrder) {
        return res.status(404).json({
          success: false,
          message: "Kitchen order not found"
        });
      }
      res.json({
        success: true,
        data: kitchenOrder
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const kitchenOrder = await KitchenOrderService.create(req.body);
      res.json({
        success: true,
        data: kitchenOrder
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const kitchenOrder = await KitchenOrderService.update(req.params.id, req.body);
      res.json({
        success: true,
        data: kitchenOrder
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await KitchenOrderService.delete(req.params.id);
      res.json({
        success: true,
        message: "Kitchen order deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new KitchenOrderController();


