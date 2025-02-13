const express = require("express");
const permissionController = require("../controllers/PermissionController");

const router = express.Router();

router.get("/", permissionController.getAll);
router.get("/:id", permissionController.getById);
router.post("/", permissionController.create);
router.put("/:id", permissionController.update);
router.delete("/:id", permissionController.delete);

module.exports = router;
