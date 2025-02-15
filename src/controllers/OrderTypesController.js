const orderTypesService = require("../services/OrderTypesService");

class OrderTypesController {
  async getAll(req, res) {
    try {
      const orderTypes = await orderTypesService.getAll();
      res.status(200).json(orderTypes);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const orderType = await orderTypesService.getById(req.params.id);
      if (!orderType) return res.status(404).json({ message: "Order Type not found" });
      res.status(200).json(orderType);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const orderType = await orderTypesService.create(req.body);
      res.status(201).json(orderType);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const orderType = await orderTypesService.update(req.params.id, req.body);
      if (!orderType) return res.status(404).json({ message: "Order Type not found" });
      res.status(200).json(orderType);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const orderType = await orderTypesService.delete(req.params.id);
      if (!orderType) return res.status(404).json({ message: "Order Type not found" });
      res.status(200).json({ message: "Order Type deleted" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new OrderTypesController();
