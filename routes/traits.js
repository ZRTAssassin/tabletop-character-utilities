const express = require("express");
const router = express.Router();
const traitsController = require("../controllers/traits");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, traitsController.getTraits);

router.get("/add", ensureAuth, traitsController.getAddTrait);

router.get("/category/buff", traitsController.getBuffTraits);
router.get("/category/conditions", traitsController.getConditionTraits);
router.get("/category/damage", traitsController.getDamageTraits);
router.get("/category/debuff", traitsController.getDebuffTraits);
router.get("/category/movement", traitsController.getMovementTraits);
router.get("/category/utility", traitsController.getUtilityTraits);

router.get("/edit/:id", traitsController.editTrait);

router.put("/:id", traitsController.requestEditTrait);

router.post("/addTrait", traitsController.addTrait);

router.post("/addTestTrait", traitsController.addTestTrait);

router.delete("/deleteTrait/:id", traitsController.deleteTrait);

module.exports = router;
