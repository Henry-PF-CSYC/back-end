const { Router } = require("express");
const router = Router();

const userRouter = require("./usersRoutes");

const packRouter = require("./packRoutes.js");
const offerRouter = require("./offerRoutes");
const reviewRouter = require("./reviewRoutes");
const contactRouter = require("./contactRoutes");
const serviceRouter = require("./serviceRoutes");
const subscriptionRouter = require("./subscriptionRoutes");
const paymentRouter = require("../MercadoPago/src/routes/payment");

router.use("/pack", packRouter);
router.use("/offer", offerRouter);
router.use("/users", userRouter);
router.use("/reviews", reviewRouter);
router.use("/contact", contactRouter);
router.use("/services", serviceRouter);
router.use("/mercadopago", paymentRouter);
router.use("/subscription", subscriptionRouter);

module.exports = router;
