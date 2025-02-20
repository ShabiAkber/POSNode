const express = require("express");
const router = express.Router();
const kitchenOrderController = require("../controllers/KitchenOrderController");

router.get("/", kitchenOrderController.getAll);
router.get("/:id", kitchenOrderController.getById);
router.post("/", kitchenOrderController.create);
router.put("/:id", kitchenOrderController.update);
router.delete("/:id", kitchenOrderController.delete);

module.exports = router;