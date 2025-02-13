const express = require("express");
const paymentStatusesController = require("../controllers/PaymentStatusesController");

const router = express.Router();

router.get("/", paymentStatusesController.getAll);
router.get("/:id", paymentStatusesController.getById);
router.post("/", paymentStatusesController.create);
router.put("/:id", paymentStatusesController.update);
router.delete("/:id", paymentStatusesController.delete);

module.exports = router;
