const express = require("express");
const router = express.Router();
const traitsController = require("../controllers/traits");

router.get("/", traitsController.getTraits);

// router.post("/createTrait", traitsController.createTrait);

module.exports = router;
