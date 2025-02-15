const express = require("express");
const orderTypesController = require("../controllers/OrderTypesController");

const router = express.Router();

router.get("/", orderTypesController.getAll);
router.get("/:id", orderTypesController.getById);
router.post("/", orderTypesController.create);
router.put("/:id", orderTypesController.update);
router.delete("/:id", orderTypesController.delete);

module.exports = router;
