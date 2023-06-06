const express = require("express");
const categoryController = require("../controllers/category.controller");
const router = express.Router();

/**
 * @route POST /categories
 * @description Create a list of categories
 * @body {name, products}
 * @access Login required, admin only
 */
router.post("/", categoryController.createCategory);

/**
 * @route GET /categories
 * @description Create a list of categories
 * @body
 * @access Login required
 */
router.get("/", categoryController.getCategories);

/**
 * @route GET /categories/:id
 * @description Get single category (*note: with arrays of products)
 * @param {id}
 * @body
 * @access Login required
 */
router.get("/:id", categoryController.getSingleCategory);

/**
 * @route PUT /categories/:id
 * @description Update a single category by name
 * @param {id}
 * @body {name}
 * @access Login required, admin only
 */
router.put("/:id", categoryController.updateCategory);

/**
 * @route DELETE /categories/:id
 * @description Remove a single category by name
 * @param {id}
 * @body {name}
 * @access Login required, admin only
 */
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
