const inventoriesService = require("../services/InventoriesService");

class InventoriesController {
  async getAll(req, res) {
    try {
      const inventories = await inventoriesService.getAll();
      res.json(inventories);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const inventory = await inventoriesService.getById(id);
      if (!inventory) return res.status(404).json({ message: "Inventory not found" });
      res.json(inventory);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const newInventory = await inventoriesService.create(req.body);
      res.status(201).json(newInventory);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedInventory = await inventoriesService.update(id, req.body);
      if (!updatedInventory) return res.status(404).json({ message: "Inventory not found" });
      res.json(updatedInventory);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedInventory = await inventoriesService.delete(id);
      if (!deletedInventory) return res.status(404).json({ message: "Inventory not found" });
      res.json({ message: "Inventory deleted successfully" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new InventoriesController();
