const express = require("express");
const orderDealController = require("../controllers/OrderDealController");

const router = express.Router();

// 🔹 Define Routes
router.get("/", (req, res) => orderDealController.getAll(req, res));
router.get("/:id", (req, res) => orderDealController.getById(req, res));
router.post("/", (req, res) => orderDealController.create(req, res));
router.put("/:id", (req, res) => orderDealController.update(req, res));
router.delete("/:id", (req, res) => orderDealController.delete(req, res));

// 🔹 Custom Routes
router.get("/details/all", (req, res) => orderDealController.getAllWithDetails(req, res));
router.get("/details/:id", (req, res) => orderDealController.getByIdWithDetails(req, res));

module.exports = router;
