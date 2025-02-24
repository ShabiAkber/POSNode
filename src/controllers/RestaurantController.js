const express = require("express");
const RestaurantService = require("../services/RestaurantService");

class RestaurantController {
  async getAll(req, res, next) {
    try {
      const restaurants = await RestaurantService.getAll();
      res.json({
        success: true,
        data: restaurants
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const restaurant = await RestaurantService.getById(req.params.id);
      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: "Restaurant not found"
        });
      }
      res.json({
        success: true,
        data: restaurant
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const restaurant = await RestaurantService.create(req.body);
      res.status(201).json({
        success: true,
        data: restaurant
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const restaurant = await RestaurantService.update(req.params.id, req.body);
      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: "Restaurant not found"
        });
      }
      res.json({
        success: true,
        data: restaurant
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await RestaurantService.delete(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Restaurant not found"
        });
      }
      res.json({
        success: true,
        message: "Restaurant deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RestaurantController();
