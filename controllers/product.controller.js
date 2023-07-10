const { AppError, sendResponse, catchAsync } = require("../helpers/utils");
const Product = require("../models/Product");
const User = require("../models/User");

const productController = {};

productController.getProducts = catchAsync(async (req, res, next) => {
  let { page, limit, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  // else if (key === "price") {
  //   if () {
  //     filterConditions.push({ [key]: { $lt: 25 } });
  //   } else if () {
  //     filterConditions.push({ [key]: { $lt: 75, $gt: 25 } });
  //   } else {
  //     filterConditions.push({ [key]: { $gt: 75 } });
  //   }
  // }

  const filterConditions = [{ isDeleted: false }];

  if (filter) {
    const filterKeys = Object.keys(filter);
    filterKeys.forEach((key) => {
      if (key === "weight_kg") {
        filterConditions.push({ [key]: parseFloat(filter[key]) });
      } else if (key === "price") {
        if (filter[key] === "below_25") {
          filterConditions.push({ [key]: { $lt: 25 } });
        } else if (filter[key] === "between_25_75") {
          filterConditions.push({ [key]: { $lt: 75, $gt: 25 } });
        } else if (filter[key] === "above_75") {
          filterConditions.push({ [key]: { $gt: 75 } });
        } else {
          filterConditions.push({ [key]: parseFloat(filter[key]) });
        }
      } else if (
        key === "name" ||
        key === "category" ||
        key === "brand" ||
        key === "dimension_size" ||
        key === "description"
      ) {
        filterConditions.push({
          [key]: { $regex: `${filter[key]}`, $options: "i" },
        });
      }
    });
  }

  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};
  console.log(filterCriteria);
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
  const currentUserId = req.user_id;
  //Get data from request
  const {
    name,
    price,
    category,
    brand,
    dimension_size,
    weight_kg,
    description,
    poster_path,
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
    poster_path,
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
  const currentUserId = req.user_id;
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
    "poster_path",
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
  const currentUserId = req.user_id;
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
