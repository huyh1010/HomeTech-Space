const express = require("express");
const productController = require("../controllers/product.controller");
const authentication = require("../middleware/authentication");
const validators = require("../middleware/validators");
const { body, param } = require("express-validator");
const router = express.Router();

/**
 * @route GET /products
 * @description Get a list of products
 * @body
 * @access Login required
 */
router.get("/", authentication.loginRequired, productController.getProducts);

/**
 * @route POST /products
 * @description Create a new product
 * @body {name, price, category, brand, dimension/size, weight, description, imageUrl, key features}
 * @access Login required, admin only
 */
router.post(
  "/",
  authentication.loginRequired,
  validators.validate([
    body("name", "Invalid name").exists().notEmpty(),
    body("price", "Invalid price").exists().notEmpty(),
    body("category", "Invalid Category")
      .exists()
      .isIn([
        "speaker",
        "plugs and outlets",
        "security cameras and systems",
        "lighting",
        "alarm clock",
        "scale",
      ]),
  ]),
  productController.createProduct
);

/**
 * @route GET /products/:id
 * @description Get a single product by ID.
 * @param {id}
 * @access Login required
 */
router.get(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  productController.getSingleProduct
);

/**
 * @route PUT /products/:id
 * @description Update a product.
 * @param {id}
 * @body {name, price, category, brand, dimension/size, weight_kg, description, imageUrl, key features}
 * @access Login required, admin only
 */
router.put(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  productController.updateProduct
);

/**
 * @route DELETE /products/:id
 * @description Delete a product.
 * @param {id}
 * @access Login required, admin only
 */
router.delete(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  productController.deleteProduct
);

module.exports = router;
