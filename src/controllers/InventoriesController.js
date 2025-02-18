const inventoriesService = require("../services/InventoriesService");

class InventoriesController {
  async getAll(req, res, next) {
    try {
      const inventory = await inventoriesService.getAll(req.query);
      res.json({
        success: true,
        data: inventory
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const item = await inventoriesService.getById(req.params.id);
      if (!item) {
        return res.status(404).json({
          success: false,
          message: "Inventory item not found"
        });
      }
      res.json({
        success: true,
        data: item
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const item = await inventoriesService.create(req.body);
      res.status(201).json({
        success: true,
        data: item
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const item = await inventoriesService.update(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({
          success: false,
          message: "Inventory item not found"
        });
      }
      res.json({
        success: true,
        data: item
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await inventoriesService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Inventory item not found"
        });
      }
      res.json({
        success: true,
        message: "Inventory item deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new InventoriesController();
