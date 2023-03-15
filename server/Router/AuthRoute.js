const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AuthController");

//define router
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
