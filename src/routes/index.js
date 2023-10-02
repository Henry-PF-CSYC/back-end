const { Router } = require("express");
const router = Router();

const userRouter = require("./usersRoutes");

const packRouter = require("./packRoutes.js");
const offerRouter = require("./offerRoutes");
const reviewRouter = require("./reviewRoutes");
const contactRouter = require("./contactRoutes");
const serviceRouter = require("./serviceRoutes");
const subscriptionRouter = require("./subscriptionRoutes");
const packSubscriptionRouter = require("./packSubscriptionRoutes.js");
const paymentRouter = require("../MercadoPago/src/routes/payment");

router.use("/pack", packRouter);
router.use("/offer", offerRouter);
router.use("/users", userRouter);
router.use("/reviews", reviewRouter);
router.use("/contact", contactRouter);
router.use("/services", serviceRouter);
router.use("/mercadopago", paymentRouter);
router.use("/subscription", subscriptionRouter);
router.use("/pack_subscription", packSubscriptionRouter);

module.exports = router;
// paolo- luz dario-luz alfredo-luz alfredo-gas facundo-youtube

// {
// "rating": 4,
// "comment": "La verdad que es una poronga el servicio. Por eso me gusta tanto",
// "user_email": "alfredoegremy@gmail.com",
// "serviceId": "3bdda470-d2f0-441e-bbab-a92bfde03387"
// }
// {
// 	"user_email": "alfredoegremy@gmail.com",
// 	"service_ids": "3bdda470-d2f0-441e-bbab-a92bfde03387"
// }
