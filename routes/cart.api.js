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
 * @access Public
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
 * @access Public
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
  "/user/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  cartController.getUserCart
);

/**
 * @route PUT /carts/quantity/dec
 * @description Decrease Item Quantity in Cart
 * @body {product_id}
 * @access Public
 */
router.put(
  "/quantity/dec",

  validators.validate([
    // param("id").exists().isString().custom(validators.checkObjectId),
    body("product_id").exists().isString().custom(validators.checkObjectId),
  ]),
  cartController.decreaseItemQuantity
);

/**
 * @route PUT /carts/quantity/inc
 * @description Add Item Quantity in Cart
 * @param {id}
 * @access Public
 */
router.put(
  "/quantity/inc",

  validators.validate([
    // param("id").exists().isString().custom(validators.checkObjectId),
    body("product_id").exists().isString().custom(validators.checkObjectId),
  ]),
  cartController.increaseItemQuantity
);

/**
 * @route PUT /carts/user
 * @description Assign cart to user
 * @access Public
 */
router.put(
  "/user",

  validators.validate([
    // param("id").exists().isString().custom(validators.checkObjectId),
    body("user_id").exists().isString().custom(validators.checkObjectId),
    body("cart_id").exists().isString().custom(validators.checkObjectId),
  ]),
  cartController.updateCartToUser
);

/**
 * @route DELETE /carts/:id
 * @description Remove Item from Cart
 * @body {product_id}
 * @access Public
 */
router.delete(
  "/product",

  validators.validate([
    // param("id").exists().isString().custom(validators.checkObjectId),
    body("product_id").exists().isString().custom(validators.checkObjectId),
  ]),
  cartController.removeItemFromCart
);

module.exports = router;
