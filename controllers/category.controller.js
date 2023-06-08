const { AppError, sendResponse, catchAsync } = require("../helpers/utils");
const Category = require("../models/Category");
const Product = require("../models/Product");
const User = require("../models/User");

const categoryController = {};

categoryController.createCategory = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  //Get data from request
  const { name } = req.body;
  //Validation
  const user = await User.findById(currentUserId);
  if (user.role !== "admin")
    throw new AppError(400, "Permission required", "Create Category Error");

  let category = await Category.findOne({ name });
  if (category)
    throw new AppError(400, "Category already exists", "Create Category Error");
  //Process
  category = await Category.create({ name });
  const productByCategory = await Product.find({ category: name }, { _id: 1 });

  category.products = productByCategory;
  category = await category.save();
  Response;
  sendResponse(
    res,
    200,
    true,
    { category },
    null,
    "Create Category Successful"
  );
});

categoryController.getCategories = catchAsync(async (req, res, next) => {
  //Get data from request
  //Validation
  //Process
  //Response
});

categoryController.getSingleCategory = catchAsync(async (req, res, next) => {
  //Get data from request
  //Validation
  //Process
  //Response
});

categoryController.updateCategory = catchAsync(async (req, res, next) => {
  //Get data from request
  //Validation
  //Process
  //Response
});

categoryController.deleteCategory = catchAsync(async (req, res, next) => {
  //Get data from request
  //Validation
  //Process
  //Response
});
module.exports = categoryController;
