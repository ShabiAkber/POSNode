const genAddonService = require("../services/GenAddonService");

class GenAddonController {
  async getAll(req, res, next) {
    try {
      const genAddons = await genAddonService.getAll(req.query);
      res.json({
        success: true,
        data: genAddons
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res, next) { 
    try {
      const { id } = req.params;
      const genAddon = await genAddonService.getById(id);
      if (!genAddon) return res.status(404).json({ message: "GenAddon not found" });
      res.json({
        success: true,
        data: genAddon
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const genAddon = await genAddonService.getById(id);
      if (!genAddon) return res.status(404).json({ message: "GenAddon not found" });
      res.json({
        success: true,
        data: genAddon
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res, next) {
    try {
      const newGenAddon = await genAddonService.create(req.body);
      res.status(201).json({
        success: true,
        data: newGenAddon
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedGenAddon = await genAddonService.update(id, req.body);
      if (!updatedGenAddon) return res.status(404).json({ message: "GenAddon not found" });
      res.json({
        success: true,
        data: updatedGenAddon
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedGenAddon = await genAddonService.delete(id);
      if (!deletedGenAddon) return res.status(404).json({ message: "GenAddon not found" });
      res.json({
        success: true,
        message: "GenAddon deleted successfully"
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new GenAddonController();
