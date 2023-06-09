const { AppError, sendResponse, catchAsync } = require("../helpers/utils");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const userController = {};

userController.register = catchAsync(async (req, res, next) => {
  //Get data from request
  let { name, email, password, role } = req.body;
  //Validation
  let user = await User.findOne({ email });
  if (user)
    throw new AppError(400, "User already exists", "Registration Error");
  //Process
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  user = await User.create({ name, email, password, role });
  const accessToken = await user.generateToken();
  //Response
  sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Create User Successful"
  );
});

userController.getCurrentUser = catchAsync(async (req, res, next) => {
  const currentUserId = req.user_id;

  const user = await User.findById(currentUserId);
  if (!user)
    throw new AppError(400, "User not found", "Get Current User Error");

  return sendResponse(
    res,
    200,
    true,
    { user },
    null,
    "Get Current User Successful"
  );
});

//userController.getUser

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
  return sendResponse(res, 200, true, { user }, null, "Update User Successful");
});

module.exports = userController;
