const express = require("express");
const rolePermissionController = require("../controllers/RolePermissionController");

const router = express.Router();

router.get("/", rolePermissionController.getAll);
router.get("/:id", rolePermissionController.getById);
router.post("/", rolePermissionController.create);
router.put("/:id", rolePermissionController.update);
router.delete("/:id", rolePermissionController.delete);

module.exports = router;
