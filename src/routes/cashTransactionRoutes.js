const express = require("express");
const cashTransactionController = require("../controllers/CashTransactionController");

const router = express.Router();

router.get("/", cashTransactionController.getAll);
router.get("/:id", cashTransactionController.getById);
router.post("/", cashTransactionController.create);
router.put("/:id", cashTransactionController.update);
router.delete("/:id", cashTransactionController.delete);

module.exports = router;
