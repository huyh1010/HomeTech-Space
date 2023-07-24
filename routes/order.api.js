const express = require("express");
const orderController = require("../controllers/order.controller");
const authentication = require("../middleware/authentication");
const { param, body } = require("express-validator");
const validators = require("../middleware/validators");
const router = express.Router();

/**
 * @route POST /orders
 * @description Create an order
 * @body {name, email, phone, district, city, buyer, shipping address, payment method, cart}
 * @access Login required
 */
router.post(
  "/",
  authentication.loginRequired,
  validators.validate([
    body("user_id", "Invalid user")
      .exists()
      .isString()
      .custom(validators.checkObjectId),
    body("customer_info", "Invalid customer information").exists().isObject(),
  ]),
  orderController.createOrder
);

/**
 * @route GET /orders
 * @description Get all orders
 * @body
 * @access Login required, admin only
 */
router.get("/", authentication.loginRequired, orderController.getOrders);

/**
 * @route GET /orders/me
 * @description Get current user order
 * @param (user_id)
 * @access Login required
 */
router.get(
  "/user/:user_id",
  authentication.loginRequired,
  validators.validate([
    param("user_id").exists().isString().custom(validators.checkObjectId),
  ]),
  orderController.getUserOrder
);

/**
 * @route GET /orders/:id
 * @description Get an order
 * @param {id}
 * @body
 * @access Login required
 */
router.get(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  orderController.getSingleOrder
);

/**
 * @route PUT /orders/:id
 * @description Update an order
 * @param {id}
 * @body {status, payment_status}
 * @access Login required, admin only
 */
router.put(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  orderController.updateOrder
);

/**
 * @route DELETE /orders/:id
 * @description Cancel an order
 * @param {id}
 * @body
 * @access Login required
 */
router.delete(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  orderController.cancelOrder
);

module.exports = router;
