const { AppError, sendResponse, catchAsync } = require("../helpers/utils");
const Cart = require("../models/Cart");

const cartController = {};

cartController.updateCart = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const cartItems = req.body.cartOnLocal;

  let cart = await Cart.findOne({ user: userId });
  if (!cart) throw new AppError(400, "Cart not found", "Update Cart Error");

  cart.cart = cartItems;
  await cart.save();
  sendResponse(res, 200, true, cart, null, "Update Cart Success");
});

module.exports = cartController;
