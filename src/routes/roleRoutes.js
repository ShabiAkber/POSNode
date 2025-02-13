const express = require("express");
const roleController = require("../controllers/RoleController");

const router = express.Router();

router.get("/", roleController.getAll);
router.get("/:id", roleController.getById);
router.post("/", roleController.create);
router.put("/:id", roleController.update);
router.delete("/:id", roleController.delete);

module.exports = router;
