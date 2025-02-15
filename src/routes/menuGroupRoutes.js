const express = require("express");
const menuGroupController = require("../controllers/MenuGroupController");

const router = express.Router();

router.get("/", menuGroupController.getAll);
router.get("/:id", menuGroupController.getById);
router.post("/", menuGroupController.create);
router.put("/:id", menuGroupController.update);
router.delete("/:id", menuGroupController.delete);

module.exports = router;
