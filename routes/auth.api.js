const express = require("express");
const authController = require("../controllers/auth.controller");
const validators = require("../middleware/validators");
const router = express.Router();
const { body } = require("express-validator");

/**
 * @route POST /auth/login
 * @description User sign in
 * @body {email, password}
 * @access Public
 */
router.post(
  "/login",
  validators.validate([
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  authController.signIn
);

module.exports = router;
