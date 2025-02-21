const categoryService = require("../services/CategoryService");

class CategoryController {
  async getAll(req, res, next) {
    try {
      const categories = await categoryService.getAll(req.query);
      res.json({
        success: true,
        data: categories
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await categoryService.getById(id);
      if (!category) return res.status(404).json({ message: "Category not found" });
      res.json({
        success: true,
        data: category
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res, next) {
    try {
      const newCategory = await categoryService.create(req.body);
      res.status(201).json({
        success: true,
        data: newCategory
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedCategory = await categoryService.update(id, req.body);
      if (!updatedCategory) return res.status(404).json({ message: "Category not found" });
      res.json({
        success: true,
        data: updatedCategory
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedCategory = await categoryService.delete(id);
      if (!deletedCategory) return res.status(404).json({ message: "Category not found" });
      res.json({
        success: true,
        message: "Category deleted successfully"
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new CategoryController();
