const genModifireService = require("../services/GenModifireService");

class GenModifireController {
  async getAll(req, res, next) {
    try {
      const genModifires = await genModifireService.getAll(req.query);
      res.json({
        success: true,
        data: genModifires
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const genModifire = await genModifireService.getById(id);
      if (!genModifire) return res.status(404).json({ message: "GenModifire not found" });
      res.json({
        success: true,
        data: genModifire
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res, next) {
    try {
      const newGenModifire = await genModifireService.create(req.body);
      res.status(201).json({
        success: true,
        data: newGenModifire
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedGenModifire = await genModifireService.update(id, req.body);
      if (!updatedGenModifire) return res.status(404).json({ message: "GenModifire not found" });
      res.json({
        success: true,
        data: updatedGenModifire
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedGenModifire = await genModifireService.delete(id);
      if (!deletedGenModifire) return res.status(404).json({ message: "GenModifire not found" });
      res.json({
        success: true,
        message: "GenModifire deleted successfully"
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new GenModifireController();
