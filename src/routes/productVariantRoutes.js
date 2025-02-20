const express = require("express");
const router = express.Router();
const productVariantController = require("../controllers/ProductVariantController");

router.get("/", productVariantController.getAll);
router.get("/:id", productVariantController.getById);
router.post("/", productVariantController.create);
router.put("/:id", productVariantController.update);
router.delete("/:id", productVariantController.delete);

module.exports = router;