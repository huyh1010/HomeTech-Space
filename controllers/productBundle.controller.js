const { AppError, sendResponse, catchAsync } = require("../helpers/utils");
const Product = require("../models/Product");
const ProductBundle = require("../models/ProductBundle");
const User = require("../models/User");

const productBundleController = {};

productBundleController.createProductBundle = catchAsync(
  // add product id instead of randomly generate id
  async (req, res, next) => {
    //Get data from request
    const currentUserId = req.user_id;
    const { name, products, price, poster_path } = req.body;
    //Validation
    const user = await User.findById(currentUserId);
    if (user.role !== "admin")
      throw new AppError(400, "Permission required", "Create Bundle Error");

    let bundle = await ProductBundle.findOne({ name });
    if (bundle)
      throw new AppError(400, "Bundle already exists", "Create Bundle Error");
    //Process
    bundle = await ProductBundle.create({ name, products, price, poster_path });

    //Response
    sendResponse(res, 200, true, { bundle }, null, "Create Bundle Successful");
  }
);

productBundleController.getProductBundles = catchAsync(
  async (req, res, next) => {
    let { page, limit, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 12;

    const filterConditions = [{ isDeleted: false }];
    if (filter.name) {
      filterConditions.push({ name: { $regex: filter.name, $options: "i" } });
    }
    const filterCriteria = filterConditions.length
      ? { $and: filterConditions }
      : {};

    const count = await ProductBundle.countDocuments(filterCriteria);
    const totalPages = Math.ceil(count / limit);
    const offset = limit * (page - 1);

    let bundles = await ProductBundle.find(filterCriteria)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("products");

    return sendResponse(
      res,
      200,
      true,
      { bundles, totalPages, count },
      null,
      ""
    );
  }
);

productBundleController.getSingleProductBundle = catchAsync(
  async (req, res, next) => {
    //Get data from request
    const bundleId = req.params.id;
    const bundle = await ProductBundle.findById(bundleId).populate("products");

    //Validation
    if (!bundle)
      throw new AppError(400, "Bundle not found", "Get Bundle Error");
    //Process
    //Response
    return sendResponse(
      res,
      200,
      true,
      { bundle },
      null,
      "Get Single Product Bundle Successful"
    );
  }
);

productBundleController.updateProductBundle = catchAsync(
  async (req, res, next) => {
    const currentUserId = req.user_id;
    const bundleId = req.params.id;
    //Get data from request
    const { name, products, price } = req.body;
    //Validation
    const user = await User.findById(currentUserId);
    if (user.role !== "admin")
      throw new AppError(400, "Permission required", "Update Bundle Error");

    //Process
    const bundle = await ProductBundle.findOneAndUpdate(
      { _id: bundleId },
      { name: name, products: products, price: price },
      { new: true }
    );

    //Response
    return sendResponse(
      res,
      200,
      true,
      { bundle },
      null,
      "Update Product Bundle Successful"
    );
  }
);

productBundleController.deleteProductBundle = catchAsync(
  async (req, res, next) => {
    //Get data from request
    const currentUserId = req.user_id;
    const bundleId = req.params.id;
    //Validation
    const user = await User.findById(currentUserId);
    if (user.role !== "admin")
      throw new AppError(400, "Permission required", "Update Bundle Error");

    //Process
    const bundle = await ProductBundle.findOneAndUpdate(
      { _id: bundleId },
      { isDeleted: true },
      { new: true }
    );
    //Response
    return sendResponse(
      res,
      200,
      true,
      { bundle },
      null,
      "Delete Product Bundle Successful"
    );
  }
);

module.exports = productBundleController;
