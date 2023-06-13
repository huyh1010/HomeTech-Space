const express = require("express");
const productBundleController = require("../controllers/productBundle.controller");
const authentication = require("../middleware/authentication");
const validators = require("../middleware/validators");
const { param, body } = require("express-validator");
const router = express.Router();

/**
 * @route POST /bundles
 * @description Create a product bundle
 * @body {name}
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
 * @access Login required
 */
router.get(
  "/",
  authentication.loginRequired,
  productBundleController.getProductBundles
);

/**
 * @route GET /bundles/:id
 * @description Get a single bundle by ID.
 * @param {id}
 * @access Login required
 */
router.get(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  productBundleController.getSingleProductBundle
);

/**
 * @route PUT /bundles/:id
 * @description Update product bundle
 * @param {id}
 * @body {name, products}
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
