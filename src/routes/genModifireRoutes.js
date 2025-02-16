const express = require("express");
const genModifireController = require("../controllers/GenModifireController");

const router = express.Router();

router.get("/", genModifireController.getAll);
router.get("/:id", genModifireController.getById);
router.post("/", genModifireController.create);
router.put("/:id", genModifireController.update);
router.delete("/:id", genModifireController.delete);

module.exports = router;
