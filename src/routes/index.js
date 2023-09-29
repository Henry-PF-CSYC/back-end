const { Router } = require("express");
const router = Router();

const userRouter = require("./usersRoutes");

const serviceRouter = require("./serviceRoutes");
const reviewRouter = require("./reviewRoutes");
const contactRouter = require("./contactRoutes");
const subscriptionRouter = require("./subscriptionRoutes");
const offerRouter = require("./offerRoutes");
const paymentRouter = require("../MercadoPago/src/routes/payment");

router.use("/users", userRouter);
router.use("/services", serviceRouter);
router.use("/reviews", reviewRouter);
router.use("/contact", contactRouter);
router.use("/subscription", subscriptionRouter);
router.use("/offer", offerRouter);
router.use("/mercadopago", paymentRouter);

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