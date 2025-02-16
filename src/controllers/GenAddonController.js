const genAddonService = require("../services/GenAddonService");

class GenAddonController {
  async getAll(req, res) {
    try {
      const genAddons = await genAddonService.getAll();
      res.json(genAddons);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const genAddon = await genAddonService.getById(id);
      if (!genAddon) return res.status(404).json({ message: "GenAddon not found" });
      res.json(genAddon);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const newGenAddon = await genAddonService.create(req.body);
      res.status(201).json(newGenAddon);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedGenAddon = await genAddonService.update(id, req.body);
      if (!updatedGenAddon) return res.status(404).json({ message: "GenAddon not found" });
      res.json(updatedGenAddon);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedGenAddon = await genAddonService.delete(id);
      if (!deletedGenAddon) return res.status(404).json({ message: "GenAddon not found" });
      res.json({ message: "GenAddon deleted successfully" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new GenAddonController();
