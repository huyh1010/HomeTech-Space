const express = require("express");
const userController = require("../controllers/user.controller");
const validators = require("../middleware/validators");
const router = express.Router();
const { body, param } = require("express-validator");
const authentication = require("../middleware/authentication");

/**
 * @route POST /users
 * @description Register new user
 * @body {name, email, password}
 * @access Public
 */
router.post(
  "/",
  validators.validate([
    body("name", "Invalid name").exists().notEmpty(),
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid password").exists().notEmpty(),
    body("role", "Invalid Role").exists().isIn(["admin", "user"]),
  ]),
  userController.register
);

/**
 * @route GET /users/me
 * @description Get current user info
 * @body
 * @access Login required
 */

router.get("/me", authentication.loginRequired, userController.getCurrentUser);

/**
 * @route PUT /users/:id
 * @description Update user info
 * @param {id}
 * @body {name, avatarUrl, address, phone}
 * @access Login required
 */

router.put(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  userController.updateUser
);

module.exports = router;
