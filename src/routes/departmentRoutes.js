const express = require("express");
const departmentController = require("../controllers/DepartmentController");

const router = express.Router();

router.get("/", departmentController.getAll);
router.get("/:id", departmentController.getById);
router.post("/", departmentController.create);
router.put("/:id", departmentController.update);
router.delete("/:id", departmentController.delete);

module.exports = router;
