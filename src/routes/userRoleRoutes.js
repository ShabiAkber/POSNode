const express = require("express");
const userRoleController = require("../controllers/UserRoleController");

const router = express.Router();

router.get("/", userRoleController.getAll);
router.get("/:id", userRoleController.getById);
router.post("/", userRoleController.create);
router.put("/:id", userRoleController.update);
router.delete("/:id", userRoleController.delete);

module.exports = router;
