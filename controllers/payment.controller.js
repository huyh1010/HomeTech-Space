const { AppError, sendResponse, catchAsync } = require("../helpers/utils");
const Payment = require("../models/Payment");

const paymentController = {};

paymentController.createPayment = catchAsync(async (req, res, next) => {
  const { order } = req.body;

  const payment = await Payment.create({ order });
  if (payment)
    throw new AppError(400, "Payment already exists", "Create Payment Error");

  sendResponse(res, 200, true, { payment }, null, "Create Payment Success");
});

paymentController.getPayments = catchAsync(async (req, res, next) => {
  //Get data from request
  //Validation
  //Process
  //Response
});

paymentController.getSinglePayment = catchAsync(async (req, res, next) => {
  //Get data from request
  //Validation
  //Process
  //Response
});

paymentController.updatePayment = catchAsync(async (req, res, next) => {
  //Get data from request
  //Validation
  //Process
  //Response
});

paymentController.deletePayment = catchAsync(async (req, res, next) => {
  //Get data from request
  //Validation
  //Process
  //Response
});

module.exports = paymentController;
