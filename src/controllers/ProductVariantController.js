const ProductVariantService = require("../services/ProductVariantService");

class ProductVariantController {
  async getAll(req, res, next) {
    try {
      const productVariants = await ProductVariantService.getAll(req.query);
      res.json({
        success: true,
        data: productVariants
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const productVariant = await ProductVariantService.getById(req.params.id);
      if (!productVariant) {
        return res.status(404).json({
          success: false,
          message: "Product variant not found"
        });
      }
      res.json({
        success: true,
        data: productVariant
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const productVariant = await ProductVariantService.create(req.body);
      res.json({
        success: true,
        data: productVariant
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const productVariant = await ProductVariantService.update(req.params.id, req.body);
      res.json({
        success: true,
        data: productVariant
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await ProductVariantService.delete(req.params.id);
      res.json({
        success: true,
        message: "Product variant deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductVariantController();

