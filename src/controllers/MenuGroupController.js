const menuGroupService = require("../services/MenuGroupService");

class MenuGroupController {
  async getAll(req, res, next) {
    try {
      const menuGroups = await menuGroupService.getAll(req.query);
      res.json({
        success: true,
        data: menuGroups
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const menuGroup = await menuGroupService.getById(id);
      if (!menuGroup) return res.status(404).json({ message: "MenuGroup not found" });
      res.json({
        success: true,
        data: menuGroup
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res, next) {
    try {
      // Example request body:
      // {
      //   "menuVersionPKs": ["0000000001", "0000000002"],
      //   "MenuGrp_Name": "Breakfast Menu",
      //   "MenuGrp_BranchFK": "0000000001"
      // }

      const menuGroups = await menuGroupService.createMultiple(req.body);
      res.status(201).json({
        success: true,
        data: menuGroups
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedMenuGroup = await menuGroupService.update(id, req.body);
      if (!updatedMenuGroup) return res.status(404).json({ message: "MenuGroup not found" });
      res.json({
        success: true,
        data: updatedMenuGroup
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedMenuGroup = await menuGroupService.delete(id);
      if (!deletedMenuGroup) return res.status(404).json({ message: "MenuGroup not found" });
      res.json({
        success: true,
        message: "Menu Group deleted successfully"
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new MenuGroupController();
