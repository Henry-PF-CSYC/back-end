const { Router } = require("express");
const router = Router();
const userrouter = require("./usersRoutes");
const serviceRouter = require("./serviceRoutes");

router.use("/users", userrouter);
router.use("/services", serviceRouter);

module.exports = router;
