const express = require("express");
const orderController = require("../controllers/OrderController");

const router = express.Router();

router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);
router.post("/", orderController.create);
router.put("/:id", orderController.update);
router.delete("/:id", orderController.delete);

module.exports = router;
