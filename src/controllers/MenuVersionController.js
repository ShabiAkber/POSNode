const menuVersionService = require("../services/MenuVersionService");

class MenuVersionController {
  async getAll(req, res, next) {
    try {
      const menuVersions = await menuVersionService.getAll(req.query);
      res.json({
        success: true,
        data: menuVersions
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const menuVersion = await menuVersionService.getById(req.params.id);
      if (!menuVersion) {
        return res.status(404).json({
          success: false,
          message: "Menu Version not found"
        });
      }
      res.json({
        success: true,
        data: menuVersion
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      // Example request body:
      // {
      //   "branchPKs": ["0000000001", "0000000002"],
      //   "MenuVer_Name": "Summer Menu 2024"
      // }

      const menuVersions = await menuVersionService.createMultiple(req.body);
      res.status(201).json({
        success: true,
        data: menuVersions
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const menuVersion = await menuVersionService.update(req.params.id, req.body);
      if (!menuVersion) {
        return res.status(404).json({
          success: false,
          message: "Menu Version not found"
        });
      }
      res.json({
        success: true,
        data: menuVersion
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await menuVersionService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Menu Version not found"
        });
      }
      res.json({
        success: true,
        message: "Menu Version deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MenuVersionController();
