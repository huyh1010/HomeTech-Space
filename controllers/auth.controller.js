const { AppError, sendResponse, catchAsync } = require("../helpers/utils");
const bcrypt = require("bcryptjs/dist//bcrypt");
const User = require("../models/User");

const authController = {};

authController.signIn = catchAsync(async (req, res, next) => {
  //Get data from request
  const { email, password } = req.body;
  //Validation
  let user = await User.findOne({ email }, "+password");
  if (!user) throw new AppError(400, "Invalid Credentials", "Login Error");
  //Process
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) throw new AppError(400, "Wrong Password", "Login Error");
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

module.exports = authController;
