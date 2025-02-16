const express = require("express");
const kitchenSectionController = require("../controllers/KitchenSectionController");

const router = express.Router();

router.get("/", kitchenSectionController.getAll);
router.get("/:id", kitchenSectionController.getById);
router.post("/", kitchenSectionController.create);
router.put("/:id", kitchenSectionController.update);
router.delete("/:id", kitchenSectionController.delete);

module.exports = router;
