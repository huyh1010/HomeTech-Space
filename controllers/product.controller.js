const { AppError, sendResponse, catchAsync } = require("../helpers/utils");
const Product = require("../models/Product");
const User = require("../models/User");

const productController = {};

productController.getProducts = catchAsync(async (req, res, next) => {
  let { page, limit, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const filterConditions = [{ isDeleted: false }];
  if (filter.name) {
    filterConditions.push({ name: { $regex: filter.name, $options: "i" } });
  }
  //add logic for multiple filter conditions
  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await Product.countDocuments(filterCriteria);
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  let products = await Product.find(filterCriteria)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { products, totalPages, count },
    null,
    ""
  );
});

productController.createProduct = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  //Get data from request
  const {
    name,
    price,
    category,
    brand,
    dimension_size,
    weight_kg,
    description,
    imageUrl,
    features,
  } = req.body;
  //Validation

  const user = await User.findById(currentUserId);
  if (user.role !== "admin")
    throw new AppError(400, "Permission required", "Create Product Error");

  let product = await Product.findOne({ name });
  if (product)
    throw new AppError(400, "Product already exists", "Create Product Error");
  //Process

  product = await Product.create({
    name,
    price,
    category,
    brand,
    dimension_size,
    weight_kg,
    description,
    imageUrl,
    features,
  });
  //Response
  sendResponse(res, 200, true, { product }, null, "Create Product Successful");
});

productController.getSingleProduct = catchAsync(async (req, res, next) => {
  //Get data from request
  const productId = req.params.id;
  const product = await Product.findById(productId);

  //Validation
  if (!product)
    throw new AppError(400, "Product not found", "Get Product Error");

  //Process
  //Response
  return sendResponse(
    res,
    200,
    true,
    { product },
    null,
    "Get Single Product Successful"
  );
});

productController.updateProduct = catchAsync(async (req, res, next) => {
  //Get data from request
  const currentUserId = req.userId;
  const productId = req.params.id;

  //Validation
  const user = await User.findById(currentUserId);
  if (user.role !== "admin")
    throw new AppError(400, "Permission required", "Update Product Error");
  //Process
  let product = await Product.findById(productId);
  if (!product)
    throw new AppError(400, "Product not found", "Update Product Error");
  const allows = [
    "name",
    "price",
    "category",
    "brand",
    "dimension_size",
    "weight_kg",
    "description",
    "imageUrl",
    "features",
  ];

  allows.forEach((field) => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  });

  await product.save();

  //Response
  return sendResponse(
    res,
    200,
    true,
    { product },
    null,
    "Update Product Successful"
  );
});

productController.deleteProduct = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  //Get data from request
  const productId = req.params.id;
  //Validation
  const user = await User.findById(currentUserId);
  if (user.role !== "admin")
    throw new AppError(400, "Permission required", "Delete Product Error");

  //Process
  const product = await Product.findOneAndUpdate(
    { _id: productId },
    { isDeleted: true },
    { new: true }
  );

  if (!product)
    throw new AppError(400, "Product not found", "Delete Product Error");
  //Response
  return sendResponse(
    res,
    200,
    true,
    { product },
    null,
    "Delete Product Successful"
  );
});

module.exports = productController;
