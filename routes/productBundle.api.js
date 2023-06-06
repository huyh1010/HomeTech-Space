const express = require("express");
const productBundleController = require("../controllers/productBundle.controller");
const router = express.Router();

/**
 * @route POST /bundles
 * @description Create a product bundle
 * @body {name, products, imageUrl, description}
 * @access Login required, admin only
 */
router.post("/", productBundleController.createProductBundle);

/**
 * @route GET /bundles
 * @description get all bundles
 * @body
 * @access Login required
 */
router.get("/", productBundleController.getProductBundles);

/**
 * @route GET /bundles/:id
 * @description Get a single bundle by ID.
 * @param {id}
 * @access Login required
 */
router.get("/:id", productBundleController.getSingleProductBundle);

/**
 * @route PUT /bundles/:id
 * @description Update product bundle
 * @param {id}
 * @body {name, products, imageUrl, description}
 * @access Login required, admin only
 */
router.put("/:id", productBundleController.updateProductBundle);

/**
 * @route DELETE /bundles/:id
 * @description Delete a product bundle.
 * @param {id}
 * @access Login required, admin only
 */
router.delete("/:id", productBundleController.deleteProductBundle);

module.exports = router;
