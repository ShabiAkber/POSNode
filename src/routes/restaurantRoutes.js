const express = require("express");
const RestaurantController = require("../controllers/RestaurantController");

const router = express.Router();

router.get("/", RestaurantController.getAll);
router.get("/:id", RestaurantController.getById);
router.post("/", RestaurantController.create);
router.put("/:id", RestaurantController.update);
router.delete("/:id", RestaurantController.delete);

module.exports = router;
