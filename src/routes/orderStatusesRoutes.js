const express = require("express");
const orderStatusesController = require("../controllers/OrderStatusesController");

const router = express.Router();

router.get("/", orderStatusesController.getAll);
router.get("/:id", orderStatusesController.getById);
router.post("/", orderStatusesController.create);
router.put("/:id", orderStatusesController.update);
router.delete("/:id", orderStatusesController.delete);

module.exports = router;
