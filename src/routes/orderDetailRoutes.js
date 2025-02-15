const express = require("express");
const orderDetailController = require("../controllers/OrderDetailController");

const router = express.Router();

router.get("/", orderDetailController.getAll);
router.get("/:id", orderDetailController.getById);
router.post("/", orderDetailController.create);
router.put("/:id", orderDetailController.update);
router.delete("/:id", orderDetailController.delete);

module.exports = router;
