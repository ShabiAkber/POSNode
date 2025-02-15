const express = require("express");
const router = express.Router();
const VoucherCardDetailController = require("../controllers/VoucherCardDetailController");

router.get("/", VoucherCardDetailController.getAll);
router.get("/:id", VoucherCardDetailController.getById);
router.post("/", VoucherCardDetailController.create);
router.put("/:id", VoucherCardDetailController.update);
router.delete("/:id", VoucherCardDetailController.delete);

module.exports = router;
