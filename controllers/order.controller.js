const { AppError, sendResponse, catchAsync } = require("../helpers/utils");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const User = require("../models/User");
const ShortUniqueId = require("short-unique-id");

const orderController = {};

orderController.createOrder = catchAsync(async (req, res, next) => {
  const { customer_info, cart, user_id, totalPrice } = req.body;
  const {
    name,
    email,
    phone,
    shipping_address,
    district,
    city,
    payment_method,
  } = customer_info;

  const order = await Order.create({
    buyer: user_id,
    name: name,
    email: email,
    phone: phone,
    orderItems: cart,
    shipping_address: shipping_address,
    payment_method: payment_method,
    district: district,
    city: city,
    totalPrice: totalPrice,
  });
  const orderId = order._id;

  const userCart = await Cart.findOneAndUpdate(
    { user: user_id },
    { cart: [] },
    { new: true }
  );

  sendResponse(
    res,
    200,
    true,
    { order, orderId, userCart },
    null,
    "Create Order Successful"
  );
});

orderController.getOrders = catchAsync(async (req, res, next) => {
  let { page, limit, ...filter } = {
    ...req.query,
  };

  page = parseInt(page);
  limit = parseInt(limit);

  const filterConditions = [{ is_Cancel: false }];
  if (filter) {
    const filterKeys = Object.keys(filter);
    filterKeys.forEach((key) => {
      filterConditions.push({
        [key]: filter[key],
      });
    });
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
    .populate("buyer");

  return sendResponse(res, 200, true, { orders, totalPages, count }, null, "");
});

orderController.getOrderSales = catchAsync(async (req, res, next) => {
  const currentUserId = req.user_id;
  const user = await User.findById(currentUserId);
  if (user.role !== "admin")
    throw new AppError(400, "Permission required ", "Get Order Sales Error");

  const day = 24 * 60 * 60 * 1000;
  const past_7_days = 7 * day;
  const past_30_days = 30 * day;
  let order_last_7_days = await Order.aggregate([
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
  let order_last_30_days = await Order.aggregate([
    {
      $match: {
        $expr: {
          $gt: [
            { $toDate: "$_id" },
            { $toDate: { $subtract: [new Date(), past_30_days] } },
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
    { order_last_7_days, order_last_30_days },
    null,
    "Get  Order Sales Successful"
  );
});

orderController.getUserOrder = catchAsync(async (req, res, next) => {
  const currentUserId = req.params.user_id;
  let { page, limit, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const filterConditions = [{ buyer: currentUserId }, { is_Cancel: false }];
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
    .populate("buyer");

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
  const order_id = req.params.id;
  const order = await Order.findById(order_id).populate("buyer");
  const orderId = order._id;

  //Validation
  if (!order) throw new AppError(400, "Order not found", "Get Order Error");

  //Process
  //Response
  return sendResponse(
    res,
    200,
    true,
    { order, orderId },
    null,
    "Get Single Order Successful"
  );
});

orderController.updateOrder = catchAsync(async (req, res, next) => {
  //Get data from request
  const currentUserId = req.user_id;
  const orderId = req.params.id;
  const { status, payment_status } = req.body;
  //Validation
  const user = await User.findById(currentUserId);
  if (user.role !== "admin")
    throw new AppError(400, "Permission required", "Update Order Error");
  //Process
  let order = await Order.findById(orderId).populate("buyer");
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
  sendResponse(res, 200, true, order, null, "Update Order Status Successful");
});

orderController.cancelOrder = catchAsync(async (req, res, next) => {
  //Get data from request
  const currentUserId = req.user_id;

  const orderId = req.params.id;

  //Validation
  const order = await Order.findOneAndUpdate(
    { _id: orderId },
    { is_Cancel: true },
    { new: true }
  );

  const count = await Order.countDocuments({
    is_Cancel: false,
    buyer: currentUserId,
  });

  //Response
  sendResponse(
    res,
    200,
    true,
    { order, count },
    null,
    "Cancel Order Successful"
  );
});
module.exports = orderController;
