const express = require("express");
const authentication = require("../middleware/authentication");
const validators = require("../middleware/validators");
const { body, param } = require("express-validator");
const cartController = require("../controllers/cart.controller");
const router = express.Router();

/**
 * @route PUT /carts
 * @description Update cart
 * @body { id}
 * * @body {cart}
 * @access Public
 */
router.put(
  "/:id",
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  cartController.updateCart
);

module.exports = router;
