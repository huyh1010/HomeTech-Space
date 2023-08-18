const { AppError, sendResponse, catchAsync } = require("../helpers/utils");
const bcrypt = require("bcryptjs/dist//bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Cart = require("../models/Cart");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {};

authController.signIn = catchAsync(async (req, res, next) => {
  //Get data from request
  let { email, password, cart } = req.body;

  //Validation
  let user = await User.findOne({ email }, "+password");
  if (!user) throw new AppError(400, "Invalid Credentials", "Login Error");
  //Process
  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) throw new AppError(400, "Wrong Password", "Login Error");
  if (user.role === "user") {
    let userCart = await Cart.findOne({ user: user._id }).populate("user");

    if (!userCart) {
      const userId = user._id;
      userCart = await Cart.create({ user: userId });
      userCart.cart = cart;
      await userCart.save();
    } else if (userCart) {
      if (!userCart.cart.length) {
        userCart.cart = cart;
        await userCart.save();
      } else if (userCart.cart.length && cart.length) {
        userCart.cart = cart;
        await userCart.save();
      }
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
  } else {
    const accessToken = await user.generateToken();
    sendResponse(
      res,
      200,
      true,
      { user, accessToken },
      null,
      "Log In Successful"
    );
  }
});

authController.signInWithGoogle = catchAsync(async (req, res, next) => {
  let { googleId, cart } = req.body;

  jwt.verify(googleId, JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      if (err.name === "JsonWebTokenError") {
        throw new AppError(401, "Login Error", "Login with Google error");
      }
    }
    googleId = payload._id;
  });

  let user = await User.findOne({ googleId: googleId });
  if (!user) {
    throw new AppError(401, "Login Error", "Login with Google error");
  }

  let userCart = await Cart.findOne({ user: user._id }).populate("user");

  if (!userCart) {
    const userId = user._id;
    userCart = await Cart.create({ user: userId });
    userCart.cart = cart;

    await userCart.save();
  } else if (userCart) {
    if (!userCart.cart.length) {
      userCart.cart = cart;

      await userCart.save();
    }
  }

  const accessToken = await user.generateToken();
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
