const express = require("express");
const BranchService = require("../services/BranchService");

class BranchController {
  async getAll(req, res) {
    try {
      const branches = await BranchService.getAll();
      res.json(branches);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const branch = await BranchService.getById(req.params.id);
      if (!branch) return res.status(404).json({ message: "Branch not found" });
      res.json(branch);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const branch = await BranchService.create(req.body);
      res.status(201).json(branch);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const branch = await BranchService.update(req.params.id, req.body);
      res.json(branch);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await BranchService.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BranchController();
