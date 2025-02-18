const kitWiseCatService = require("../services/KitWiseCatService");

class KitWiseCatController {
  async getAll(req, res) {
    try {
      const kitWiseCats = await kitWiseCatService.getAll(req.query);
      res.json(kitWiseCats);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const kitWiseCat = await kitWiseCatService.getById(id);
      if (!kitWiseCat) return res.status(404).json({ message: "KitWiseCat not found" });
      res.json(kitWiseCat);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const newKitWiseCat = await kitWiseCatService.create(req.body);
      res.status(201).json(newKitWiseCat);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedKitWiseCat = await kitWiseCatService.update(id, req.body);
      if (!updatedKitWiseCat) return res.status(404).json({ message: "KitWiseCat not found" });
      res.json(updatedKitWiseCat);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedKitWiseCat = await kitWiseCatService.delete(id);
      if (!deletedKitWiseCat) return res.status(404).json({ message: "KitWiseCat not found" });
      res.json({ message: "KitWiseCat deleted successfully" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new KitWiseCatController();
