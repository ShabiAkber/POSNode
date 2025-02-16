const express = require("express");
const inventoriesController = require("../controllers/InventoriesController");

const router = express.Router();

router.get("/", inventoriesController.getAll);
router.get("/:id", inventoriesController.getById);
router.post("/", inventoriesController.create);
router.put("/:id", inventoriesController.update);
router.delete("/:id", inventoriesController.delete);

module.exports = router;
