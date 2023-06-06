const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();

/**
 * @route GET /products
 * @description Get a list of products
 * @body
 * @access Login required
 */
router.get("/", productController.getProducts);

/**
 * @route POST /products
 * @description Create a new product
 * @body {name, price, category, brand, dimension/size, weight, description, imageUrl, key features}
 * @access Login required, admin only
 */
router.post("/", productController.createProduct);

/**
 * @route GET /products/:id
 * @description Get a single product by ID.
 * @param {id}
 * @access Login required
 */
router.get("/:id", productController.getSingleProduct);

/**
 * @route PUT /products/:id
 * @description Update a product.
 * @param {id}
 * @body {name, price, category, brand, dimension/size, weight, description, imageUrl, key features}
 * @access Login required, admin only
 */
router.put("/:id", productController.updateProduct);

/**
 * @route DELETE /products/:id
 * @description Delete a product.
 * @param {id}
 * @access Login required, admin only
 */
router.delete("/:id", productController.deleteProduct);

module.exports = router;
