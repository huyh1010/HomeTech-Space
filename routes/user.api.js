const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

/**
 * @route POST /users
 * @description Register new user
 * @body {name, email, password}
 * @access Public
 */
router.post("/", userController.register);

/**
 * @route GET /users/me
 * @description Get current user info
 * @body
 * @access Login required
 */

router.get("/me", userController.getCurrentUser);

module.exports = router;
