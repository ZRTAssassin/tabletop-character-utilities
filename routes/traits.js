const express = require("express");
const router = express.Router();
const traitsController = require("../controllers/traits");

router.get("/", traitsController.getTraits);

router.get("/edit/:id", traitsController.editTrait);

router.put("/:id", traitsController.requestEditTrait);

router.post("/addTrait", traitsController.addTrait);

router.post("/addTestTrait", traitsController.addTestTrait);

router.delete("/deleteTrait/:id", traitsController.deleteTrait);

module.exports = router;
