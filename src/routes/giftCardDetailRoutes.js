const express = require("express");
const GiftCardDetailController = require("../controllers/GiftCardDetailController");

const router = express.Router();

router.get("/", GiftCardDetailController.getAll);
router.get("/:id", GiftCardDetailController.getById);
router.post("/", GiftCardDetailController.create);
router.put("/:id", GiftCardDetailController.update);
router.delete("/:id", GiftCardDetailController.delete);

module.exports = router;
