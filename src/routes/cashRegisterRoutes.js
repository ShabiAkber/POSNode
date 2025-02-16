const express = require("express");
const cashRegisterController = require("../controllers/CashRegisterController");

const router = express.Router();

router.get("/", cashRegisterController.getAll);
router.get("/:id", cashRegisterController.getById);
router.post("/", cashRegisterController.create);
router.put("/:id", cashRegisterController.update);
router.delete("/:id", cashRegisterController.delete);

module.exports = router;
