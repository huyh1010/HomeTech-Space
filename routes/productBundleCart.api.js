const express = require("express");
const authentication = require("../middleware/authentication");
const validators = require("../middleware/validators");
const { body, param } = require("express-validator");
const productBundleCartController = require("../controllers/productBundleCart.controller");

const router = express.Router();

/**
 * @route POST /bundlecarts
 * @description Add product bundle to cart
 * @body {product_id, quantity}
 * @access Login required
 */
router.post(
  "/",
  authentication.loginRequired,
  validators.validate([
    body("product_id").exists().isString().custom(validators.checkObjectId),
  ]),
  productBundleCartController.addItemToCart
);

/**
 * @route GET /bundlecarts/:id
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
  productBundleCartController.getUserCart
);

/**
 * @route DELETE /bundlecarts/:id
 * @description Decrease Item Quantity in Cart
 * @param {id}
 * @access Login required
 */
router.delete(
  "/quantity/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
    body("product_id").exists().isString().custom(validators.checkObjectId),
  ]),
  productBundleCartController.decreaseItemQuantity
);

/**
 * @route DELETE /bundlecarts/:id
 * @description Remove Item from Bundle Cart
 * @param {id}
 * @access Login required
 */
router.delete(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
    body("product_id").exists().isString().custom(validators.checkObjectId),
  ]),
  productBundleCartController.removeItemFromCart
);
module.exports = router;
