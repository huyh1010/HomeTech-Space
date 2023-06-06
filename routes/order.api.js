const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();

/**
 * @route POST /orders
 * @description Create an order
 * @body {buyer, products, shipping address, payment method, status}
 * @access Login required
 */
router.post("/", orderController.createOrder);

/**
 * @route GET /orders
 * @description Get all orders
 * @body
 * @access Login required, admin only
 */
router.get("/", orderController.getOrders);

/**
 * @route GET /orders/:id
 * @description Get an order
 * @param {id}
 * @body
 * @access Login required
 */
router.get("/:id", orderController.getSingleOrder);

/**
 * @route PUT /orders/:id
 * @description Update an order
 * @param {id}
 * @body {status}
 * @access Login required, admin only
 */
router.put("/:id", orderController.updateOrder);

/**
 * @route DELETE /orders/:id
 * @description Cancel an order
 * @param {id}
 * @body {status}
 * @access Login required
 */
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
