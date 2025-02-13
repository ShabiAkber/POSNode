const express = require("express");
const paymentTypesController = require("../controllers/PaymentTypesController");

const router = express.Router();

router.get("/", paymentTypesController.getAll);
router.get("/:id", paymentTypesController.getById);
router.post("/", paymentTypesController.create);
router.put("/:id", paymentTypesController.update);
router.delete("/:id", paymentTypesController.delete);

module.exports = router;
