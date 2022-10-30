const express = require("express");
const router = express.Router();
const traitsController = require("../controllers/traits");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, traitsController.getTraits);

router.get("/new/:traitType", traitsController.getAddTrait);

// router.get("/add", ensureAuth, traitsController.getAddTrait);

router.get("/type/:type", traitsController.getTypeTraits);

router.get("/category/:category", traitsController.getCategoryTraits);

router.get("/edit/:id", traitsController.editTrait);

router.put("/:id", traitsController.requestEditTrait);

router.post("/addTrait", traitsController.addTrait);

router.post("/addTestTrait", traitsController.addTestTrait);

router.delete("/deleteTrait/:id", traitsController.deleteTrait);

module.exports = router;
