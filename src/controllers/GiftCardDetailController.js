const GiftCardDetailService = require("../services/GiftCardDetailService");

class GiftCardDetailController {
  async getAll(req, res) {
    try {
      const data = await GiftCardDetailService.getAll();
      res.status(200).json(data);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const data = await GiftCardDetailService.getById(req.params.id);
      if (!data) return res.status(404).json({ message: "Gift Card not found" });
      res.status(200).json(data);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const data = await GiftCardDetailService.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const data = await GiftCardDetailService.update(req.params.id, req.body);
      if (!data) return res.status(404).json({ message: "Gift Card not found" });
      res.status(200).json(data);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const data = await GiftCardDetailService.delete(req.params.id);
      if (!data) return res.status(404).json({ message: "Gift Card not found" });
      res.status(200).json({ message: "Gift Card deleted successfully" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new GiftCardDetailController();
