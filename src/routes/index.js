const { Router } = require("express");
const router = Router();

const userrouter = require("./usersRoutes");

const serviceRouter = require("./serviceRoutes");
const reviewRouter = require("./reviewRoutes");
const contactRouter = require("./contactRoutes");
const offerRouter = require("./offerRoutes");

router.use("/users", userrouter);
router.use("/services", serviceRouter);
router.use("/reviews", reviewRouter);
router.use("/contact", contactRouter);
router.use("/offer", offerRouter);

module.exports = router;
