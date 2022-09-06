const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");

router.get("/", homeController.getIndex);
router.get("/auth/register", authController.getSignup);

module.exports = router;
