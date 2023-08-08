var express = require("express");
const { AppError, sendResponse } = require("../helpers/utils");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("Welcome to CoderSchool!");
});

router.get("/template/:test", async (req, res, next) => {
  const { test } = req.params;
  try {
    if (test === "error") {
      throw new AppError(401, "Access denied", "Authentication Error");
    } else {
      sendResponse(
        res,
        200,
        true,
        { data: "template" },
        null,
        "template success"
      );
    }
  } catch (error) {
    next(err);
  }
});

const authRouter = require("./auth.api.js");
router.use("/auth", authRouter);

const userRouter = require("./user.api.js");
router.use("/users", userRouter);

const productRouter = require("./product.api.js");
router.use("/products", productRouter);

const productBundleRouter = require("./productBundle.api.js");
router.use("/bundles", productBundleRouter);

const categoryRouter = require("./category.api.js");
router.use("/categories", categoryRouter);

const orderRouter = require("./order.api.js");
router.use("/orders", orderRouter);

const cartRouter = require("./cart.api.js");
router.use("/carts", cartRouter);

const authPassportRouter = require("./authPassport.api.js");
router.use("/auth/google", authPassportRouter);

module.exports = router;
