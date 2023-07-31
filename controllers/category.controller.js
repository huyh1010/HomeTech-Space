const { AppError, sendResponse, catchAsync } = require("../helpers/utils");
const Category = require("../models/Category");
const Product = require("../models/Product");
const User = require("../models/User");

const categoryController = {};

categoryController.createCategory = catchAsync(async (req, res, next) => {
  const currentUserId = req.user_id;
  //Get data from request
  const { name, coverImgUrl } = req.body;
  //Validation
  const user = await User.findById(currentUserId);
  if (user.role !== "admin")
    throw new AppError(400, "Permission required", "Create Category Error");

  let category = await Category.findOne({ name });
  if (category)
    throw new AppError(400, "Category already exists", "Create Category Error");
  //Process
  category = await Category.create({ name, coverImgUrl });
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
  let { page, limit, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const filterConditions = [{ isDeleted: false }];
  if (filter.name) {
    filterConditions.push({ name: { $regex: filter.name, $options: "i" } });
  }
  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await Category.countDocuments(filterCriteria);
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  let categories = await Category.find(filterCriteria)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { categories, totalPages, count },
    null,
    ""
  );
});

categoryController.getSingleCategory = catchAsync(async (req, res, next) => {
  //Get data from request
  const categoryId = req.params.id;
  const category = await Category.findById(categoryId)
    .populate("products")
    .sort({ createdAt: -1 });
  //Validation
  if (!category)
    throw new AppError(400, "Category not found", "Get Category Error");

  //Process
  //Response
  return sendResponse(
    res,
    200,
    true,
    { category },
    null,
    "Get Single Category Successful"
  );
});

categoryController.updateCategory = catchAsync(async (req, res, next) => {
  //Get data from request
  const currentUserId = req.user_id;
  const categoryId = req.params.id;
  const { name, coverImgUrl } = req.body;

  //Validation
  const user = await User.findById(currentUserId);
  if (user.role !== "admin")
    throw new AppError(400, "Permission required", "Update Category Error");

  let category = await Category.findById(categoryId);
  if (!category)
    throw new AppError(400, "Product not found", "Update Product Error");
  //Process
  const allows = ["name", "coverImgUrl"];

  allows.forEach((field) => {
    if (req.body[field] !== undefined) {
      category[field] = req.body[field];
    }
  });

  await category.save();

  //Response
  sendResponse(
    res,
    200,
    true,
    { category },
    null,
    "Update Category Successful"
  );
});

categoryController.deleteCategory = catchAsync(async (req, res, next) => {
  const currentUserId = req.user_id;
  //Get data from request
  const categoryId = req.params.id;
  //Validation
  const user = await User.findById(currentUserId);
  if (user.role !== "admin")
    throw new AppError(400, "Permission required", "Delete Category Error");

  //Process
  const category = await Category.findOneAndUpdate(
    { _id: categoryId },
    { isDeleted: true },
    { new: true }
  );

  if (!category)
    throw new AppError(400, "Category not found", "Delete Category Error");
  //Response
  return sendResponse(
    res,
    200,
    true,
    { category },
    null,
    "Delete Category Successful"
  );
});
module.exports = categoryController;
