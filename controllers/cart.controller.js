const { AppError, sendResponse, catchAsync } = require("../helpers/utils");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const ProductBundle = require("../models/ProductBundle");

const User = require("../models/User");

const cartController = {};

cartController.addItemToCart = catchAsync(async (req, res, next) => {
  let userId = req.user_id;
  console.log(userId);

  //get data
  let { product_id, quantity, type } = req.body;

  quantity = Number.parseInt(quantity);

  //validation
  let cart = await Cart.findOne({ user: userId });

  const productDetails = await Product.findById(product_id);

  if (cart) {
    let itemIndex = cart.items.findIndex(
      (item) => item.productId == product_id
    );
    console.log("Index", itemIndex);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity =
        cart.items[itemIndex].quantity + quantity;
      cart.items[itemIndex].price = productDetails.price;
      cart.items[itemIndex].total =
        cart.items[itemIndex].quantity * productDetails.price;
    } else if (quantity > 0) {
      cart.items.push({
        productId: product_id,
        quantity: quantity,
        price: productDetails.price,
        total: parseFloat(productDetails.price * quantity).toFixed(2),
        type: type,
      });
    } else {
      throw new AppError(400, "Invalid Request", "Add Item To Cart Error");
    }
    let data = await cart.save();
    sendResponse(res, 200, true, data, null, "Add Item To Cart Successful");
  } else {
    const cartData = {
      user: userId,
      items: [
        {
          productId: product_id,
          quantity: quantity,
          price: productDetails.price,
          total: parseFloat(productDetails.price * quantity),
          type: type,
        },
      ],
    };
    const cart = await Cart.create(cartData);
    cart.total = sendResponse(
      res,
      200,
      true,
      cart,
      null,
      "Add Item To Cart Successful"
    );
  }
});

cartController.addBundleItemToCart = catchAsync(async (req, res, next) => {
  //get data
  let { product_id, quantity, type } = req.body;
  const userId = req.user_id;

  quantity = Number.parseInt(quantity);

  //validation
  const cart = await Cart.findOne({ user: userId });

  const productDetails = await ProductBundle.findById(product_id);

  if (cart) {
    let itemIndex = cart.items.findIndex(
      (item) => item.productId == product_id
    );
    console.log("Index", itemIndex);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity =
        cart.items[itemIndex].quantity + quantity;
      cart.items[itemIndex].price = productDetails.price;
      cart.items[itemIndex].total =
        cart.items[itemIndex].quantity * productDetails.price;
    } else if (quantity > 0) {
      cart.items.push({
        productId: product_id,
        quantity: quantity,
        price: productDetails.price,
        total: parseFloat(productDetails.price * quantity).toFixed(2),
        type: type,
      });
    } else {
      throw new AppError(400, "Invalid Request", "Add Item To Cart Error");
    }
    let data = await cart.save();
    sendResponse(res, 200, true, data, null, "Add Item To Cart Successful");
  } else {
    const cartData = {
      user: userId,
      items: [
        {
          productId: product_id,
          quantity: quantity,
          price: productDetails.price,
          total: parseFloat(productDetails.price * quantity),
          type: type,
        },
      ],
    };
    const newCart = await Cart.create(cartData);
    newCart.total = sendResponse(
      res,
      200,
      true,
      newCart,
      null,
      "Add Item To Cart Successful"
    );
  }
});

cartController.getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.find().populate({
    path: "items",
    populate: { path: "productId", model: "Product" },
  });

  sendResponse(res, 200, true, cart, null, "Get Cart Successful");
});

cartController.getUserCart = catchAsync(async (req, res, next) => {
  let userId = req.params.id;

  let user = await User.findById(userId);
  if (!user) throw new AppError(400, "Invalid User ID", "Get Cart Error");

  let cart = await Cart.findOne({ user: userId })
    .populate("user")
    .populate({
      path: "items",
      populate: { path: "productId", model: "Product" },
    });
  if (!cart) throw new AppError(400, "Cart not found", "Get Cart Error");

  sendResponse(res, 200, true, cart, null, "Get Cart Successful");
});

cartController.decreaseItemQuantity = catchAsync(async (req, res, next) => {
  // let userId = req.params.id;

  let productId = req.body.product_id;
  // let user = await User.findById(userId);
  // if (!user)
  //   throw new AppError(400, "Invalid User ID", "Decrease Item Quantity Error");

  let cart = await Cart.findOne({});

  // if (!cart)
  //   throw new AppError(400, "Cart not found", "Decrease Item Quantity Error");

  let itemIndex = cart.items.findIndex((item) => item.productId == productId);

  if (itemIndex > -1) {
    let productItem = cart.items[itemIndex];
    productItem.quantity -= 1;
    productItem.total = productItem.quantity * productItem.price;
    // cart.items[itemIndex] = productItem;

    cart = await cart.save();
    sendResponse(
      res,
      200,
      true,
      { cart, productId },
      null,
      "Decrease Item Quantity Successful"
    );
  } else {
    throw new AppError(
      400,
      "Item does not exist in cart",
      "Decrease Item Quantity Error"
    );
  }
});

cartController.increaseItemQuantity = catchAsync(async (req, res, next) => {
  let productId = req.body.product_id;
  // let user = await User.findById(userId);
  // if (!user)
  //   throw new AppError(400, "Invalid User ID", "Increase Item Quantity Error");

  let cart = await Cart.findOne({});

  // if (!cart)
  //   throw new AppError(400, "Cart not found", "Increase Item Quantity Error");

  let itemIndex = cart.items.findIndex((item) => item.productId == productId);

  if (itemIndex > -1) {
    let productItem = cart.items[itemIndex];
    productItem.quantity += 1;
    productItem.total = productItem.quantity * productItem.price;
    cart.items[itemIndex] = productItem;

    cart = await cart.save();
    sendResponse(
      res,
      200,
      true,
      { cart, productId },
      null,
      "Increase Item Quantity Successful"
    );
  } else {
    throw new AppError(
      400,
      "Item does not exist in cart",
      "Increase Item Quantity Error"
    );
  }
});

cartController.updateCartToUser = catchAsync(async (req, res, next) => {
  const userId = req.body.user_id;
  const cartId = req.body.cart_id;
  console.log(cartId);

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    const cartWithoutLogin = await Cart.findOne({ _id: cartId });
    cartWithoutLogin.user = userId;
    cart = cartWithoutLogin;
    await cart.save();
    sendResponse(res, 200, true, cart, null, "Assign Cart To User Successful");
  }
});

cartController.removeItemFromCart = catchAsync(async (req, res, next) => {
  let productId = req.body.product_id;

  let cart = await Cart.findOne({});
  if (!cart) throw new AppError(400, "Cart not found", "Remove Item Error");

  let itemIndex = cart.items.findIndex((item) => item.productId == productId);

  if (itemIndex > -1) {
    cart.items.splice(itemIndex, 1);

    cart = await cart.save();
    sendResponse(
      res,
      200,
      true,
      { cart, productId },
      null,
      "Remove Item Successful"
    );
  } else {
    throw new AppError(400, "Item does not exist in cart", "Remove Item Error");
  }
});

module.exports = cartController;
