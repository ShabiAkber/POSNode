const express = require("express");
const kitWiseCatController = require("../controllers/KitWiseCatController");

const router = express.Router();

router.get("/", kitWiseCatController.getAll);
router.get("/:id", kitWiseCatController.getById);
router.post("/", kitWiseCatController.create);
router.put("/:id", kitWiseCatController.update);
router.delete("/:id", kitWiseCatController.delete);

module.exports = router;
