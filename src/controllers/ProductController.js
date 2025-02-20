const ProductService = require("../services/ProductService");

class ProductController {
  async getAll(req, res, next) {
    try {
      const products = await ProductService.getAll(req.query);
      res.json({
        success: true,
        data: products
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const product = await ProductService.getById(req.params.id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const product = await ProductService.create(req.body);
      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const product = await ProductService.update(req.params.id, req.body);
      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await ProductService.delete(req.params.id);
      res.json({
        success: true,
        message: "Product deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
