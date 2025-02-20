const express = require("express");
const router = express.Router();
const productAddOnController = require("../controllers/ProductAddOnController");

router.get("/", productAddOnController.getAll);
router.get("/:id", productAddOnController.getById);
router.post("/", productAddOnController.create);
router.put("/:id", productAddOnController.update);
router.delete("/:id", productAddOnController.delete);

module.exports = router;
