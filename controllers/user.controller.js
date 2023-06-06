const { AppError, sendResponse, catchAsync } = require("../helpers/utils");

const userController = {};

userController.register = catchAsync(async (req, res, next) => {
  //Get data from request
  //Validation
  //Process
  //Response
});

userController.getCurrentUser = catchAsync(async (req, res, next) => {});

module.exports = userController;
