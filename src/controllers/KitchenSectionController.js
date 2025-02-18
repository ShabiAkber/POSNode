const kitchenSectionService = require("../services/KitchenSectionService");

class KitchenSectionController {
  async getAll(req, res) {
    try {
      const kitchenSections = await kitchenSectionService.getAll(req.query);
      res.json(kitchenSections);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const kitchenSection = await kitchenSectionService.getById(id);
      if (!kitchenSection) return res.status(404).json({ message: "Kitchen Section not found" });
      res.json(kitchenSection);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const newKitchenSection = await kitchenSectionService.create(req.body);
      res.status(201).json(newKitchenSection);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedKitchenSection = await kitchenSectionService.update(id, req.body);
      if (!updatedKitchenSection) return res.status(404).json({ message: "Kitchen Section not found" });
      res.json(updatedKitchenSection);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedKitchenSection = await kitchenSectionService.delete(id);
      if (!deletedKitchenSection) return res.status(404).json({ message: "Kitchen Section not found" });
      res.json({ message: "Kitchen Section deleted successfully" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new KitchenSectionController();
