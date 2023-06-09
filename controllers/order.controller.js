const { AppError, sendResponse, catchAsync } = require("../helpers/utils");
const Order = require("../models/Order");
const User = require("../models/User");

const orderController = {};

orderController.createOrder = catchAsync(async (req, res, next) => {
  const { buyer, products, shipping_address, payment_method, bundle } =
    req.body;

  const order = await Order.create({
    buyer,
    products,
    shipping_address,
    payment_method,
    bundle,
  });

  sendResponse(res, 200, true, { order }, null, "Create Order Successful");
});

orderController.getOrders = catchAsync(async (req, res, next) => {
  let { page, limit, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const filterConditions = [
    {
      is_Cancel: false,
    },
  ];
  if (filter.id) {
    filterConditions.push({ _id: filter.id });
  }
  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await Order.countDocuments(filterCriteria);
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  let orders = await Order.find(filterCriteria)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .populate("buyer")
    .populate("products")
    .populate("bundle");

  return sendResponse(res, 200, true, { orders, totalPages, count }, null, "");
});

orderController.getCurrentUserOrders = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  let { page, limit, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const filterConditions = [{ is_Cancel: false }, { buyer: currentUserId }];
  if (filter.id) {
    filterConditions.push({ _id: filter.id });
  }
  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await Order.countDocuments(filterCriteria);
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  const order = await Order.find(filterCriteria)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .populate("buyer")
    .populate("products")
    .populate("bundle");

  if (!order) throw new AppError(400, "Order not found", "Get My Order Error");
  return sendResponse(
    res,
    200,
    true,
    { order, count, totalPages },
    null,
    "Get Current User Order Successful"
  );
});

orderController.getSingleOrder = catchAsync(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId)
    .populate("buyer")
    .populate("products")
    .populate("bundle");

  //Validation
  if (!order) throw new AppError(400, "Order not found", "Get Order Error");

  //Process
  //Response
  return sendResponse(
    res,
    200,
    true,
    { order },
    null,
    "Get Single Order Successful"
  );
});

orderController.updateOrder = catchAsync(async (req, res, next) => {
  //Get data from request
  const currentUserId = req.userId;
  const orderId = req.params.id;
  const { status, payment_status } = req.body;
  //Validation
  const user = await User.findById(currentUserId);
  if (user.role !== "admin")
    throw new AppError(400, "Permission required", "Update Order Error");
  //Process
  let order = await Order.findById(orderId);
  if (!order) throw new AppError(400, "Order not found", "Update Order Error");
  if (order.status === "shipped") {
    if (
      req.body.status === "pending" ||
      req.body.status === "accepted" ||
      req.body.status === "order processed" ||
      req.body.status === "preparing for shipment"
    ) {
      throw new AppError(400, "Invalid Values", "Update Order Error");
    } else if (req.body.status === "delivered") {
      order.status = req.body.status;
    }
  } else if (status) {
    order.status = status;
  }

  if (payment_status) {
    order.payment_status = payment_status;
  }
  order = await order.save();

  //Response
  sendResponse(
    res,
    200,
    true,
    { order },
    null,
    "Update Order Status Successful"
  );
});

orderController.deleteOrder = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  //Get data from request
  const orderId = req.params.id;
  //Validation
  const order = await Order.findOneAndUpdate(
    { _id: orderId, buyer: currentUserId },
    { is_Cancel: true },
    { new: true }
  );
  //Process
  //Response
  sendResponse(res, 200, true, { order }, null, "Cancel Order Successful");
});
module.exports = orderController;
