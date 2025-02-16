const express = require("express");
const genAddonController = require("../controllers/GenAddonController");

const router = express.Router();

router.get("/", genAddonController.getAll);
router.get("/:id", genAddonController.getById);
router.post("/", genAddonController.create);
router.put("/:id", genAddonController.update);
router.delete("/:id", genAddonController.delete);

module.exports = router;
