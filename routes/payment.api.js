const express = require("express");
const paymentController = require("../controllers/payment.controller");
const router = express.Router();

/**
 * @route POST /payments
 * @description Create a payment
 * @body {order, status}
 * @access Login required, admin only
 */
router.post("/", paymentController.createPayment);

/**
 * @route GET /payments
 * @description Get all payment
 * @body
 * @access Login required
 */
router.get("/", paymentController.getPayments);

/**
 * @route GET /payments/:id
 * @description Get a payment
 * @param {id}
 * @body
 * @access Login required
 */
router.get("/:id", paymentController.getSinglePayment);

/**
 * @route PUT /payments/:id
 * @description Update payment status
 * @param {id}
 * @body {status}
 * @access Login required, admin only
 */
router.put("/:id", paymentController.updatePayment);

/**
 * @route DELETE /payments/:id
 * @description Delete a payment
 * @param {id}
 * @body
 * @access Login required, admin only
 */
router.delete("/:id", paymentController.deletePayment);

module.exports = router;
