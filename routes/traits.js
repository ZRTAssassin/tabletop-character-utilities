const express = require("express");
const router = express.Router();
const traitsController = require("../controllers/traits");

router.get("/", traitsController.getTraits);

router.get("/edit/:id", traitsController.editTrait);

// router.put("/edit/:id", traitsController.

router.post("/addTrait", traitsController.addTrait);

router.delete("/deleteTrait", traitsController.deleteTrait);

module.exports = router;
