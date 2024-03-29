const express = require("express");
const categoryController = require("../controllers/category.controller");
const authentication = require("../middleware/authentication");
const validators = require("../middleware/validators");
const { body, param } = require("express-validator");
const router = express.Router();

/**
 * @route POST /categories
 * @description Create a list of categories
 * @body {name, coverImgUrl}
 * @access Login required, admin only
 */
router.post(
  "/",
  authentication.loginRequired,
  validators.validate([
    body("name", "Invalid name")
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
  categoryController.createCategory
);

/**
 * @route GET /categories
 * @description Get all categories
 * @body
 * @access Public
 */
router.get("/", categoryController.getCategories);

/**
 * @route GET /categories/:id
 * @description Get a single category
 * @param {id}
 * @body
 * @access Public
 */
router.get(
  "/:id",
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  categoryController.getSingleCategory
);

/**
 * @route PUT /categories/:id
 * @description Update a single category by name
 * @param {id}
 * @body {name, coverImgUrl}
 * @access Login required, admin only
 */
router.put(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  categoryController.updateCategory
);

/**
 * @route DELETE /categories/:id
 * @description Remove a single category by name
 * @param {id}
 * @body {name}
 * @access Login required, admin only
 */
router.delete(
  "/:id",
  authentication.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  categoryController.deleteCategory
);

module.exports = router;
