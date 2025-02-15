const menuGroupService = require("../services/MenuGroupService");

class MenuGroupController {
  async getAll(req, res) {
    try {
      const menuGroups = await menuGroupService.getAll();
      res.json(menuGroups);
    } catch (err) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const menuGroup = await menuGroupService.getById(id);
      if (!menuGroup) return res.status(404).json({ message: "MenuGroup not found" });
      res.json(menuGroup);
    } catch (err) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const newMenuGroup = await menuGroupService.create(req.body);
      res.status(201).json(newMenuGroup);
    } catch (err) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedMenuGroup = await menuGroupService.update(id, req.body);
      if (!updatedMenuGroup) return res.status(404).json({ message: "MenuGroup not found" });
      res.json(updatedMenuGroup);
    } catch (err) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedMenuGroup = await menuGroupService.delete(id);
      if (!deletedMenuGroup) return res.status(404).json({ message: "MenuGroup not found" });
      res.json({ message: "MenuGroup deleted successfully" });
    } catch (err) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new MenuGroupController();
