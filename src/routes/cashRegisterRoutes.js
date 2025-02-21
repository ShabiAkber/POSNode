const express = require("express");
const router = express.Router();
const CashRegisterController = require("../controllers/CashRegisterController");

// Define routes
router.get("/", CashRegisterController.getAll);
router.get("/:id", CashRegisterController.getById);
router.post("/", CashRegisterController.create);
router.put("/:id", CashRegisterController.update);
router.delete("/:id", CashRegisterController.delete);

module.exports = router;
