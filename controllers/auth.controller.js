const { AppError, sendResponse, catchAsync } = require("../helpers/utils");
const bcrypt = require("bcryptjs/dist//bcrypt");
const User = require("../models/User");
const Cart = require("../models/Cart");

const authController = {};

authController.signIn = catchAsync(async (req, res, next) => {
  //Get data from request
  let { email, password, cart } = req.body;
  console.log(cart);
  //Validation
  let user = await User.findOne({ email }, "+password");
  if (!user) throw new AppError(400, "Invalid Credentials", "Login Error");
  //Process
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) throw new AppError(400, "Wrong Password", "Login Error");
  let userCart = await Cart.findOne({ user: user._id }).populate("user");
  userCart.cart = cart;
  await userCart.save();
  if (!userCart) {
    const userId = user._id;
    userCart = await Cart.create({ user: userId });
    userCart.cart = cart;
    await userCart.save();
  }
  const accessToken = await user.generateToken();
  //Response
  sendResponse(
    res,
    200,
    true,
    { user, accessToken, userCart },
    null,
    "Log In Successful"
  );
});

module.exports = authController;
