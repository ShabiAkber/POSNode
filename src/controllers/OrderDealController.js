const express = require("express");
const orderDealService = require("../services/OrderDealService");

class OrderDealController {
  async getAll(req, res, next) {
    try {
      const result = await orderDealService.getAll(req.query);
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await orderDealService.getById(id);
      if (!result) {
        return res.status(404).json({ message: "OrderDeal not found" });
      }
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res, next) {
    try {
      const result = await orderDealService.create(req.body);
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const result = await orderDealService.update(id, req.body);
      if (!result) {
        return res.status(404).json({ message: "OrderDeal not found" });
      }
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await orderDealService.delete(id);
      if (!result) {
        return res.status(404).json({ message: "OrderDeal not found" });
      }
      res.status(200).json({
        success: true,
        message: "Order Deal deleted successfully"
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  // ✅ Custom Methods
  async getAllWithDetails(req, res, next) {
    try {
      const result = await orderDealService.getAllWithDetails();
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getByIdWithDetails(req, res, next) {
    try {
      const { id } = req.params;
      const result = await orderDealService.getByIdWithDetails(id);
      if (!result) {
        return res.status(404).json({ message: "OrderDeal details not found" });
      }
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new OrderDealController();
