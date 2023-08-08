const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passport/passport.js");
const { sendResponse } = require("../helpers/utils");
const authController = require("../controllers/auth.controller");
const redirectToClient = require("../passport/redirectToClient.js");

/**
 * @route GET /auth/google
 * @description Direct to google page
 
 */
router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * @route GET /auth/google/callback
 * @description Receive user info from Google's response
 
 */
router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/login/error",
  }),
  redirectToClient
);

/**
 * @route GET /auth/google/login/success
 * @description Get user's info after logging in by Google
 
 */
router.post("/login/success", authController.signInWithGoogle);

/**
 * @route GET /auth/google/login/error
 * @description Response if failed to login to Google
 
 */
router.post("/login/error", function (req, res, next) {
  sendResponse(res, 401, false, null, true, "Login failed");
});

module.exports = router;
