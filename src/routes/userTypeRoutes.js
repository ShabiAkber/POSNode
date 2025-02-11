const express = require("express");
const userTypeController = require("../controllers/UserTypeController");

const router = express.Router();

router.get("/", userTypeController.getAll);
router.get("/:id", userTypeController.getById);
router.post("/", userTypeController.create);
router.put("/:id", userTypeController.update);
router.delete("/:id", userTypeController.delete);

module.exports = router;
