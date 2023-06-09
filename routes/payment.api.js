const express = require("express");
const paymentController = require("../controllers/payment.controller");
const authentication = require("../middleware/authentication");
const { param } = require("express-validator");
const validators = require("../middleware/validators");
const router = express.Router();

/**
 * @route POST /payments
 * @description Create a payment
 * @body {order}
 * @access Login required, admin only
 */
router.post("/", authentication.loginRequired, paymentController.createPayment);

/**
 * @route GET /payments
 * @description Get all payment
 * @body
 * @access Login required
 */
router.get("/", authentication.loginRequired, paymentController.getPayments);

/**
 * @route GET /payments/:id
 * @description Get a payment
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
  paymentController.getSinglePayment
);

/**
 * @route PUT /payments/:id
 * @description Update payment status
 * @param {id}
 * @body {status}
 * @access Login required, admin only
 */
router.put(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  paymentController.updatePayment
);

/**
 * @route DELETE /payments/:id
 * @description Delete a payment
 * @param {id}
 * @body
 * @access Login required, admin only
 */
router.delete(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  paymentController.deletePayment
);

module.exports = router;
