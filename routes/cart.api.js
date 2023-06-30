const express = require("express");
const authentication = require("../middleware/authentication");
const validators = require("../middleware/validators");
const { body, param } = require("express-validator");
const cartController = require("../controllers/cart.controller");
const router = express.Router();

/**
 * @route POST /carts
 * @description Add product to cart
 * @body {product_id, quantity}
 * @access Login required
 */
router.post(
  "/",
  validators.validate([
    body("product_id").exists().isString().custom(validators.checkObjectId),
  ]),
  cartController.addItemToCart
);

/**
 * @route POST /carts/bundle
 * @description Add product bundle to cart
 * @body {product_id, quantity, type}
 * @access Login required
 */
router.post(
  "/bundle",
  validators.validate([
    body("product_id").exists().isString().custom(validators.checkObjectId),
    body("type", "Invalid type").exists().isIn(["regular", "bundle"]),
  ]),
  cartController.addBundleItemToCart
);

/**
 * @route GET /carts
 * @description get cart
 * @body
 * @access Public
 */
router.get(
  "/",

  cartController.getCart
);

/**
 * @route GET /carts/:id
 * @description Get User Cart
 * @param {id}
 * @access Login required
 */
router.get(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  cartController.getUserCart
);

/**
 * @route DELETE /carts/:id
 * @description Decrease Item Quantity in Cart
 * @param {id}
 * @access Login required
 */
router.delete(
  "/quantity/:id",

  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
    body("product_id").exists().isString().custom(validators.checkObjectId),
  ]),
  cartController.decreaseItemQuantity
);

/**
 * @route DELETE /carts/:id
 * @description Remove Item from Cart
 * @param {id}
 * @access Login required
 */
router.delete(
  "/:id",

  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
    body("product_id").exists().isString().custom(validators.checkObjectId),
  ]),
  cartController.removeItemFromCart
);

module.exports = router;
