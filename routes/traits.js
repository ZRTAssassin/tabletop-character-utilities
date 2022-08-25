const express = require("express");
const router = express.Router();
const traitsController = require("../controllers/traits");

router.get("/", traitsController.getTraits);

router.post("/addTrait", traitsController.addTrait);

module.exports = router;
