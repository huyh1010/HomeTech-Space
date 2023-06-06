const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

/**
 * @route POST /auth/login
 * @description Log in with username and password
 * @body {email, password}
 * @access Public
 */
router.post("/login", authController.signIn);

module.exports = router;
