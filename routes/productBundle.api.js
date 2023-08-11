const express = require("express");
const productBundleController = require("../controllers/productBundle.controller");
const authentication = require("../middleware/authentication");
const validators = require("../middleware/validators");
const { param, body } = require("express-validator");
const router = express.Router();

/**
 * @route POST /bundles
 * @description Create a product bundle
 * @body {name, products, description, poster_path, price, imageUrl}
 * @access Login required, admin only
 */
router.post(
  "/",
  authentication.loginRequired,
  validators.validate([body("name", "Invalid name").exists().notEmpty()]),
  productBundleController.createProductBundle
);

/**
 * @route GET /bundles
 * @description get all bundles
 * @body
 * @access Public
 */
router.get("/", productBundleController.getProductBundles);

/**
 * @route GET /bundles/:id
 * @description Get a single bundle by ID.
 * @param {id}
 * @access Public
 */
router.get(
  "/:id",
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  productBundleController.getSingleProductBundle
);

/**
 * @route PUT /bundles/:id
 * @description Update product bundle
 * @param {id}
 * @body {name, products, description, poster_path, price, imageUrl}
 * @access Login required, admin only
 */
router.put(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  productBundleController.updateProductBundle
);

/**
 * @route DELETE /bundles/:id
 * @description Delete a product bundle.
 * @param {id}
 * @access Login required, admin only
 */
router.delete(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  productBundleController.deleteProductBundle
);

module.exports = router;
