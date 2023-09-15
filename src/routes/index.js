const { Router } = require("express");
const router = Router();
const userrouter = require("./usersRoutes");
const serviceRouter = require("./serviceRoutes");
const contactRouter = require("./contactRoutes");

router.use("/users", userrouter);
router.use("/services", serviceRouter);
router.use("/contact", contactRouter);

module.exports = router;
