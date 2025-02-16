const menuVersionService = require("../services/MenuVersionService");

class MenuVersionController {
  async getAll(req, res) {
    try {
      const menuVersions = await menuVersionService.getAll();
      res.json(menuVersions);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const menuVersion = await menuVersionService.getById(id);
      if (!menuVersion) return res.status(404).json({ message: "MenuVersion not found" });
      res.json(menuVersion);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const newMenuVersion = await menuVersionService.create(req.body);
      res.status(201).json(newMenuVersion);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedMenuVersion = await menuVersionService.update(id, req.body);
      if (!updatedMenuVersion) return res.status(404).json({ message: "MenuVersion not found" });
      res.json(updatedMenuVersion);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedMenuVersion = await menuVersionService.delete(id);
      if (!deletedMenuVersion) return res.status(404).json({ message: "MenuVersion not found" });
      res.json({ message: "MenuVersion deleted successfully" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new MenuVersionController();
