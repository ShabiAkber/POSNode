const ProductAddOnService = require("../services/ProductAddOnService");

class ProductAddOnController {
  async getAll(req, res, next) {
    try {
      const productAddOns = await ProductAddOnService.getAll(req.query);
      res.json({
        success: true,
        data: productAddOns
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const productAddOn = await ProductAddOnService.getById(req.params.id);
      if (!productAddOn) {
        return res.status(404).json({
          success: false,
          message: "Product add-on not found"
        });
      }
      res.json({
        success: true,
        data: productAddOn
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const productAddOn = await ProductAddOnService.create(req.body);
      res.json({
        success: true,
        data: productAddOn
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const productAddOn = await ProductAddOnService.update(req.params.id, req.body);
      res.json({
        success: true,
        data: productAddOn
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await ProductAddOnService.delete(req.params.id);
      res.json({
        success: true,
        message: "Product add-on deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductAddOnController();


