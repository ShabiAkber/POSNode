const express = require("express");
const menuVersionController = require("../controllers/MenuVersionController");

const router = express.Router();

router.get("/", menuVersionController.getAll);
router.get("/:id", menuVersionController.getById);
router.post("/", menuVersionController.create);
router.put("/:id", menuVersionController.update);
router.delete("/:id", menuVersionController.delete);

module.exports = router;
