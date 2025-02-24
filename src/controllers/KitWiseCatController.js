const kitWiseCatService = require("../services/KitWiseCatService");

class KitWiseCatController {
  async getAll(req, res, next) {
    try {
      const kitWiseCats = await kitWiseCatService.getAll(req.query);
      res.json({
        success: true,
        data: kitWiseCats
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const kitWiseCat = await kitWiseCatService.getById(id);
      if (!kitWiseCat) return res.status(404).json({ message: "KitWiseCat not found" });
      res.json({
        success: true,
        data: kitWiseCat
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res, next) {
    try {
      const newKitWiseCat = await kitWiseCatService.create(req.body);
      res.status(201).json({
        success: true,
        data: newKitWiseCat
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedKitWiseCat = await kitWiseCatService.update(id, req.body);
      if (!updatedKitWiseCat) return res.status(404).json({ message: "KitWiseCat not found" });
      res.json({
        success: true,
        data: updatedKitWiseCat
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedKitWiseCat = await kitWiseCatService.delete(id);
      if (!deletedKitWiseCat) return res.status(404).json({ message: "KitWiseCat not found" });
      res.json({
        success: true,
        message: "KitWiseCat deleted successfully"
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new KitWiseCatController();
