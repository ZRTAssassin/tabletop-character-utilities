const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Main routes
router.get("/", homeController.getIndex);
//Register
router.get("/auth/register", authController.getSignup);
router.post("/auth/register", authController.postSignup)
//Login
router.get("/auth/login", authController.getLogin);
router.post("/auth/login", authController.postLogin);
//Logout
router.get("/auth/logout", authController.logout);

module.exports = router;
