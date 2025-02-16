const express = require("express");
const tableDineInController = require("../controllers/TableDineInController");

const router = express.Router();

router.get("/", tableDineInController.getAll);
router.get("/:id", tableDineInController.getById);
router.post("/", tableDineInController.create);
router.put("/:id", tableDineInController.update);
router.delete("/:id", tableDineInController.delete);

module.exports = router;
