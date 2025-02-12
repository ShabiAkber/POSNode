const express = require("express");
const BranchController = require("../controllers/BranchController");

const router = express.Router();

router.get("/", BranchController.getAll);
router.get("/:id", BranchController.getById);
router.post("/", BranchController.create);
router.put("/:id", BranchController.update);
router.delete("/:id", BranchController.delete);

module.exports = router;
