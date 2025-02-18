const genModifireService = require("../services/GenModifireService");

class GenModifireController {
  async getAll(req, res) {
    try {
      const genModifires = await genModifireService.getAll(req.query);
      res.json(genModifires);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const genModifire = await genModifireService.getById(id);
      if (!genModifire) return res.status(404).json({ message: "GenModifire not found" });
      res.json(genModifire);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const newGenModifire = await genModifireService.create(req.body);
      res.status(201).json(newGenModifire);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedGenModifire = await genModifireService.update(id, req.body);
      if (!updatedGenModifire) return res.status(404).json({ message: "GenModifire not found" });
      res.json(updatedGenModifire);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedGenModifire = await genModifireService.delete(id);
      if (!deletedGenModifire) return res.status(404).json({ message: "GenModifire not found" });
      res.json({ message: "GenModifire deleted successfully" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new GenModifireController();
