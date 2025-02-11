const express = require("express");
const wageTypeController = require("../controllers/WageTypeController");

const router = express.Router();

router.get("/", wageTypeController.getAll);
router.get("/:id", wageTypeController.getById);
router.post("/", wageTypeController.create);
router.put("/:id", wageTypeController.update);
router.delete("/:id", wageTypeController.delete);

module.exports = router;
