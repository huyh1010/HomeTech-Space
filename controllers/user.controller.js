const { AppError, sendResponse, catchAsync } = require("../helpers/utils");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Cart = require("../models/Cart");

const userController = {};

userController.register = catchAsync(async (req, res, next) => {
  //Get data from request
  let { name, email, password, cart } = req.body;
  //Validation
  let user = await User.findOne({ email });
  if (user)
    throw new AppError(400, "User already exists", "Registration Error");
  //Process
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  user = await User.create({ name, email, password });
  let userCart = await Cart.create({ user: user._id });
  userCart.cart = cart;
  await userCart.save();
  const accessToken = await user.generateToken();

  //Response
  sendResponse(
    res,
    200,
    true,
    { user, accessToken, userCart },
    null,
    "Create User Successful"
  );
});

userController.getUsers = catchAsync(async (req, res, next) => {
  const currentUserId = req.user_id;
  let { page, limit, ...filter } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);
  let user = await User.findById(currentUserId);
  if (user.role !== "admin")
    throw new AppError(400, "Permission required", "Create Product Error");

  const filterConditions = [{ isDeleted: false }];
  if (filter) {
    const filterKeys = Object.keys(filter);
    filterKeys.forEach((key) => {
      filterConditions.push({ [key]: filter[key] });
    });
  }

  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const totalUsers = await User.countDocuments(filterCriteria);

  const totalPages = Math.ceil(totalUsers / limit);
  const offset = limit * (page - 1);

  const users = await User.find(filterCriteria)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { users, totalPages, totalUsers },
    null,
    "Get Users Successful"
  );
});

userController.getUserData = catchAsync(async (req, res, next) => {
  const currentUserId = req.user_id;
  const user = await User.findById(currentUserId);
  if (user.role !== "admin")
    throw new AppError(400, "Permission required ", "Get Order Sales Error");

  const day = 24 * 60 * 60 * 1000;
  const past_7_days = 7 * day;
  let user_last_7_days = await User.aggregate([
    {
      $match: {
        $expr: {
          $gt: [
            { $toDate: "$_id" },
            { $toDate: { $subtract: [new Date(), past_7_days] } },
          ],
        },
      },
    },
    {
      $group: {
        _id: {
          dateYMD: {
            $dateFromParts: {
              year: { $year: "$_id" },
              month: { $month: "$_id" },
              day: { $dayOfMonth: "$_id" },
            },
          },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.dateYMD": 1 },
    },
    {
      $project: {
        _id: 0,
        count: 1,
        dateDMY: {
          $dateToString: { date: "$_id.dateYMD", format: "%d-%m-%Y" },
        },
      },
    },
  ]);

  return sendResponse(
    res,
    200,
    true,
    { user_last_7_days },
    null,
    "Get  User Data Successful"
  );
});

userController.getCurrentUser = catchAsync(async (req, res, next) => {
  const currentUserId = req.user_id;

  const user = await User.findById(currentUserId);
  if (!user)
    throw new AppError(400, "User not found", "Get Current User Error");

  // const cart = await Cart.findOne({ user: currentUserId }).populate("user");
  return sendResponse(
    res,
    200,
    true,
    user,
    null,
    "Get Current User Successful"
  );
});

userController.getUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) throw new AppError(400, "User not found", "Get User Error");

  return sendResponse(res, 200, true, { user }, null, "Get User Successful");
});

userController.updateUser = catchAsync(async (req, res, next) => {
  const currentUserId = req.user_id;
  const userId = req.params.id;

  if (currentUserId !== userId)
    throw new AppError(400, "Permission required", "Update User Error");
  let user = await User.findById(userId);
  if (!user) throw new AppError(400, "User not found", "Update User Error");

  const allows = ["name", "avatarUrl", "address", "phone"];
  allows.forEach((field) => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });

  await user.save();
  return sendResponse(res, 200, true, user, null, "Update User Successful");
});

module.exports = userController;
